<?php

namespace App\Http\Controllers;



use App\Project;
use App\Student;
use App\Worker;
use Illuminate\Support\Facades\Auth;

class ProjectController
{
    public function get()
    {
        $user = Auth::user();
        if($user instanceof Student || $user instanceof Worker)
        {
            //Wszystkie projekty
            $projects = Project::with(['languages', 'status'])->get();
            return response()->json($projects, 200);
        }
        else
        {
            //Tylko aktywne
            $projects = Project::with(['languages', 'status'])->where('status_id', 3)->get();
            return response()->json($projects, 200);
        }
    }
}