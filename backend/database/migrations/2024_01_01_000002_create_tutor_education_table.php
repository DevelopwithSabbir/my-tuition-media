<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tutor_education', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tutor_id')->constrained('tutors')->onDelete('cascade');
            $table->string('level'); // SSC, HSC, Graduation
            $table->string('institute');
            $table->string('curriculum');
            $table->string('group')->nullable();
            $table->string('passing_year');
            $table->string('result');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tutor_education');
    }
};