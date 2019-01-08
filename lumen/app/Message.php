<?php

namespace App;


class Message extends CustomModel
{
    public $table = 'message';

    public function project()
    {
        return $this->belongsTo("App\Project", "project_id", "id");
    }
}