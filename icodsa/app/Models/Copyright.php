<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Copyright extends Model
{
    use HasFactory;
    protected $table = 'copyright';

    protected $fillable = [
        'id',
        'copyright_text'
    ];
}
