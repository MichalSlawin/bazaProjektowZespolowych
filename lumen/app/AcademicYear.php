<?php

namespace App;


class AcademicYear extends CustomModel
{
    public $timestamps = false;
    protected $hidden = ['pivot'];
    public $table = 'academic_year';


    public function workers()
    {
        return $this->belongsToMany("App\Worker", "worker_academic_year", "academic_year_id", "worker_id");
    }
}