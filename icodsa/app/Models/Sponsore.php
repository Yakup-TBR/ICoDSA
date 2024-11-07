<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sponsore extends Model
{
    use HasFactory;

    protected $table = 'sponsored_by';

    protected $fillable = [
        'id',
        'sponsore_logo'
    ];
}
