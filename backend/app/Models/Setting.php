<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Crypt;

class Setting extends Model
{
    protected $fillable = [
        'group',
        'key',
        'value',
        'type',
        'is_public',
        'is_secret',
    ];

    /**
     * Get the value casted to its type.
     */
    public function getValueAttribute($value)
    {
        if ($this->is_secret && !empty($value)) {
            try {
                $value = Crypt::decryptString($value);
            } catch (\Exception $e) {
                // Return raw value if decryption fails (e.g. if it wasn't encrypted yet)
            }
        }

        return match ($this->type) {
            'boolean' => (bool) $value,
            'integer' => (int) $value,
            'float' => (float) $value,
            'json' => json_decode($value, true),
            default => $value,
        };
    }

    /**
     * Set the value casted to string.
     */
    public function setValueAttribute($value)
    {
        $value = match ($this->type) {
            'json' => json_encode($value),
            'boolean' => $value ? '1' : '0',
            default => (string) $value,
        };

        if ($this->is_secret && !empty($value)) {
            $value = Crypt::encryptString($value);
        }

        $this->attributes['value'] = $value;
    }
}
