<?php

namespace App;


use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    public $table = 'project';

    protected $hidden = ['pivot'];

    public function status()
    {
        return $this->belongsTo("App\Status", "status_id", "id");
    }

    public function history()
    {
        return $this->hasMany("App\ProjectHistory", "project_id", "id");
    }

    public function owner()
    {
        return $this->hasOne("App\Student", "student_id", "id");
    }

    public function students()
    {
        return $this->belongsToMany("App\Student", "project_student", "project_id", "student_id");
    }

    public function worker()
    {
        return $this->belongsTo("App\Worker", "worker_id", "id");
    }

    public function languages()
    {
        return $this->belongsToMany("App\ProgramingLanguage", "project_language", "project_id", "programing_language_id");
    }

    public function messages()
    {
        return $this->hasMany("App\Message", "project_id", "id");
    }
}