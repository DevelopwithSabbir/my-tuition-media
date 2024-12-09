<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rating extends Model
{
    protected $fillable = [
        'tutor_id',
        'guardian_id',
        'tuition_id',
        'rating',
        'review',
        'teaching_quality',
        'communication',
        'punctuality',
        'subject_expertise'
    ];

    protected $casts = [
        'rating' => 'integer',
        'teaching_quality' => 'integer',
        'communication' => 'integer',
        'punctuality' => 'integer',
        'subject_expertise' => 'integer'
    ];

    public function tutor()
    {
        return $this->belongsTo(Tutor::class);
    }

    public function guardian()
    {
        return $this->belongsTo(Guardian::class);
    }

    public function tuition()
    {
        return $this->belongsTo(Tuition::class);
    }
}