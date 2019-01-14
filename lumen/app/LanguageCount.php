<?php
namespace App;


class LanguageCount
{
    public $name = '';
    public $count = 0;

    public function __construct($name, $count)
    {
        $this->name = $name;
        $this->count = $count;
    }
}
