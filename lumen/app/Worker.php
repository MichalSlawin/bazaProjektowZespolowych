<?php

namespace App;


class Worker extends CustomModel
{
    public $hidden = ['token', 'pivot', 'created_at', 'updated_at'];
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