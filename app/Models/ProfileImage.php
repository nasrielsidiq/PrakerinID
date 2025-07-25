<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProfileImage extends Model
{
    protected $fillable = [
        'image',
        'user_id'
    ];

}
