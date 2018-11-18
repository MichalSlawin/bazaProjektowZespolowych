<?php

namespace App;


use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    public $table = 'message';

    public function project()
    {
        return $this->belongsTo("App\Project", "project_id", "id");
    }
}