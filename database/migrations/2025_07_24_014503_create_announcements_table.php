<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('announcements', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            
            // ✅ Jenis pengumuman sudah disederhanakan
            $table->enum('type', ['updates', 'news', 'advertisements'])->default('news');

            $table->timestamps(); 
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('announcements');
    }
};
