<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('ratings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tutor_id')->constrained('tutors')->onDelete('cascade');
            $table->foreignId('guardian_id')->constrained('guardians')->onDelete('cascade');
            $table->foreignId('tuition_id')->constrained('tuitions')->onDelete('cascade');
            $table->integer('rating');
            $table->text('review');
            $table->integer('teaching_quality')->nullable();
            $table->integer('communication')->nullable();
            $table->integer('punctuality')->nullable();
            $table->integer('subject_expertise')->nullable();
            $table->timestamps();
        });

        Schema::create('rating_reports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('rating_id')->constrained('ratings')->onDelete('cascade');
            $table->text('reason');
            $table->enum('status', ['pending', 'reviewed', 'resolved'])->default('pending');
            $table->text('admin_notes')->nullable();
            $table->timestamp('resolved_at')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('rating_reports');
        Schema::dropIfExists('ratings');
    }
};