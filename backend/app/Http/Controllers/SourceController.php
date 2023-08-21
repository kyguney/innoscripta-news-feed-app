<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Source;

class SourceController extends Controller
{
    public function index()
    {
        $sources = Source::get(['id', 'title', 'slug']);
        return $sources;
    }
}
