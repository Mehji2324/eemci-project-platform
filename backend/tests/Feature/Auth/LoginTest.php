<?php

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LoginTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_login()
    {
        $admin = $this->createAdmin(['email' => 'admin@test.com', 'password' => bcrypt('password')]);

        $response = $this->postJson('/api/v1/auth/login', [
            'email' => 'admin@test.com',
            'password' => 'password',
        ]);

        $response->assertStatus(200)
                 ->assertJsonStructure(['token', 'user']);
    }

    public function test_pending_student_cannot_login()
    {
        $student = $this->createStudent(['status' => 'pending']);
        $student->user->update(['password' => bcrypt('password')]);

        $response = $this->postJson('/api/v1/auth/login', [
            'email' => $student->user->email,
            'password' => 'password',
        ]);

        $response->assertStatus(403)
                 ->assertJsonFragment(['message' => 'Your account is still pending admin validation.']);
    }

    public function test_validated_student_can_login()
    {
        $student = $this->createStudent(['status' => 'validated']);
        $student->user->update(['password' => bcrypt('password')]);

        $response = $this->postJson('/api/v1/auth/login', [
            'email' => $student->user->email,
            'password' => 'password',
        ]);

        $response->assertStatus(200);
    }
}
