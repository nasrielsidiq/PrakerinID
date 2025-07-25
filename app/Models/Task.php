<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    /** @use HasFactory<\Database\Factories\TaskFactory> */
    use HasFactory;
    protected $fillable = [
        'title',
        'task_id',
        'description',
        'due_date',
        'status',
    ];
    protected $casts = [
        'due_date' => 'datetime',
    ];
}
