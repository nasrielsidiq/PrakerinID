<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CompanyResource\Pages;
use App\Models\Company;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class CompanyResource extends Resource
{
    protected static ?string $model = Company::class;

    protected static ?string $navigationIcon = 'heroicon-o-building-office';
    protected static ?string $navigationLabel = 'Perusahaan';
    protected static ?string $pluralLabel = 'Perusahaan';
    protected static ?string $slug = 'companies';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('name')
                ->label('Nama Perusahaan')
                ->required()
                ->maxLength(255),

            Forms\Components\Textarea::make('address')
                ->label('Alamat'),

            Forms\Components\TextInput::make('kota')
                ->label('Kota')
                ->required(),

            Forms\Components\TextInput::make('provinsi')
                ->label('Provinsi')
                ->required(),

            Forms\Components\TextInput::make('phone_number')
                ->label('No Telepon'),

            Forms\Components\Toggle::make('is_verified')
                ->label('Terverifikasi'),

            Forms\Components\Select::make('sector')
                ->label('Bidang Usaha')
                ->options([
                    'Technology'    => 'Technology',
                    'Manufacturing' => 'Manufacturing',
                    'Finance'       => 'Finance',
                    'Healthcare'    => 'Healthcare',
                    'Education'     => 'Education',
                    'Retail'        => 'Retail',
                    'other'         => 'Other',
                ])
                ->default('other')
                ->required(),

            Forms\Components\TextInput::make('email')
                ->label('Email Akun')
                ->email()
                ->required(fn ($livewire) => $livewire instanceof Pages\CreateCompany)
                ->visible(fn ($livewire) => $livewire instanceof Pages\CreateCompany)
                ->helperText('Email ini akan digunakan untuk login akun perusahaan'),

            Forms\Components\FileUpload::make('logo')
                ->label('Logo')
                ->disk('public') // ✅ simpan di storage/app/public
                ->directory('logos/companies')
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

                Tables\Columns\TextColumn::make('name')->label('Nama Perusahaan')->searchable()->sortable(),
                Tables\Columns\TextColumn::make('kota')->label('Kota'),
                Tables\Columns\TextColumn::make('provinsi')->label('Provinsi'),
                Tables\Columns\TextColumn::make('sector')->label('Sektor'),
                Tables\Columns\IconColumn::make('is_verified')->boolean()->label('Verifikasi'),
                Tables\Columns\TextColumn::make('user.email')->label('Email Akun'),
                Tables\Columns\TextColumn::make('created_at')->dateTime('d M Y')->label('Dibuat'),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('sector')
                    ->label('Filter Sektor')
                    ->options([
                        'Technology'    => 'Technology',
                        'Manufacturing' => 'Manufacturing',
                        'Finance'       => 'Finance',
                        'Healthcare'    => 'Healthcare',
                        'Education'     => 'Education',
                        'Retail'        => 'Retail',
                        'other'         => 'Other',
                    ]),
                Tables\Filters\TernaryFilter::make('is_verified')->label('Verifikasi'),
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

        unset($data['email']); // email bukan kolom di companies
        return $data;
    }

    /** ✅ Saat UPDATE → kalau ada email → update juga User */
    public static function mutateFormDataBeforeSave(array $data): array
    {
        if (isset($data['email'])) {
            $companyId = request()->route('record');
            $companyModel = Company::find($companyId);

            if ($companyModel && $companyModel->user) {
                $companyModel->user->update([
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
            'index' => Pages\ListCompanies::route('/'),
            'create' => Pages\CreateCompany::route('/create'),
            'edit' => Pages\EditCompany::route('/{record}/edit'),
        ];
    }
}
