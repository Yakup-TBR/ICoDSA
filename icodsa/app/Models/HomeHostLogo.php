<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HomeHostLogo extends Model
{
    use HasFactory;
    protected $fillable = [
        'id',
        'host_logo',
    ];
}
