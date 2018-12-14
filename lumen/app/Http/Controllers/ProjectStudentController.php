<?php

namespace App\Http\Controllers;


use App\AcademicYear;
use App\Project;
use App\ProjectStudent;
use App\Student;
use Illuminate\Support\Facades\Auth;

class ProjectStudentController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function delete($id)
    {
        $user = Auth::user();
        if($id == $user->id)
        {
            return response()->json("Nie można wykonać takiej operacji", 400);
        }
        if($user instanceof Student)
        {
            $academicYear = AcademicYear::orderBy('id', 'desc')->take(1)->first();
            $project = Project::with(['students'])
                ->where('student_id', $user->id)
                ->where('academic_year_id', $academicYear->id)
                ->where('status_id', 1)
                ->orderBy('id', 'desc')
                ->take(1)
                ->first();
            if(empty($project))
            {
                return response()->json("Nie masz projektu", 404);
            }
            $projectStudent = ProjectStudent::where('project_id', $project->id)->where('student_id', $id)->first();
            if(empty($projectStudent))
            {
                return response()->json("Nie ma takiej osoby", 400);
            }
            $projectStudent->accepted = 0;
            $projectStudent->save();
            return response()->json("OK", 200);
        }
        return response()->json("Unauthorized", 401);
    }

    public function accept($id)
    {
        $user = Auth::user();
        if($id == $user->id)
        {
            return response()->json("Nie można wykonać takiej operacji", 400);
        }
        if($user instanceof Student)
        {
            $academicYear = AcademicYear::orderBy('id', 'desc')->take(1)->first();
            $project = Project::with(['students'])
                ->where('student_id', $user->id)
                ->where('academic_year_id', $academicYear->id)
                ->where('status_id', 1)
                ->orderBy('id', 'desc')
                ->take(1)
                ->first();
            if(empty($project))
            {
                return response()->json("Nie masz projektu", 404);
            }
            $acceptedCount = 0;
            foreach ($project->students as $student)
            {
                if($student["pivot"]["accepted"] == 1)
                {
                    $acceptedCount++;
                }
            }
            if($acceptedCount >= 4)
            {
                return response()->json("Do projektu jest już zapisana maksymalna ilość osób", 400);
            }
            $projectStudent = ProjectStudent::where('project_id', $project->id)->where('student_id', $id)->first();
            if(empty($projectStudent))
            {
                return response()->json("Nie ma takiej osoby", 400);
            }
            $projectStudent->accepted = 1;
            $projectStudent->save();
            return response()->json("OK", 200);
        }
        return response()->json("Unauthorized", 401);
    }
}