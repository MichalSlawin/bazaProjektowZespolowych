<?php

namespace App;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class CustomModel extends Model
{
    public function getCreatedAtAttribute($value)
    {
        return Carbon::parse($value, 'UTC')->timezone('Europe/Warsaw')->toDateTimeString();
    }

    public function getUpdatedAtAttribute($value)
    {
        return Carbon::parse($value, 'UTC')->timezone('Europe/Warsaw')->toDateTimeString();
    }
}