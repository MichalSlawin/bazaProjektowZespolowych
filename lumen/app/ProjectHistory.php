<?php

namespace App;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class ProjectHistory extends Model
{
    public $table = 'project_history';
    protected $hidden = ['updated_at'];

    public function project()
    {
        return $this->belongsTo("App\Project", "project_id", "id");
    }

    public function getCreatedAtAttribute($value)
    {
        return Carbon::parse($value, 'UTC')->timezone('Europe/Warsaw')->toDateTimeString();
    }
}