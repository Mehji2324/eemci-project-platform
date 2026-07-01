<?php

namespace App\Services;

use App\Models\User;

class AcademicEmailService
{
    protected string $domain = 'eemci.ma';

    /**
     * Generate a unique academic email.
     *
     * Format: {firstname}.{lastname}@eemci.ma
     * If taken: {firstname}.{lastname}2@eemci.ma, etc.
     */
    public function generate(string $firstName, string $lastName): string
    {
        $fName = $this->normalize($firstName);
        $lName = $this->normalize($lastName);

        $baseEmail = "{$fName}.{$lName}@{$this->domain}";

        if (! $this->emailExists($baseEmail)) {
            return $baseEmail;
        }

        $counter = 2;
        do {
            $email = "{$fName}.{$lName}{$counter}@{$this->domain}";
            $counter++;
        } while ($this->emailExists($email));

        return $email;
    }

    private function normalize(string $name): string
    {
        // Remove accents, lowercase, remove non-alpha chars
        $name = iconv('UTF-8', 'ASCII//TRANSLIT', $name);
        $name = strtolower($name);
        $name = preg_replace('/[^a-z]/', '', $name);
        return $name;
    }

    private function emailExists(string $email): bool
    {
        return User::where('email', $email)->exists();
    }
}
