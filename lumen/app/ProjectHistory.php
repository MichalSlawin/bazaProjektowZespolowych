<?php

namespace App;


use Illuminate\Database\Eloquent\Model;

class ProjectHistory extends Model
{
    public $table = 'project_history';
    protected $hidden = ['updated_at'];

    public function project()
    {
        return $this->belongsTo("App\Project", "project_id", "id");
    }
}