<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Tutor extends Model
{
    protected $fillable = [
        'tutor_id',
        'name',
        'email',
        'mobile',
        'password',
        'gender',
        'about',
        'current_city',
        'current_area',
        'permanent_location',
        'profile_complete',
        'status'
    ];

    protected $hidden = [
        'password',
    ];

    public function education(): HasMany
    {
        return $this->hasMany(TutorEducation::class);
    }

    public function applications(): HasMany
    {
        return $this->hasMany(TutorApplication::class);
    }
}