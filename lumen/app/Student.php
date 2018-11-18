<?php

namespace App;


use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    public $hidden = ['token', 'pivot'];
    public $table = 'student';
}