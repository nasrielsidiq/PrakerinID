<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;

class MakeFilamentAdmin extends Command
{
    /**
     * Nama command.
     */
    protected $signature = 'make:filament-admin 
                            {email : Email admin} 
                            {--name=Admin : Nama admin} 
                            {--password= : Password admin (default: 12345678)}';

    /**
     * Deskripsi command.
     */
    protected $description = 'Buat user admin untuk login ke Filament';

    /**
     * Eksekusi command.
     */
    public function handle(): int
    {
        $email = $this->argument('email'); 
        $name = $this->option('name') ?? 'Admin';
        $password = $this->option('password') ?? '12345678';

        $user = User::updateOrCreate(
            ['email' => $email],
            [
                'name' => $name,
                'password' => bcrypt($password),
            ]
        );

        $this->info(" Admin berhasil dibuat/diupdate!");
        $this->info("➡ Email: {$email}");
        $this->info("➡ Password: {$password}");

        return self::SUCCESS;
    }
}
