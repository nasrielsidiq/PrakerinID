<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SchoolResource\Pages;
use App\Models\School;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class SchoolResource extends Resource
{
    protected static ?string $model = School::class;

    protected static ?string $navigationIcon = 'heroicon-o-building-library';
    protected static ?string $navigationLabel = 'Sekolah';
    protected static ?string $pluralLabel = 'Sekolah';
    protected static ?string $slug = 'schools';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('name')
                ->label('Nama Sekolah')
                ->required()
                ->maxLength(255),

            Forms\Components\Textarea::make('address')
                ->label('Alamat'),

            Forms\Components\TextInput::make('phone_number')
                ->label('No Telepon'),

            Forms\Components\Toggle::make('is_verified')
                ->label('Terverifikasi'),

            Forms\Components\TextInput::make('email')
                ->label('Email Akun')
                ->email()
                ->required(fn ($livewire) => $livewire instanceof Pages\CreateSchool)
                ->visible(fn ($livewire) => $livewire instanceof Pages\CreateSchool)
                ->helperText('Email ini akan digunakan untuk login akun sekolah'),

            Forms\Components\FileUpload::make('logo')
                ->label('Logo')
                ->disk('public') // ✅ simpan di storage/app/public
                ->directory('logos/schools')
                ->image()
                ->imagePreviewHeight('100'),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('logo')
                    ->label('Logo')
                    ->disk('public') // ✅ ambil dari public/storage
                    ->square(),

                Tables\Columns\TextColumn::make('name')->label('Nama Sekolah')->searchable()->sortable(),
                Tables\Columns\TextColumn::make('phone_number')->label('Telepon'),
                Tables\Columns\IconColumn::make('is_verified')->boolean()->label('Verifikasi'),
                Tables\Columns\TextColumn::make('user.email')->label('Email Akun'),
                Tables\Columns\TextColumn::make('created_at')->dateTime('d M Y')->label('Dibuat'),
            ])
            ->filters([
                Tables\Filters\TernaryFilter::make('is_verified')->label('Filter Verifikasi'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
            ]);
    }

    /** ✅ Saat CREATE → buat User otomatis lalu isi user_id */
    public static function mutateFormDataBeforeCreate(array $data): array
    {
        $user = User::firstOrCreate(
            ['email' => $data['email']],
            [
                'name' => $data['name'],
                'password' => bcrypt('12345678'),
            ]
        );

        $data['user_id'] = $user->id;

        unset($data['email']); // email bukan kolom di schools
        return $data;
    }

    /** ✅ Saat UPDATE → kalau ada email → update juga User */
    public static function mutateFormDataBeforeSave(array $data): array
    {
        if (isset($data['email'])) {
            $schoolId = request()->route('record');
            $schoolModel = School::find($schoolId);

            if ($schoolModel && $schoolModel->user) {
                $schoolModel->user->update([
                    'email' => $data['email'],
                    'name'  => $data['name'],
                ]);
            }
            unset($data['email']);
        }
        return $data;
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListSchools::route('/'),
            'create' => Pages\CreateSchool::route('/create'),
            'edit' => Pages\EditSchool::route('/{record}/edit'),
        ];
    }
}
