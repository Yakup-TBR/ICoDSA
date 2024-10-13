<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ImportantDateBg extends Model
{
    use HasFactory;

    protected $table = 'important_date_bg';

    protected $fillable = [
        'id',
        'important_date_bg'
    ];
}
