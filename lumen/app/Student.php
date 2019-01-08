<?php

namespace App;


class Student extends CustomModel
{
    public $hidden = ['token', 'created_at', 'updated_at'];
    public $table = 'student';
}