<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HomeButtonLink extends Model
{
    use HasFactory;

    protected $table = 'home_button_link';

    protected $fillable = [
        'id',
        'submit_here_link',
        'presentation_schedule_link'
    ];
}
