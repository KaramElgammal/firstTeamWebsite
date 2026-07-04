<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'icon',
        'title_en',
        'title_ar',
        'description_en',
        'description_ar',
        'image',
        'request_route',
        'sort_order',
    ];
}
