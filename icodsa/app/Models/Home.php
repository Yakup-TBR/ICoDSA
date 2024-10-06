<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Home extends Model
{
    use HasFactory;
    protected $fillable = [
        'host_logo',
        'title',
        'place_date',
        'description',
        'home_bg'
    ];
}