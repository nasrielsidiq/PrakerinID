<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Internship extends Model
{
    /** @use HasFactory<\Database\Factories\InternshipFactory> */
    protected $fillable = [
        'title',
        'description',
        'start_date',
        'end_date',
        'company_id',
        'kuota',
    ];
    use HasFactory;
}
