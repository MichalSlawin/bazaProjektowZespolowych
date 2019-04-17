<?php

namespace App\Http\Controllers;


use App\LanguageCount;
use App\ProgramingLanguage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Worker;


class ProgramingLanguageController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth', ['except' => ['get']]);
    }

    public function getCounted()
    {
        $user = Auth::user();
        if (!$user instanceof Worker)
        {
            return response()->json("Unauthorized", 401);
        }
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
