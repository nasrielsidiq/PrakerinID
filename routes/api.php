<?php

use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\InternshipController;
use App\Http\Controllers\SchoolController;
use App\Http\Controllers\StudentController;
use App\Models\School;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::get('/unauthorized', [AuthController::class, 'unauthorized'])->name('login');
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::get('/internships/{slug}', [InternshipController::class, 'getSlug']);
Route::get('/internships', [InternshipController::class, 'index']);
Route::get('/school_name', [SchoolController::class, 'school_name']);
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('/school', SchoolController::class);
    Route::apiResource('/students', StudentController::class);
    Route::apiResource('/applications', ApplicationController::class)->middleware('abilities:student:access');
    Route::apiResource('/internships', InternshipController::class)->except('index');
});


