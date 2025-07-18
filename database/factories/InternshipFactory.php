<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Company;
use App\Models\Internship;
use App\Models\Test;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Internship>
 */
class InternshipFactory extends Factory
{
    public function definition(): array
    {
        return [
            'title' => $this->faker->jobTitle(),
            'description' => $this->faker->paragraph(4),
            'start_date' => $this->faker->dateTimeBetween('now', '+1 month')->format('Y-m-d'),
            'end_date' => $this->faker->dateTimeBetween('+2 months', '+9 months')->format('Y-m-d'),
            'company_id' => Company::inRandomOrder()->first()?->id ?? Company::factory(),
            'kuota' => $this->faker->numberBetween(1, 20),
            'grade' => $this->faker->randomElement(['SMK', 'Mahasiswa', 'all']),
            'bidang' => $this->faker->randomElement(['IT', 'Embedding']),
            'type' => $this->faker->randomElement(['wfh', 'full time', 'hybrid'])
        ];
    }

    // public function configure(): static
    // {
    //     return $this->afterCreating(function (Internship $internship) {
    //         Test::factory()->create([
    //             'title' => 'Tes Teori',
    //             'description' => fake()->paragraph(2),
    //             'intrenship_id' => $internship->id,
    //             'type' => "teori"
    //         ]);

    //         Test::factory()->create([
    //             'title' => 'Tes Praktik',
    //             'description' => fake()->paragraph(2),
    //             'intrenship_id' => $internship->id,
    //             'type' => "praktik"
    //         ]);
    //     });
    // }
}
