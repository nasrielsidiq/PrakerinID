<?php

namespace App\Filament\Resources;

use App\Filament\Resources\AnnouncementResource\Pages;
use App\Models\Announcement;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class AnnouncementResource extends Resource
{
    protected static ?string $model = Announcement::class;

    protected static ?string $navigationIcon = 'heroicon-o-megaphone';
    protected static ?string $navigationLabel = 'Pengumuman';
    protected static ?string $pluralLabel = 'Pengumuman';
    protected static ?string $slug = 'announcements';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('title')
                ->label('Judul Pengumuman')
                ->required()
                ->maxLength(255),

            Forms\Components\Textarea::make('description')
                ->label('Isi Pengumuman')
                ->required()
                ->rows(5),

            Forms\Components\Select::make('type')
                ->label('Jenis Pengumuman')
                ->options([
                    'updates'        => 'Pembaruan',
                    'news'           => 'Berita',
                    'advertisements' => 'Iklan',
                ])
                ->default('news')
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

                Tables\Columns\TextColumn::make('type')
                    ->label('Jenis')
                    ->badge()
                    ->formatStateUsing(fn ($state) => match ($state) {
                        'updates'        => 'Pembaruan',
                        'news'           => 'Berita',
                        'advertisements' => 'Iklan',
                        default          => 'Berita',
                    }),

                Tables\Columns\TextColumn::make('created_at')
                    ->label('Dibuat')
                    ->dateTime('d M Y H:i'),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('type')
                    ->label('Filter Jenis')
                    ->options([
                        'updates'        => 'Pembaruan',
                        'news'           => 'Berita',
                        'advertisements' => 'Iklan',
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
            'index'  => Pages\ListAnnouncements::route('/'),
            'create' => Pages\CreateAnnouncement::route('/create'),
            'edit'   => Pages\EditAnnouncement::route('/{record}/edit'),
        ];
    }
}
