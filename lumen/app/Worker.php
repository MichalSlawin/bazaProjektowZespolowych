<?php

namespace App;


use Illuminate\Database\Eloquent\Model;

class Worker extends Model
{
    public $hidden = ['token'];
    public $table = 'worker';
}