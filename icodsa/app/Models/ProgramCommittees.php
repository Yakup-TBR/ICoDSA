<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProgramCommittees extends Model
{
    use HasFactory;

    protected $table = 'program_committees';

    protected $fillable = [
        'id',
        'committee_position',
        'committee_members',
    ];
}
