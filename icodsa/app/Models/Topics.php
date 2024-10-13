<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Topics extends Model
{
    use HasFactory;
    protected $table = 'topics';
    
    protected $fillable = [
        'id',
        'topic_order',
        'topic_title',
        'topic_list',
    ];
}
