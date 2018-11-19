<?php

namespace App\Http\Controllers;



use App\AcademicYear;
use App\ProgramingLanguage;
use App\Project;
use App\ProjectHistory;
use App\ProjectStudent;
use App\Student;
use App\Worker;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class ProjectController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth', ['except' => ['get']]);
    }

    public function get()
    {
        $user = Auth::user();
        if($user instanceof Student || $user instanceof Worker)
        {
            //Wszystkie projekty
            $projects = Project::with(['languages', 'status', 'students'])->get();
            return response()->json($projects, 200);
        }
        else
        {
            //Tylko aktywne
            $projects = Project::with(['languages', 'status', 'students'])->where('status_id', 3)->get();
            foreach ($projects as $project)
            {
                $project->students->makeHidden(['username', 'index_no', 'id', 'created_at', 'updated_at']);
            }
            return response()->json($projects, 200);
        }
    }

    public function getMine()
    {
        $user = Auth::user();
        if($user instanceof Student)
        {
            $project = Project::whereHas('students', function ($query) use ($user) {
                $query->where('student_id', $user->id);
                $query->where('accepted', 1);
            })->with(['students', 'messages', 'history', 'worker'])->orderBy('id', 'desc')->take(1)->first();
            if(empty($project))
            {
                return response()->json("Nie masz projektu", 400);
            }
            return response()->json($project, 200);
        }
        return response()->json("Unauthorized", 401);
    }

    public function add(Request $request)
    {
        $user = Auth::user();
        if($user instanceof Student)
        {
            try
            {
                $this->validate($request, [
                    'name' => 'required',
                    'description' => 'required',
                    'link' => 'required',
                    'mentoring' => 'required|boolean',
                    'worker' => 'required|exists:worker,id',
                    'languages' => 'required|array'
                ]);
            }
            catch (ValidationException $e)
            {
                return response()->json($e->response->original, $e->status);
            }
            $academicYear = AcademicYear::orderBy('id', 'desc')->take(1)->first();
            $workerCheck = Worker::whereHas('academicYear', function ($query) use ($academicYear) {
                $query->where('id', $academicYear->id);
            })->take(1)->first();
            if(empty($workerCheck))
            {
                return response()->json("Wrong worker", 400);
            }

            $projectCheck = DB::select("SELECT COUNT(ps.student_id) as 'CID' FROM project p
                                        JOIN project_student ps ON ps.project_id = p.id
                                        WHERE ps.accepted = ? AND ps.student_id = ? AND p.academic_year_id = ?", [1, $user->id, $academicYear->id]);
            if($projectCheck[0]->CID == 0)
            {
                $projectStudentIds = DB::select("SELECT ps.id FROM project p JOIN project_student ps ON p.id = ps.project_id
                            WHERE ps.student_id = ? AND p.academic_year_id = ?", [$user->id, $academicYear->id]);
                if(count($projectStudentIds) > 0)
                {
                    $ids = [];
                    foreach ($projectStudentIds as $projectStudentId)
                    {
                        $ids[] =  $projectStudentId->id;
                    }
                    ProjectStudent::whereIn('id', $ids)->delete();
                }
                try
                {
                    $project = new Project();
                    $project->name = $request->get("name");
                    $project->description = $request->get("description");
                    $project->status_id = 1;
                    $project->worker_id = $request->get("worker");
                    $project->student_id = $user->id;
                    $project->link = $request->get("link");
                    $project->mentoring = $request->get("mentoring");
                    $project->academic_year_id = $academicYear->id;
                    $project->save();
                    $projectStudent = new ProjectStudent();
                    $projectStudent->project_id = $project->id;
                    $projectStudent->student_id = $user->id;
                    $projectStudent->accepted = 1;
                    $projectStudent->save();
                    $languages = $request->get('languages');
                    foreach ($languages as $language)
                    {
                        $languageObject = ProgramingLanguage::whereRaw( 'LOWER(`name`) like ?', [$language])->take(1)->first();
                        if(empty($languageObject))
                        {
                            $languageObject = new ProgramingLanguage();
                            $languageObject->name = $language;
                        }
                        $project->languages()->save($languageObject);
                    }
                    $projectHistory = new ProjectHistory();
                    $projectHistory->body = "Projekt został utworzony";
                    $projectHistory->project_id = $project->id;
                    $projectHistory->save();
                }
                catch (QueryException $e) {
                    return response()->json("Something went wrong", 500);
                }
                return response()->json("Success", 200);
            }
            return response()->json("You already belong to project", 401);
        }
        return response()->json("Unauthorized", 401);
    }
}