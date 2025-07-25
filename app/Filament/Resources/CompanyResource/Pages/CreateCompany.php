<?php

namespace App\Filament\Resources\CompanyResource\Pages;

use App\Filament\Resources\CompanyResource;
use Filament\Resources\Pages\CreateRecord;

class CreateCompany extends CreateRecord
{
    protected static string $resource = CompanyResource::class;

    /**
     * Setelah berhasil create, redirect ke halaman lain
     */
    protected function getRedirectUrl(): string
    {
        // ✅ Pilihan 1: Kembali ke Dashboard
        // return '/admin';

        // ✅ Pilihan 2: Tetap ke halaman index resource (default)
        return $this->getResource()::getUrl('index');

        // ✅ Pilihan 3: Kalau mau redirect ke Edit halaman baru dibuat:
        // return $this->getResource()::getUrl('edit', ['record' => $this->record->getKey()]);
    }
}
