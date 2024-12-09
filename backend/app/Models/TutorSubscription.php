<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TutorSubscription extends Model
{
    protected $fillable = [
        'tutor_id',
        'plan',
        'status',
        'features',
        'started_at',
        'expires_at'
    ];

    protected $casts = [
        'features' => 'array',
        'started_at' => 'datetime',
        'expires_at' => 'datetime'
    ];

    public function tutor()
    {
        return $this->belongsTo(Tutor::class);
    }

    public function isActive()
    {
        return $this->status === 'active' && $this->expires_at > now();
    }
}