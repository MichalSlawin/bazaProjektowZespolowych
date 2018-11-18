<?php

namespace App;


use Illuminate\Database\Eloquent\Model;

class Worker extends Model
{
    public $hidden = ['token', 'pivot'];
    public $table = 'worker';

    public function projects()
    {
        return $this->hasMany("App\Project", "worker_id", "id");
    }

    public function academicYear()
    {
        return $this->belongsToMany("App\AcademicYear", "worker_academic_year", "worker_id", "academic_year_id");
    }
}