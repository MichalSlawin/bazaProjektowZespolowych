<?php

namespace App;


use Illuminate\Database\Eloquent\Model;

class AcademicYear extends Model
{
    public $timestamps = false;
    public $table = 'academic_year';


    public function workers()
    {
        return $this->belongsToMany("App\Worker", "worker_academic_year", "academic_year_id", "worker_id");
    }
}