<?php

use App\Models\Source;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSourceTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('source', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug');
            $table->timestamps();
        });


        Source::insert([
            [
                'title' => 'Guardian API',
                'slug' => 'guardian-api',
            ],
            [
                'title' => 'NewsAPI',
                'slug' => 'news-api',
            ],
            [
                'title' => 'New york Times API',
                'slug' => 'new-york-times-api',
            ]
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('source');
    }
}
