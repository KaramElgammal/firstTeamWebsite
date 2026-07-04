<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NewsItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'tag_en',
        'tag_ar',
        'date',
        'title_en',
        'title_ar',
        'body_en',
        'body_ar',
        'images',
        'sort_order',
    ];

    protected $casts = [
        'images' => 'array',
    ];
}
