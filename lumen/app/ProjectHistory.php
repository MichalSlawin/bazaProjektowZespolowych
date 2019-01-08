<?php

namespace App;



class ProjectHistory extends CustomModel
{
    public $table = 'project_history';
    protected $hidden = ['updated_at'];

    public function project()
    {
        return $this->belongsTo("App\Project", "project_id", "id");
    }
}