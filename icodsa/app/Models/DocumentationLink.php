<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DocumentationLink extends Model
{
    use HasFactory;
    protected $table = 'documentation_link';

    protected $fillable = [
        'id',
        'documentation_cloud',
        'video_link',
    ];
}
