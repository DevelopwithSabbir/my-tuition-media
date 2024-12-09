<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tuition_posts', function (Blueprint $table) {
            $table->id();
            $table->string('tuition_code')->unique();
            $table->string('guardian_mobile');
            $table->string('student_gender');
            $table->string('class');
            $table->string('subject');
            $table->string('version');
            $table->integer('days_per_week');
            $table->decimal('salary', 10, 2);
            $table->string('location');
            $table->json('tutor_requirements');
            $table->enum('status', ['pending', 'approved', 'rejected', 'cancelled'])->default('pending');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tuition_posts');
    }
};