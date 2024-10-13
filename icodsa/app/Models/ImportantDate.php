<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ImportantDate extends Model
{
    use HasFactory;

    protected $table = 'important_date';

    protected $fillable = [
        'id',
        'activity',
        'activity_icon',
        'event_date',
    ];
}
