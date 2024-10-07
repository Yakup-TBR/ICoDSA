<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AboutUs extends Model
{
    use HasFactory;

    // Menentukan nama tabel yang digunakan
    protected $table = 'abouts';

    protected $fillable = [
        'about_img',
        'about_desc',
        'event_dd',
        'event_mmyy',
    ];
}
