<?php

namespace App\Filament\Resources;

use App\Filament\Resources\StudentResource\Pages;
use App\Models\Student;
use App\Models\School;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class StudentResource extends Resource
{
    protected static ?string $model = Student::class;

    protected static ?string $navigationIcon = 'heroicon-o-academic-cap';
    protected static ?string $navigationLabel = 'Siswa';
    protected static ?string $pluralLabel = 'Siswa';
    protected static ?string $slug = 'students';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('name')
                ->label('Nama Siswa')
                ->required()
                ->maxLength(255),

            Forms\Components\DatePicker::make('date_of_birth')
                ->label('Tanggal Lahir')
                ->required(),

            Forms\Components\Select::make('gender')
                ->label('Jenis Kelamin')
                ->options([
                    'male' => 'Laki-Laki',
                    'female' => 'Perempuan',
                ])
                ->required(),

            Forms\Components\TextInput::make('phone_number')->label('No Telepon'),

            Forms\Components\Textarea::make('address')->label('Alamat'),

            Forms\Components\Select::make('school_id')
                ->label('Sekolah')
                ->options(School::all()->pluck('name', 'id'))
                ->searchable()
                ->required(),

            // Email hanya muncul saat CREATE
            Forms\Components\TextInput::make('email')
                ->label('Email Akun')
                ->email()
                ->required(fn ($livewire) => $livewire instanceof Pages\CreateStudent)
                ->visible(fn ($livewire) => $livewire instanceof Pages\CreateStudent)
                ->helperText('Email ini akan digunakan untuk login akun siswa'),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->label('Nama')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('gender')
                    ->label('Jenis Kelamin')
                    ->formatStateUsing(fn ($state) => $state === 'male' ? 'Laki-Laki' : 'Perempuan'),

                Tables\Columns\TextColumn::make('date_of_birth')
                    ->label('Tanggal Lahir')
                    ->date('d M Y'),

                Tables\Columns\TextColumn::make('phone_number')
                    ->label('Telepon'),

                Tables\Columns\TextColumn::make('school.name')
                    ->label('Sekolah'),

                Tables\Columns\TextColumn::make('user.email')
                    ->label('Email Akun'),

                Tables\Columns\TextColumn::make('created_at')
                    ->label('Dibuat')
                    ->dateTime('d M Y'),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('gender')
                    ->label('Filter Jenis Kelamin')
                    ->options([
                        'male' => 'Laki-Laki',
                        'female' => 'Perempuan',
                    ]),
                Tables\Filters\SelectFilter::make('school_id')
                    ->label('Filter Sekolah')
                    ->options(School::all()->pluck('name', 'id')),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
            ]);
    }

    /**
     * Saat CREATE → buat User otomatis lalu isi user_id
     */
    public static function mutateFormDataBeforeCreate(array $data): array
    {
        $user = User::firstOrCreate(
            ['email' => $data['email']],
            [
                'name' => $data['name'],
                'password' => bcrypt('12345678'), // default password
            ]
        );

        $data['user_id'] = $user->id;

        unset($data['email']); // email tidak disimpan di tabel students
        return $data;
    }

    /**
     * Saat UPDATE → kalau ada email → update juga User
     */
    public static function mutateFormDataBeforeSave(array $data): array
    {
        if (isset($data['email'])) {
            $studentId = request()->route('record');
            $studentModel = Student::find($studentId);

            if ($studentModel && $studentModel->user) {
                $studentModel->user->update([
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
            'index' => Pages\ListStudents::route('/'),
            'create' => Pages\CreateStudent::route('/create'),
            'edit' => Pages\EditStudent::route('/{record}/edit'),
        ];
    }
}
