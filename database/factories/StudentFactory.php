<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\School;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Student>
 */
class StudentFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'date_of_birth' => $this->faker->date('Y-m-d', '-18 years'), // umur kisaran 18 taun
            'gender' => $this->faker->randomElement(['male', 'female']),
            'phone_number' => $this->faker->phoneNumber(),
            'address' => $this->faker->address(),
            'school_id' => School::inRandomOrder()->first()?->id ?? School::factory(), // otomatis nyieun school lamun henteu dipasihkeun
            'user_id' => User::factory(),     // otomatis nyieun user
        ];
    }
}
