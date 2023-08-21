<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\News;

class NewsController extends Controller
{
    public function index()
    {
        $news = News::with(['source', 'category'])->get();
        return $news;
    }

    public function get_authors()
    {
        $news = News::get(['id', 'author']);
        $authors = array_map(function ($item) {
            return is_null($item['author']) ? 'No Author' : $item['author'];
        }, json_decode($news, true));
        $filteredAuthors = array_values(array_filter(array_unique($authors)));
        sort($filteredAuthors);
        return $filteredAuthors;
    }
}
