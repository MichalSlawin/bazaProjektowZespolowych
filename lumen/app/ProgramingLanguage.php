<?php

namespace App;


use Illuminate\Database\Eloquent\Model;

class ProgramingLanguage extends Model
{
    public $timestamps = false;
    public $table = 'programing_language';
    protected $hidden = ['pivot'];

    public function projects()
    {
        return $this->belongsToMany("App\Project", "project_language", "programing_language_id", "project_id");
    }
}