<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'type',
        'file_path',
        'mime_type',
        'size',
        'download_count',
        'uploaded_by',
        'classe_id',
        'module_id',
        'is_public',
    ];

    protected $casts = [
        'is_public' => 'boolean',
        'size'      => 'integer',
    ];

    // ---------- Relationships ----------

    public function uploader()
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }

    public function classe()
    {
        return $this->belongsTo(Classe::class);
    }

    public function module()
    {
        return $this->belongsTo(Module::class);
    }
    
    // ---------- Scopes ----------
    
    public function scopePublic($query)
    {
        return $query->where('is_public', true);
    }
}
