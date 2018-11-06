<?php

namespace App;


use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    public $hidden = ['token'];
    public $table = 'student';
}