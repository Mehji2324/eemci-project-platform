<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\Role;
use App\Models\Student;
use App\Models\User;
use App\Services\AcademicEmailService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Register a new student (status = pending).
     */
    public function register(RegisterRequest $request): JsonResponse
    {
        $studentRole = Role::where('name', 'student')->firstOrFail();

        // 1. Generate Academic Email BEFORE creating the user
        $emailService = app(AcademicEmailService::class);
        $academicEmail = $emailService->generate($request->first_name, $request->last_name);

        // 2. Generate temporary password: Firstname@eemci.ma
        $plainPassword = $request->first_name . '@eemci.ma';

        $user = User::create([
            'role_id'        => $studentRole->id,
            'first_name'     => $request->first_name,
            'last_name'      => $request->last_name,
            'email'          => $academicEmail,     // Academic email is primary login
            'personal_email' => $request->email,     // Admin provided email
            'phone'          => $request->phone,
            'password'       => Hash::make($plainPassword),
            'must_change_password' => true,
        ]);

        // Create the student profile with pending status
        $student = Student::create([
            'user_id'        => $user->id,
            'date_of_birth'  => $request->date_of_birth,
            'place_of_birth' => $request->place_of_birth,
            'gender'         => $request->gender,
            'nationality'    => $request->nationality,
            'address'        => $request->address,
            'guardian_name'  => $request->guardian_name,
            'guardian_phone' => $request->guardian_phone,
            'status'         => 'pending',
        ]);

        // We store the academic email in the student table too for reference
        $student->update(['academic_email' => $academicEmail]);

        return response()->json([
            'message' => 'Registration successful. Your account is pending admin validation.',
            'credentials' => [
                'academic_email'    => $academicEmail,
                'temporary_password' => $plainPassword,
                'matricule'         => 'Pending validation',
            ],
            'user'    => [
                'id'         => $user->id,
                'full_name'  => $user->full_name,
                'email'      => $academicEmail,
                'status'     => 'pending',
            ],
        ], 201);
    }

    /**
     * Login — returns Sanctum token.
     */
    public function login(LoginRequest $request): JsonResponse
    {
        if (! Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Invalid credentials.'], 401);
        }

        /** @var User $user */
        $user = Auth::user();

        // Check student is validated before allowing login
        if ($user->isStudent()) {
            $student = $user->student;
            if ($student && $student->status === 'pending') {
                Auth::logout();
                return response()->json([
                    'message' => 'Your account is still pending admin validation.',
                ], 403);
            }
            if ($student && $student->status === 'rejected') {
                Auth::logout();
                return response()->json([
                    'message' => 'Your registration was rejected.',
                    'reason'  => $student->rejection_reason,
                ], 403);
            }
        }

        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'message'            => 'Login successful.',
            'token'              => $token,
            'must_change_password' => $user->must_change_password,
            'user'               => [
                'id'        => $user->id,
                'full_name' => $user->full_name,
                'email'     => $user->email,
                'role'      => $user->role->name,
            ],
        ]);
    }

    /**
     * Logout — revoke current token.
     */
    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out successfully.']);
    }

    /**
     * Get authenticated user profile.
     */
    public function me(Request $request): JsonResponse
    {
        $user = $request->user()->load('role');

        $profile = null;
        if ($user->isStudent()) {
            $profile = $user->student?->load(['filiere', 'classe']);
        } elseif ($user->isTeacher()) {
            $profile = $user->teacher;
        }

        return response()->json([
            'user' => [
                'id'                   => $user->id,
                'full_name'            => $user->full_name,
                'email'                => $user->email,
                'role'                 => $user->role->name,
                'must_change_password' => $user->must_change_password,
            ],
            'profile' => $profile,
        ]);
    }

    /**
     * Change password (required on first login).
     */
    public function changePassword(Request $request): JsonResponse
    {
        $request->validate([
            'current_password' => ['required', 'string'],
            'password'         => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $user = $request->user();

        if (! Hash::check($request->current_password, $user->password)) {
            return response()->json(['message' => 'Current password is incorrect.'], 422);
        }

        $user->update([
            'password'             => Hash::make($request->password),
            'must_change_password' => false,
        ]);

        return response()->json(['message' => 'Password changed successfully.']);
    }
}
