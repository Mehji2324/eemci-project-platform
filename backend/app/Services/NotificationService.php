<?php

namespace App\Services;

use App\Models\Notification;
use App\Models\User;

class NotificationService
{
    /**
     * Create a notification for a specific user.
     */
    public function create(int $userId, string $title, string $message, string $type, ?array $data = null): Notification
    {
        return Notification::create([
            'user_id' => $userId,
            'title'   => $title,
            'message' => $message,
            'type'    => $type,
            'data'    => $data,
        ]);
    }

    /**
     * Create a notification for multiple users.
     */
    public function createForMany(array $userIds, string $title, string $message, string $type, ?array $data = null): void
    {
        $records = array_map(fn(int $id) => [
            'user_id'    => $id,
            'title'      => $title,
            'message'    => $message,
            'type'       => $type,
            'data'       => $data ? json_encode($data) : null,
            'is_read'    => false,
            'created_at' => now(),
            'updated_at' => now(),
        ], $userIds);

        Notification::insert($records);
    }

    /**
     * Notify all admin users.
     */
    public function notifyAdmins(string $title, string $message, string $type, ?array $data = null): void
    {
        $adminIds = User::whereHas('role', fn($q) => $q->where('name', 'admin'))
            ->pluck('id')
            ->toArray();

        if (! empty($adminIds)) {
            $this->createForMany($adminIds, $title, $message, $type, $data);
        }
    }

    // ---------- Event-Specific Notifications ----------

    /**
     * Student registration approved → notify the student.
     */
    public function studentValidated(int $studentUserId, string $studentName, string $matricule): void
    {
        $this->create(
            $studentUserId,
            'Inscription approuvée',
            "Félicitations {$studentName} ! Votre inscription a été validée. Votre matricule est : {$matricule}.",
            'student_validated',
            ['matricule' => $matricule]
        );
    }

    /**
     * Teacher adds grades → notify the student.
     */
    public function gradeAdded(int $studentUserId, string $moduleName, ?float $ccNote, ?float $examNote): void
    {
        $this->create(
            $studentUserId,
            'Nouvelle note ajoutée',
            "Une note a été ajoutée pour le module « {$moduleName} ». CC: {$ccNote}, Examen: {$examNote}.",
            'grade_added',
            ['module' => $moduleName, 'cc_note' => $ccNote, 'exam_note' => $examNote]
        );
    }

    /**
     * Note validated by admin → notify the student.
     */
    public function gradeValidated(int $studentUserId, string $moduleName, float $average): void
    {
        $this->create(
            $studentUserId,
            'Note validée',
            "Votre note pour le module « {$moduleName} » a été validée. Moyenne : {$average}/20.",
            'grade_validated',
            ['module' => $moduleName, 'average' => $average]
        );
    }

    /**
     * Payment validated → notify the student.
     */
    public function paymentValidated(int $studentUserId, string $reference, float $amount, string $currency): void
    {
        $this->create(
            $studentUserId,
            'Paiement validé',
            "Votre paiement « {$reference} » de {$amount} {$currency} a été validé.",
            'payment_validated',
            ['reference' => $reference, 'amount' => $amount, 'currency' => $currency]
        );
    }

    /**
     * Absence validated/rejected → notify the student.
     */
    public function absenceValidated(int $studentUserId, string $status, string $date, string $moduleName): void
    {
        $statusLabel = $status === 'validated' ? 'validée' : 'rejetée';

        $this->create(
            $studentUserId,
            "Absence {$statusLabel}",
            "Votre absence du {$date} pour le module « {$moduleName} » a été {$statusLabel}.",
            'absence_validated',
            ['status' => $status, 'date' => $date, 'module' => $moduleName]
        );
    }
}
