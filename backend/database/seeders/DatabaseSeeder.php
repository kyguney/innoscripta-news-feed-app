<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Source;
use App\Models\News;
use Carbon\Carbon;
use Illuminate\Support\Facades\Http;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        // Get Guardian API News
        $guardianCatsArray = ['business', 'sports', 'technology'];
        foreach ($guardianCatsArray as $cat) {
            $guardianResponse = Http::get('https://content.guardianapis.com/search', [
                'api-key' => config('app.guardian_api_key'),
                'page-size' => 10,
                'show-fields' => 'body,byline',
                'query-fields' => 'sectionId',
                'section' => $cat === 'sports' ? 'sport' : $cat,
            ]);
            $guardianResults = $guardianResponse->json();

            if (is_array($guardianResults["response"]["results"]) && !empty($guardianResults["response"]["results"])) {
                foreach ($guardianResults["response"]["results"] as $news) {
                    $categoryId = Category::where('slug', $cat)->pluck('id')->first();
                    $sourceId = Source::where('slug', 'guardian-api')->pluck('id')->first();
                    News::insert([
                        'title' => $news['webTitle'],
                        'content' => $news['fields']['body'],
                        'author' => $news['fields']['byline'],
                        'cat_id' => $categoryId,
                        'source_id' => $sourceId,
                        'news_time' => Carbon::parse($news['webPublicationDate']),
                    ]);
                }
            }
        }

        // New York Times API
        $newyorkCatsArray = ["Business", "Sports", "Technology"];
        for ($i = 1; $i <= 3; $i++) {
            $newYorkResponse = Http::get('https://api.nytimes.com/svc/search/v2/articlesearch.json', [
                'api-key' => config('app.new_york_times_api_key'),
                'page' => $i,
                'fl' => 'headline,byline,news_desk,abstract,snippet,lead_paragraph,pub_date,section_name',
                'fq' => 'news_desk:("' . implode('","', $newyorkCatsArray) . '")',
            ]);
            $newYorkResults = $newYorkResponse->json();

            if (is_array($newYorkResults["response"]["docs"]) && !empty($newYorkResults["response"]["docs"])) {
                foreach ($newYorkResults["response"]["docs"] as $news) {
                    $categoryId = Category::where('title', $news['news_desk'])->pluck('id')->first();
                    $sourceId = Source::where('slug', 'new-york-times-api')->pluck('id')->first();
                    News::insert([
                        'title' => $news['headline']['main'],
                        'content' => $news['lead_paragraph'],
                        'author' => $news['byline']['person'][0]['firstname'] . ($news['byline']['person'][0]['lastname'] ? " " . $news['byline']['person'][0]['lastname'] : ""),
                        'cat_id' => $categoryId,
                        'source_id' => $sourceId,
                        'news_time' => Carbon::parse($news['pub_date']),
                    ]);
                }
            }
        }

        // NewsAPI
        $newsApiCatsArray = [
            [
                'slug' => 'business',
                'source' => 'financial-post'
            ],
            [
                'slug' => 'sports',
                'source' => 'espn'
            ],
            [
                'slug' => 'technology',
                'source' => 'engadget'
            ]
        ];
        foreach ($newsApiCatsArray as $cat) {
            $newsApiResponse = Http::get('https://newsapi.org/v2/everything', [
                'apiKey' => config('app.newsapi_api_key'),
                'pageSize' => 10,
                'sources' => $cat['source']
            ]);
            $newsApiResults = $newsApiResponse->json();

            if (is_array($newsApiResults["articles"]) && !empty($newsApiResults["articles"])) {
                foreach ($newsApiResults["articles"] as $news) {
                    $categoryId = Category::where('slug', $cat['slug'])->pluck('id')->first();
                    $sourceId = Source::where('slug', 'news-api')->pluck('id')->first();
                    News::insert([
                        'title' => $news['title'],
                        'content' => $news['content'],
                        'author' => $news['author'],
                        'cat_id' => $categoryId,
                        'source_id' => $sourceId,
                        'news_time' => Carbon::parse($news['publishedAt']),
                    ]);
                }
            }
        }
    }
}
