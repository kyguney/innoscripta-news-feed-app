<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Source extends Model
{
    /**
     * @var string $table
     */
    protected $table = 'source';

    /**
     * @var array $fillable
     */
    protected $fillable = [
        'title',
        'slug'
    ];

    use HasFactory;

    public function news(){
        return $this->hasMany(News::class, 'source_id', 'id');
    }
}
