<?php

namespace App;


class ProgramingLanguage extends CustomModel
{
    public $timestamps = false;
    public $table = 'programing_language';
    protected $hidden = ['pivot'];

    public function projects()
    {
        return $this->belongsToMany("App\Project", "project_language", "programing_language_id", "project_id");
    }
}