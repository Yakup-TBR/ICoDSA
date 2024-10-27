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
        Schema::create('registration', function (Blueprint $table) {
            $table->id();
            $table->string('registration_subtitle')->nullable();
            $table->text('registration_text')->nullable();
            $table->string('registration_button_text')->nullable();
            $table->string('registration_button_link')->nullable();
            $table->enum('registration_add', ['subtitle', 'text', 'button'])->default('subtitle');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('registration');
    }
};
