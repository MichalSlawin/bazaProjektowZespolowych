<?php

namespace App;


use Illuminate\Database\Eloquent\Model;

class ProjectStudent extends Model
{
    public $table = 'project_student';

    public function student()
    {
        return $this->hasOne("App\Student", "id", "student_id");
    }
}