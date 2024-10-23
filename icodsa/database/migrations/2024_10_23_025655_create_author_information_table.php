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
        Schema::create('author_information', function (Blueprint $table) {
            $table->id();
            $table->string('author_subtitle')->nullable();
            $table->text('author_text')->nullable();
            $table->string('author_add_text')->nullable();
            $table->string('author_button_link')->nullable();
            $table->enum('author_add', ['subtitle', 'text', 'button'])->default('subtitle');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('author_information');
    }
};
