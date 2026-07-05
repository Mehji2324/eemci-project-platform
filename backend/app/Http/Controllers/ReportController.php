<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ReportService;
use App\Http\Resources\UserResource;

class ReportController extends Controller
{
    protected $reportService;

    public function __construct(ReportService $reportService)
    {
        $this->reportService = $reportService;
    }

    public function dashboard(Request $request)
    {
        $this->authorize('viewAnyReport');
        $data = $this->reportService->getDashboardSummary($request->user());
        return response()->json(['data' => $data]);
    }

    public function students(Request $request)
    {
        $this->authorize('viewAnyReport');
        
        if ($request->has('export')) {
            return $this->exportReport('students', $request);
        }

        $data = $this->reportService->getStudentsReport($request->all());
        return response()->json($data);
    }

    public function payments(Request $request)
    {
        $this->authorize('viewAnyReport');

        if ($request->has('export')) {
            return $this->exportReport('payments', $request);
        }

        $data = $this->reportService->getPaymentsReport($request->all());
        return response()->json($data);
    }

    public function attendance(Request $request)
    {
        $this->authorize('viewAnyReport');

        if ($request->has('export')) {
            return $this->exportReport('attendance', $request);
        }

        $data = $this->reportService->getAttendanceReport($request->all());
        return response()->json($data);
    }

    /**
     * Handles exporting reports to CSV/PDF/XLSX.
     */
    private function exportReport($type, Request $request)
    {
        $format = $request->query('export', 'csv');
        $filters = $request->all();

        // Fetch data based on type
        if ($type === 'students') {
            $data = $this->reportService->getStudentsReport($filters)->items();
            $headers = ['ID', 'Name', 'Status', 'Class', 'Created At'];
            $rows = array_map(function($item) {
                return [
                    $item->id,
                    $item->user->name ?? 'N/A',
                    $item->status,
                    $item->classe->name ?? 'N/A',
                    $item->created_at->format('Y-m-d')
                ];
            }, $data);
        } elseif ($type === 'payments') {
            $data = $this->reportService->getPaymentsReport($filters)->items();
            $headers = ['ID', 'Student', 'Amount', 'Status', 'Date'];
            $rows = array_map(function($item) {
                return [
                    $item->id,
                    $item->student->user->name ?? 'N/A',
                    $item->amount,
                    $item->status,
                    $item->created_at->format('Y-m-d')
                ];
            }, $data);
        } elseif ($type === 'attendance') {
            $data = $this->reportService->getAttendanceReport($filters)->items();
            $headers = ['ID', 'Student', 'Module', 'Date', 'Justified'];
            $rows = array_map(function($item) {
                return [
                    $item->id,
                    $item->student->user->name ?? 'N/A',
                    $item->module->name ?? 'N/A',
                    $item->date,
                    $item->justified ? 'Yes' : 'No'
                ];
            }, $data);
        } else {
            return response()->json(['message' => 'Invalid report type'], 400);
        }

        if ($format === 'csv') {
            return $this->exportCsv($type, $headers, $rows);
        } elseif ($format === 'pdf') {
            // Graceful degradation: generate a downloadable HTML report
            // If barryvdh/laravel-dompdf is installed, uncomment the block below
            // $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadHTML($this->generateHtmlTable($headers, $rows));
            // return $pdf->download($type . '_report.pdf');

            $html = $this->generateHtmlTable($headers, $rows);
            return response($html, 200, [
                'Content-Type' => 'text/html',
                'Content-Disposition' => 'attachment; filename="' . $type . '_report.html"',
            ]);
        } elseif ($format === 'xlsx') {
            // Fallback to CSV — maatwebsite/excel is not installed
            return $this->exportCsv($type, $headers, $rows);
        }

        return response()->json(['message' => 'Unsupported format'], 400);
    }

    private function exportCsv($filename, $headers, $rows)
    {
        $headers_str = implode(',', $headers) . "\n";
        $rows_str = '';
        foreach ($rows as $row) {
            // escape quotes and fields containing commas
            $escaped = array_map(function($field) {
                return '"' . str_replace('"', '""', $field) . '"';
            }, $row);
            $rows_str .= implode(',', $escaped) . "\n";
        }

        return response($headers_str . $rows_str, 200, [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="' . $filename . '_report.csv"',
        ]);
    }

    private function generateHtmlTable($headers, $rows)
    {
        $html = '<table border="1" cellpadding="5" cellspacing="0"><thead><tr>';
        foreach ($headers as $h) { $html .= "<th>{$h}</th>"; }
        $html .= '</tr></thead><tbody>';
        foreach ($rows as $row) {
            $html .= '<tr>';
            foreach ($row as $cell) { 
                $safeCell = htmlspecialchars((string) $cell, ENT_QUOTES, 'UTF-8');
                $html .= "<td>{$safeCell}</td>"; 
            }
            $html .= '</tr>';
        }
        $html .= '</tbody></table>';
        return $html;
    }
}
