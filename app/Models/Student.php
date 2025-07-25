<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    /** @use HasFactory<\Database\Factories\StudentFactory> */
    protected $fillable = [
        'name',
        'date_of_birth',
        'gender',
        'phone_number',
        'address',
        'school_id',
        'user_id',
    ];
    use HasFactory;
}
