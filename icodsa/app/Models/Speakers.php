<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Speakers extends Model
{
    use HasFactory;

    protected $fillable = [
        'speakers_img',
        'speakers_name',
        'speakers_desc',
    ];
}