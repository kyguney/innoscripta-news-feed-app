<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    /**
     * @var string $table
     */
    protected $table = 'news';

    use HasFactory;

    public function category()
    {
        return $this->belongsTo(Category::class, 'cat_id', 'id');
    }

    public function source()
    {
        return $this->belongsTo(Source::class, 'source_id', 'id');
    }
}
