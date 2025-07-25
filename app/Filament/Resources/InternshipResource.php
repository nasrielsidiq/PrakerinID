<?php

namespace App\Filament\Resources;

use App\Filament\Resources\InternshipResource\Pages;
use App\Models\Internship;
use App\Models\Company;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class InternshipResource extends Resource
{
    protected static ?string $model = Internship::class;

    protected static ?string $navigationIcon = 'heroicon-o-briefcase';
    protected static ?string $navigationLabel = 'Lowongan';
    protected static ?string $pluralLabel = 'Lowongan';
    protected static ?string $slug = 'internships';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('title')
                ->label('Judul Lowongan')
                ->required()
                ->maxLength(255),

            Forms\Components\Textarea::make('description')
                ->label('Deskripsi')
                ->rows(4)
                ->required(),

            Forms\Components\Select::make('company_id')
                ->label('Perusahaan')
                ->options(Company::query()->pluck('name', 'id'))
                ->searchable()
                ->required(),

            Forms\Components\DatePicker::make('start_date')
                ->label('Tanggal Mulai')
                ->required(),

            Forms\Components\DatePicker::make('end_date')
                ->label('Tanggal Selesai')
                ->required(),

            Forms\Components\Select::make('grade')
                ->label('Tingkat Pendidikan')
                ->options([
                    'SMK' => 'SMK',
                    'Mahasiswa' => 'Mahasiswa',
                    'all' => 'Semua',
                ])
                ->default('all')
                ->required(),

            Forms\Components\Select::make('bidang')
                ->label('Bidang')
                ->options([
                    'IT' => 'IT',
                    'Embedding' => 'Embedding',
                    'Other' => 'Other',
                ])
                ->default('Other')
                ->required(),

            Forms\Components\Select::make('type')
                ->label('Tipe Kerja')
                ->options([
                    'wfh' => 'WFH',
                    'full time' => 'Full Time',
                    'hybrid' => 'Hybrid',
                ])
                ->required(),

            Forms\Components\TextInput::make('kuota')
                ->label('Kuota')
                ->numeric()
                ->default(3)
                ->required(),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('title')
                    ->label('Judul')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('company.name')
                    ->label('Perusahaan')
                    ->sortable()
                    ->searchable(),

                Tables\Columns\TextColumn::make('grade')
                    ->label('Tingkat'),

                Tables\Columns\TextColumn::make('bidang')
                    ->label('Bidang'),

                Tables\Columns\TextColumn::make('type')
                    ->label('Tipe'),

                Tables\Columns\TextColumn::make('kuota')
                    ->label('Kuota'),

                Tables\Columns\TextColumn::make('start_date')
                    ->label('Mulai')
                    ->date('d M Y'),

                Tables\Columns\TextColumn::make('end_date')
                    ->label('Selesai')
                    ->date('d M Y'),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('company_id')
                    ->label('Perusahaan')
                    ->options(Company::all()->pluck('name', 'id')),

                Tables\Filters\SelectFilter::make('grade')
                    ->label('Tingkat Pendidikan')
                    ->options([
                        'SMK' => 'SMK',
                        'Mahasiswa' => 'Mahasiswa',
                        'all' => 'Semua',
                    ]),

                Tables\Filters\SelectFilter::make('bidang')
                    ->label('Bidang')
                    ->options([
                        'IT' => 'IT',
                        'Embedding' => 'Embedding',
                        'Other' => 'Other',
                    ]),

                Tables\Filters\SelectFilter::make('type')
                    ->label('Tipe Kerja')
                    ->options([
                        'wfh' => 'WFH',
                        'full time' => 'Full Time',
                        'hybrid' => 'Hybrid',
                    ]),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListInternships::route('/'),
            'create' => Pages\CreateInternship::route('/create'),
            'edit' => Pages\EditInternship::route('/{record}/edit'),
        ];
    }
}
