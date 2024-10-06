<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {

        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('content');
            $table->timestamps();
        });

        Schema::create('home', function (Blueprint $table) {
            $table->id();
            $table->string('host_logo')->nullable();
            $table->string('title')->nullable();
            $table->string('place_date')->nullable();
            $table->text('description')->nullable();
            $table->string('home_bg')->nullable();
            $table->timestamps();
        });

        Schema::create('about_us', function (Blueprint $table) {
            $table->id();
            $table->string('about_img')->nullable();
            $table->text('about_desc')->nullable();
            $table->date('event_date')->nullable();
            $table->timestamps();
        });

        Schema::create('speakers', function (Blueprint $table) {
            $table->id();
            $table->string('speakers_img')->nullable();
            $table->string('speakers_name')->nullable();
            $table->string('speakers_desc')->nullable();
            $table->timestamps();
        });

        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
        Schema::dropIfExists('home');
        Schema::dropIfExists('about_us');
        Schema::dropIfExists('speakers');
    }
};
