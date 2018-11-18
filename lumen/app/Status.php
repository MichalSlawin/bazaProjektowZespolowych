<?php

namespace App;


use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
    public $timestamps = false;
    public $table = 'status';

    public function projects()
    {
        return $this->hasMany("App\Project", "status_id", "id");
    }
}