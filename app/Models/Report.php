<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    /** @use HasFactory<\Database\Factories\ReportFactory> */
    protected $fillable = [
        'application_id',
        'report_text',
        'report_file',
        'is_verified_by_school'
    ];
    use HasFactory;
}
