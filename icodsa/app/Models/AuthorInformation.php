<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AuthorInformation extends Model
{
    use HasFactory;

    protected $table = 'author_information';

    protected $fillable = [
        'id',
        'author_subtitle',
        'author_text',
        'author_button_link',
        'author_add_text',
        'author_add'
    ];
    
}
