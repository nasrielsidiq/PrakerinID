<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class AnnouncementFactory extends Factory
{
    public function definition(): array
    {
        return [
            'title'       => $this->faker->sentence(6),
            'description' => $this->faker->paragraph(4),
            'type'        => $this->faker->randomElement([
                'updates',
                'news',
                'advertisements',
            ]),
        ];
    }
}
