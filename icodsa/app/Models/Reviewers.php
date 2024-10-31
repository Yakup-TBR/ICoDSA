<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reviewers extends Model
{
    use HasFactory;

    protected $table = 'reviewers';

    protected $fillable = [
        'id',
        'reviewer_name'
    ];
}
