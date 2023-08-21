<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    /**
     * @var string $table
     */
    protected $table = 'category';

    /**
     * @var array $fillable
     */
    protected $fillable = [
        'title',
        'slug'
    ];

    public function news(){
        return $this->hasMany(News::class, 'cat_id', 'id');
    }

    use HasFactory;
}
