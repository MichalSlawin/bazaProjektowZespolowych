<?php

namespace App;


class Status extends CustomModel
{
    public $timestamps = false;
    public $table = 'status';

    public function projects()
    {
        return $this->hasMany("App\Project", "status_id", "id");
    }
}