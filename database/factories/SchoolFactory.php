<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\School>
 */
class SchoolFactory extends Factory
{
    public function definition(): array
    {
        static $schoolNumber = 1;

        return [
            'name' => 'School ' . $schoolNumber++, // ngurut school1, school2, jsb
            'address' => $this->faker->address(),
            'phone_number' => $this->faker->phoneNumber(),
            'is_verified' => $this->faker->boolean(), // random true / false
            'user_id' => User::factory()->create(["role" => "school"]), // otomatis nyieun user lamun henteu dipasihan
        ];
    }
}
