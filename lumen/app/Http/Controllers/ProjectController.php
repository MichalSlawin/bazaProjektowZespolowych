<?php

namespace App\Http\Controllers;



use App\AcademicYear;
use App\Message;
use App\ProgramingLanguage;
use App\Project;
use App\ProjectHistory;
use App\ProjectStudent;
use App\Student;
use App\Worker;
use http\Env\Response;
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

    public function get(Request $request)
    {
        if($request->input("rok"))
        {
            $year = $request->input("rok");
        }
        else
        {
            $academicYear = AcademicYear::orderBy('id', 'desc')->take(1)->first();
            $year = $academicYear->id;
        }

        $user = Auth::user();
        $columns = ["nazwa", "mentoring" , "opiekun", "technologie"];

        if($user instanceof Student || $user instanceof Worker)
        {
            //Wszystkie projekty
            $projects = Project::with(['languages', 'students', 'worker', 'academic_year'])->where('academic_year_id', $year)->get(["name as nazwa", "project.description", "project.id", "project.worker_id", "mentoring as mentoring", "project.academic_year_id", "project.company_name"]);
            foreach ($projects as $project)
            {
                $this->acceptedStudents($project->students);
                $languageArray = [];
                foreach ($project->languages as $language)
                {
                    $languageArray[] = $language->name;
                }
                $project->technologie = $languageArray;

                $project->opiekun = $project->worker->username;

                $project->rok = $project->academic_year->name;
            }
        }
        else
        {
            //Tylko aktywne
            $projects = Project::with(['languages', 'students', 'worker', 'academic_year'])->where('academic_year_id', $year)->where('status_id', 3)->get(["name as nazwa", "project.description", "project.id", "project.worker_id", "mentoring as mentoring", "project.academic_year_id", "project.company_name"]);
            foreach ($projects as $project)
            {
                $this->acceptedStudents($project->students);
                $languageArray = [];
                foreach ($project->languages as $language)
                {
                    $languageArray[] = $language->name;
                }
                $project->technologie = $languageArray;

                $project->opiekun = $project->worker->username;

                $project->rok = $project->academic_year->name;

                $project->students->makeHidden(['username', 'index_no', 'id']);
            }
        }
        return response()->json(["data" => $projects, "columns" => $columns],200);

    }

    public function getWorker() {
        $academicYear = AcademicYear::orderBy('id', 'desc')->take(1)->first();
        $year = $academicYear->id;

        $user = Auth::user();
        $columns = ["nazwa", "mentoring", "status", "technologie"];

        if($user instanceof Worker)
        {
            $projects = Project::whereHas('worker', function ($query) use ($user) {
                $query->where('worker_id', $user->id);
            })->with(['languages', 'students', 'status'])->where('academic_year_id', $year)->
            get(["name as nazwa", "project.description", "project.id", "mentoring as mentoring", "project.company_name", "project.status_id"]);
            foreach ($projects as $project)
            {
                $this->acceptedStudents($project->students);
                $languageArray = [];
                foreach ($project->languages as $language)
                {
                    $languageArray[] = $language->name;
                }
                $project->technologie = $languageArray;
            }
            return response()->json(["data" => $projects, "columns" => $columns],200);
         }
         return response()->json("Unauthorized", 401);
    }

    public function getMine()
    {
        $user = Auth::user();
        if($user instanceof Student)
        {
            $project = Project::whereHas('students', function ($query) use ($user) {
                $query->where('student_id', $user->id);
                $query->where('accepted', 1);
            })->with(['students', 'history', 'worker', 'languages', 'academic_year', 'status'])->orderBy('id', 'desc')->take(1)->first();
            if(empty($project))
            {
                return response()->json("Nie masz projektu", 404);
            }
            if($project->student_id == $user->id)
            {
                $project->is_owner = true;
                $project->messages = Message::where('project_id', $project->id)->orderBy('created_at', 'desc')->get();
            }
            else
            {
                $project->is_owner = false;
                $project->messages = Message::where('project_id', $project->id)->where('is_public', 1)->orderBy('created_at', 'desc')->get();
                $this->acceptedStudents($project->students);
            }
            return response()->json($project, 200);
        }
        return response()->json("Unauthorized", 401);
    }

    public function getById($id)
    {
        $user = Auth::user();
        $project = Project::with(['students', 'messages', 'history', 'worker', 'languages', 'status', 'academic_year'])->find($id);
        if(empty($project))
        {
            return response()->json("Nie ma takiego projektu", 404);
        }
        if($user instanceof Worker)
        {
            if($project->worker_id != $user->id)
            {
                $project->is_worker = false;
                $project->makeHidden(['messages', 'history']);
            }
            else
            {
                $project->is_worker = true;
            }
            $project->is_owner = false;
        }
        else
        {
            $projectCheck = DB::select("SELECT COUNT(ps.id) as 'CID' FROM project p
                                        JOIN project_student ps ON ps.project_id = p.id
                                        WHERE ps.student_id = ? AND p.id = ? and ps.accepted = ?", [$user->id, $id, 1]);
            if($projectCheck[0]->CID != 1)
            {
                $project->makeHidden(['messages', 'history']);
            }
            if($project->student_id == $user->id)
            {
                $project->is_owner = true;
            }
            else
            {
                $project->is_owner = false;
                $this->acceptedStudents($project->students);
            }
        }
        return response()->json($project, 200);
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
                    $projectHistory->subject = "Utworzono projekt";
                    $projectHistory->body = "Projekt został utworzony";
                    $projectHistory->project_id = $project->id;
                    $projectHistory->save();
                }
                catch (QueryException $e) {
                    return response()->json("Something went wrong", 500);
                }
                return response()->json("Success", 200);
            }
            return response()->json("Należysz już do projektu", 400);
        }
        return response()->json("Unauthorized", 401);
    }

    public function edit(Request $request)
    {
        $user = Auth::user();
        if(!$user instanceof Student)
        {
            return response()->json("Unauthorized", 401);
        }
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
        $project = Project::whereHas('academic_year', function ($query) use ($academicYear) {
            $query->where('id', $academicYear->id);
        })->where('student_id', $user->id)->first();
        if(empty($project))
        {
            return response()->json("Nie masz projektu", 400);
        }
        try
        {
            $history = "Zmiany:\n";
            $name = $request->get("name");
            if($project->name != $name)
            {
                $history .= "- Nazwa z \"$project->name\" na \"$name\"\n";
                $project->name = $name;
            }
            $description = $request->get("description");
            if($project->description != $description)
            {
                $history .= "- Opis z \"$project->description\" na \"$description\"\n";
                $project->description = $description;
            }
            $workerId = $request->get("worker");
            if($project->worker_id != $workerId)
            {
                $projectWorkerObject = Worker::find($project->worker_id);
                $projectWorkerName = $projectWorkerObject->username;
                $workerObject = Worker::find($workerId);
                $workerName = $workerObject->username;
                $history .= "- Opiekun z \"$projectWorkerName\" na \"$workerName\"\n";
                $project->worker_id = $workerId;
            }
            $link = $request->get("link");
            if($project->link != $link)
            {
                $history .= "- Link z \"$project->link\" na \"$link\"\n";
                $project->link = $link;
            }
            $mentoring = $request->get("mentoring");
            if($project->mentoring != $mentoring)
            {
                $projectMentoringString = "";
                $mentoringString = "";
                if($project->mentoring == 1)
                {
                    $projectMentoringString = "Zainteresowanie";
                    $mentoringString = "Brak zainteresowania";
                }
                if($project->mentoring == 0)
                {
                    $projectMentoringString = "Brak zainteresowania";
                    $mentoringString = "Zainteresowanie";
                }
                $history .= "- Mentoring z \"$projectMentoringString\" na \"$mentoringString\"\n";
                $project->mentoring = $mentoring;
            }
            $project->save();
            $languages = $request->get('languages');
            $projectLanguages = $project->languages()->get();
            $projectLanguagesArray = array();
            foreach($projectLanguages as $projectLanguage)
            {
                $projectLanguagesArray[] = $projectLanguage->name;
            }
            if($projectLanguagesArray != $languages)
            {
                $projectLanguagesArrayString = implode(",", $projectLanguagesArray);
                $languagesString = implode(",", $languages);
                $history .= "- Technologie z \"$projectLanguagesArrayString\" na \"$languagesString\"\n";
                DB::delete("DELETE FROM project_language WHERE project_id = ?", [$project->id]);
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
            }
            $projectHistory = new ProjectHistory();
            $projectHistory->subject = "Edytowano projekt";
            if($history == "Zmiany:\n")
            {
                $projectHistory->body = "Brak zmian.";
            }
            else
            {
                $projectHistory->body = "$history";
            }
            $projectHistory->project_id = $project->id;
            $projectHistory->save();
        }
        catch (QueryException $e) {
            return response()->json("Something went wrong", 500);
        }

        return response()->json("Success", 200);
    }

    public function requestEdition()
    {
        $user = Auth::user();
        if(!$user instanceof Student) {
            return response()->json("Unauthorized", 401);
        }
        $academicYear = AcademicYear::orderBy('id', 'desc')->take(1)->first();
        $project = Project::whereHas('academic_year', function ($query) use ($academicYear) {
            $query->where('id', $academicYear->id);
        })->where('student_id', $user->id)->first();
        if(empty($project))
        {
            return response()->json("Nie masz projektu", 400);
        }
        try
        {
            $project->status_id = 5;
            $project->save();
        }
        catch (QueryException $e) {
            return response()->json("Something went wrong", 500);
        }
        return response()->json("Success");
    }

    public function delete()
    {
        $user = Auth::user();
        if(!$user instanceof Student) {
            return response()->json("Unauthorized", 401);
        }
        $academicYear = AcademicYear::orderBy('id', 'desc')->take(1)->first();
        $project = Project::whereHas('academic_year', function ($query) use ($academicYear) {
            $query->where('id', $academicYear->id);
        })->where('student_id', $user->id)->first();
        if(empty($project))
        {
            return response()->json("Nie masz projektu", 400);
        }
        if($project->status_id == 1)
        {
            $project->languages()->detach();
            $project->students()->detach();
            $project->history()->delete();
            $project->messages()->delete();
            $project->delete();
            return response()->json("Deleted", 200);
        }
        return response()->json("Nie można usunąć tego projektu", 400);
    }



    private function acceptedStudents($students)
    {
        $lastKey = 0;
        $length = count($students);
        for($i = 0; $i < count($students); $i++)
        {
            if($students[$i]->pivot->accepted == 1)
            {
                $students[$lastKey] = $students[$i];
                $lastKey++;
            }
            else
            {
                $length--;
            }
        }
        if(($lastKey + 1) != $length)
        {
            $length = count($students);
            for($i = $lastKey; $i < $length; $i++)
            {
                unset($students[$i]);
            }
        }
    }
}