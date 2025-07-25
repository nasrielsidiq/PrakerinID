<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use function Laravel\Prompts\table;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('address')->nullable();
            $table->string('kota');
            $table->string('provinsi');
            $table->string('phone_number')->nullable();
            $table->boolean('is_verified')->default(false);
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->enum('sector', [
                'Technology',
                'Manufacturing',
                'Finance',
                'Healthcare',
                'Education',
                'Retail', 'other'])->default('other');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('companies');
    }
};
