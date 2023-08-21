<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SourceController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\NewsController;
use App\Models\User;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['auth:sanctum'])->post('/update-user', function (Request $request) {
    $updatedData = User::where('id', $request->id)->update([
        'id' => $request->id,
        'authors' => $request->authors,
        'cats' => $request->cats,
        'sources' => $request->sources,
    ]);
    return $updatedData;
});

Route::get('/sources', [SourceController::class, 'index']);
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/authors', [NewsController::class, 'get_authors']);
Route::get('/news', [NewsController::class, 'index']);
