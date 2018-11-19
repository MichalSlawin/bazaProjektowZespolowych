<?php

namespace App;


use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    public $hidden = ['token', 'pivot', 'created_at', 'updated_at'];
    public $table = 'student';
}