<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Registration extends Model
{
    use HasFactory;
    protected $table = 'registration';

    protected $fillable = [
        'id',
        'registration_subtitle',
        'registration_text',
        'registration_button_link',
        'registration_button_text',
        'registration_add'
    ];
}
