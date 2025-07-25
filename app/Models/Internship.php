<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Internship extends Model
{
    /** @use HasFactory<\Database\Factories\InternshipFactory> */
    use HasFactory;
    protected $fillable = [
        'title',
        'description',
        'start_date',
        'end_date',
        'company_id',
        'kuota',
        'grade',
        'bidang'
    ];

    public function company(){
        return $this->belongsTo(Company::class);
    }
    public function slugs()
    {
        return $this->belongsToMany(Slug::class);
    }
}
