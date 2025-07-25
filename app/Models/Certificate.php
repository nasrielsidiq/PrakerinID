<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Certificate extends Model
{
    /** @use HasFactory<\Database\Factories\CertificateFactory> */
    protected $fillable = [
        'aplication_id',
        'file_path',
        'issued_at',
    ];
    use HasFactory;
}
