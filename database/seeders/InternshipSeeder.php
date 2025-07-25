<?php

namespace Database\Seeders;

use App\Models\Internship;
use App\Models\Slug;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class InternshipSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $slugs = Slug::factory()->count(40)->create();

        // Buat 5 internship, setiap internship dikaitkan ke 2-4 slug random
        Internship::factory(20)->create()->each(function ($internship) use ($slugs) {
            $randomSlugs = $slugs->random(rand(2, 4))->pluck('id');
            $internship->slugs()->attach($randomSlugs);
        });
    }
}
