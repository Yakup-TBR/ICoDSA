<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DocumentationImage extends Model
{
    use HasFactory;

    protected $table = 'documentation_img';

    protected $fillable = [
        'id',
        'documentation_img',
    ];
}
