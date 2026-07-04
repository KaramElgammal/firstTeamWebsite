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
        Schema::create('news_items', function (Blueprint $table) {
            $table->id();
            $table->string('tag_en')->nullable();
            $table->string('tag_ar')->nullable();
            $table->string('date')->nullable();
            $table->string('title_en');
            $table->string('title_ar');
            $table->longText('body_en');
            $table->longText('body_ar');
            $table->json('images')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('name_en');
            $table->string('name_ar');
            $table->longText('description_en');
            $table->longText('description_ar');
            $table->json('images')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('icon')->default('CodeXml');
            $table->string('title_en');
            $table->string('title_ar');
            $table->longText('description_en');
            $table->longText('description_ar');
            $table->string('image')->nullable();
            $table->string('request_route')->default('service-request');
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services');
        Schema::dropIfExists('projects');
        Schema::dropIfExists('news_items');
    }
};
