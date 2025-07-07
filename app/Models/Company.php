<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    /** @use HasFactory<\Database\Factories\CompanyFactory> */
    protected $fillable = [
        'name',
        'address',
        'phone_number',
        'user_id',
        'logo',
        'is_verified',
        'sector',
    ];
    use HasFactory;
}
