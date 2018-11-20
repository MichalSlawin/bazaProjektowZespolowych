<?php

namespace App\Http\Controllers;


use App\ProgramingLanguage;

class ProgramingLanguageController extends Controller
{
    public function get()
    {
        $languages = ProgramingLanguage::all();
        $response = [];
        foreach ($languages as $language)
        {
            $response[] = $language->name;
        }
        return response()->json($response, 200);
    }
}