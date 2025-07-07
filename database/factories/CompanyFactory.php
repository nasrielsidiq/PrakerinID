<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Company>
 */
class CompanyFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => $this->faker->company(),
            'address' => $this->faker->address(),
            'phone_number' => $this->faker->phoneNumber(),
            'user_id' => User::factory(),
            'logo' => $this->faker->imageUrl(200, 200, 'business', true, 'logo'),
            'is_verified' => $this->faker->boolean(),
            'sector' => $this->faker->randomElement([
                'Technology',
                'Manufacturing',
                'Finance',
                'Healthcare',
                'Education',
                'Retail'
            ]),
        ];
    }
}
