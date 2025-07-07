<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class School extends Model
{
    /** @use HasFactory<\Database\Factories\SchoolFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'address',
        'phone_number',
        'is_verified',
        'user_id',
        'logo'
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }
}
