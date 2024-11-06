<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentMethods extends Model
{
    use HasFactory;

    protected $table = 'payment_methods';

    protected $fillable = [
        'id',
        'payment_method',
        'payment_details',
        'payment_additional_info',
        'method_or_info'
    ];
}
