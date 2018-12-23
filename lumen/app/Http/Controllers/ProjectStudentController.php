<?php

namespace App\Http\Controllers;


use App\AcademicYear;
use App\Project;
use App\ProjectStudent;
use App\Student;
use App\Worker;
use Illuminate\Support\Facades\Auth;

class ProjectStudentController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function add($id)
    {
        $user = Auth::user();
        if($user instanceof Student)
        {
            $academicYear = AcademicYear::orderBy('id', 'desc')->take(1)->first();
            $projectTest = Project::whereHas('students', function ($query) use ($user) {
                $query->where('student_id', $user->id);
                $query->where('accepted', 1);
            })->where('academic_year_id', $academicYear->id)->take(1)->first();
            if(!empty($projectTest))
            {
                return response()->json("Należysz już do projektu", 400);
            }
            $project = Project::with('students')->find($id);
            if(empty($project))
            {
                return response()->json("Nie ma takiego projektu", 404);
            }
            foreach ($project->students as $student)
            {
                if($student["id"] == $user->id)
                {
                    return response()->json("Zgłoszenie zostało już przyjęte", 400);
                }
            }
            $projectStudent = new ProjectStudent();
            $projectStudent->project_id = $project->id;
            $projectStudent->student_id = $user->id;
            $projectStudent->accepted = 0;
            $projectStudent->save();
            return response()->json("OK", 200);
        }
        return response()->json("Unauthorized", 401);
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

    public function deleteByWorker($projectId, $studentId)
    {
        $user = Auth::user();
        if($user instanceof Worker)
        {
            $academicYear = AcademicYear::orderBy('id', 'desc')->take(1)->first();
            $project = Project::with(['students'])
                ->where('id', $projectId)
                ->where('academic_year_id', $academicYear->id)
                ->orderBy('id', 'desc')
                ->take(1)
                ->first();
            if(empty($project))
            {
                return response()->json("Nie masz projektu", 404);
            }
            if($project->student_id == $studentId)
            {
                return response()->json("Nie można wykonać takiej operacji", 400);
            }
            $projectStudent = ProjectStudent::where('project_id', $project->id)->where('student_id', $studentId)->first();
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

    public function restore($projectId, $studentId)
    {
        $user = Auth::user();
        if($user instanceof Worker)
        {
            $academicYear = AcademicYear::orderBy('id', 'desc')->take(1)->first();
            $project = Project::with(['students'])
                ->where('id', $projectId)
                ->where('academic_year_id', $academicYear->id)
                ->orderBy('id', 'desc')
                ->take(1)
                ->first();
            if(empty($project))
            {
                return response()->json("Nie masz projektu", 404);
            }
            if($project->student_id == $studentId)
            {
                return response()->json("Nie można wykonać takiej operacji", 400);
            }
            $projectStudent = ProjectStudent::where('project_id', $project->id)->where('student_id', $studentId)->first();
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