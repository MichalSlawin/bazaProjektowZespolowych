<?php

namespace App\Http\Controllers;


use App\ProgramingLanguage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Worker;

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

class ProgramingLanguageController extends Controller
{
    public function getCounted()
    {
        $allLanguages = ProgramingLanguage::with(['projects'])->get();
        $languages = [];

        foreach ($allLanguages as $language)
        {
            $languageCount = new LanguageCount($language->name, count($language->projects));
            $languages[] = $languageCount;
        }
        return response()->json(["languages" => $languages], 200);
    }

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

    public function delete(Request $request)
    {
        $user = Auth::user();
        if(!$user instanceof Worker)
        {
            return response()->json("Unauthorized", 401);
        }
        $programingLanguage = ProgramingLanguage::where('name', $request->get("name"))->take(1)->first();
        if(empty($programingLanguage))
        {
            return response()->json("Technologia nie istnieje", 400);
        }
        $programingLanguage->delete();

        return response()->json("Deleted", 200);
    }

}