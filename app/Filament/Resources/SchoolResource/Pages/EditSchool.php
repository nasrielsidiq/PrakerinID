<?php

namespace App\Filament\Resources\SchoolResource\Pages;

use App\Filament\Resources\SchoolResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use Filament\Notifications\Notification;

class EditSchool extends EditRecord
{
    protected static string $resource = SchoolResource::class;

    /**
     * Setelah update sukses, kirim notifikasi.
     */
    protected function afterSave(): void
    {
        Notification::make()
            ->title(' Data sekolah berhasil diperbarui!')
            ->success()
            ->send();
    }

    /**
     * Tambahkan tombol ekstra (opsional)
     */
    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(), // Tombol hapus
        ];
    }

    /**
     * Setelah edit, redirect ke list.
     */
    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}
