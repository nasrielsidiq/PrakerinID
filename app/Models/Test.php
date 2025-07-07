<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Test extends Model
{
    /** @use HasFactory<\Database\Factories\TestFactory> */
    protected $fillable = [
        "title",
        "description",
        "intrenship_id",
        "type"
    ];
    use HasFactory;
}
