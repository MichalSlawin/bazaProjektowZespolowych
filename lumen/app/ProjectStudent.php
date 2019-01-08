<?php

namespace App;


class ProjectStudent extends CustomModel
{
    public $table = 'project_student';

    public function student()
    {
        return $this->hasOne("App\Student", "id", "student_id");
    }
}