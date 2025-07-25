<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    /** @use HasFactory<\Database\Factories\CompanyFactory> */
    protected $fillable = [
        'name',
        'kota',
        'provinsi',
        'address',
        'phone_number',
        'user_id',
        'is_verified',
        'sector',
    ];
    use HasFactory;
}
