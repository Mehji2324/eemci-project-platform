<?php

namespace App\Services;

use App\Models\User;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\Payment;
use App\Models\Absence;
use App\Models\Note;
use App\Models\Document;
use App\Models\Classe;
use App\Models\Module;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Carbon;

class ReportService
{
    /**
     * Get global dashboard summary statistics.
     */
    public function getDashboardSummary(User $user)
    {
        // Cache for 5 minutes
        return Cache::remember('reports.dashboard.' . $user->id, 300, function () use ($user) {
            $data = [
                'total_students' => Student::count(),
                'active_students' => Student::where('status', 'active')->count(),
                'total_teachers' => Teacher::count(),
                'total_classes' => Classe::count(),
                'total_modules' => Module::count(),
                'total_documents' => Document::count(),
                'document_downloads' => Document::sum('download_count'),
                'total_payments' => Payment::where('status', 'paid')->sum('amount'),
                'pending_payments' => Payment::where('status', 'pending')->count(),
                'attendance_rate' => $this->calculateAttendanceRate(),
                'average_grade' => Note::avg('value') ?? 0,
            ];

            // Chart data (e.g. Payments over last 6 months)
            $data['revenue_trend'] = $this->getRevenueTrend();
            
            // Adjust stats if Teacher or Student
            if ($user->role === 'teacher') {
                $teacher = $user->teacher;
                if ($teacher) {
                    $data['total_classes'] = $teacher->classes()->count();
                    $data['total_modules'] = $teacher->modules()->count();
                    // ... other teacher specific stats
                }
            } elseif ($user->role === 'student') {
                $student = $user->student;
                if ($student) {
                    $data['my_payments'] = $student->payments()->sum('amount');
                    $data['my_average'] = $student->notes()->avg('value') ?? 0;
                    $data['my_absences'] = $student->absences()->count();
                }
            }

            return $data;
        });
    }

    private function calculateAttendanceRate()
    {
        // Simplistic attendance rate for demo
        $totalStudents = Student::count();
        if ($totalStudents === 0) return 100;
        $totalAbsences = Absence::where('date', '>=', Carbon::now()->subDays(30))->count();
        // Assuming 20 school days a month
        $expectedDays = $totalStudents * 20;
        return $expectedDays > 0 ? round(100 - (($totalAbsences / $expectedDays) * 100), 2) : 100;
    }

    private function getRevenueTrend()
    {
        $trend = [];
        for ($i = 5; $i >= 0; $i--) {
            $month = Carbon::now()->subMonths($i);
            $sum = Payment::where('status', 'paid')
                ->whereYear('created_at', $month->year)
                ->whereMonth('created_at', $month->month)
                ->sum('amount');
            $trend[] = [
                'name' => $month->format('M'),
                'total' => $sum
            ];
        }
        return $trend;
    }

    public function getStudentsReport(array $filters)
    {
        $query = Student::with(['classe', 'user']);
        
        if (!empty($filters['classe_id'])) {
            $query->where('classe_id', $filters['classe_id']);
        }
        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }
        if (!empty($filters['start_date']) && !empty($filters['end_date'])) {
            $query->whereBetween('created_at', [$filters['start_date'], $filters['end_date']]);
        }

        return $query->paginate(50);
    }

    public function getPaymentsReport(array $filters)
    {
        $query = Payment::with(['student.user']);
        
        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }
        if (!empty($filters['start_date']) && !empty($filters['end_date'])) {
            $query->whereBetween('created_at', [$filters['start_date'], $filters['end_date']]);
        }

        return $query->paginate(50);
    }
    
    public function getAttendanceReport(array $filters)
    {
        $query = Absence::with(['student.user', 'module']);
        
        if (!empty($filters['start_date']) && !empty($filters['end_date'])) {
            $query->whereBetween('date', [$filters['start_date'], $filters['end_date']]);
        }

        return $query->paginate(50);
    }
}
