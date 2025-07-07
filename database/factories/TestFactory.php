<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Internship;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Test>
 */
class TestFactory extends Factory
{
    public function definition(): array
    {
        return [
            'title' => 'Test - ' . $this->faker->words(2, true),
            'description' => $this->faker->paragraph(3),
            'intrenship_id' => Internship::inRandomOrder()->first()?->id ?? Internship::factory(),
        ];
    }
}
