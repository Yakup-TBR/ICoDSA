<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    protected $table = 'article';

    protected $fillable = [
        'id',
        'article_img',
        'article_title',
        'article_description',
        'article_link',
        'committee_members',
    ];
}
