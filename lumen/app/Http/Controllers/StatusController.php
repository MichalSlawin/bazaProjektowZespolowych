<?php

namespace App\Http\Controllers;



use App\AcademicYear;
use App\Project;
use App\ProjectHistory;
use App\Status;
use App\Student;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class StatusController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth', ['except' => ['get']]);
    }

    public function get()
    {
        $statuses = Status::all();

        return response()->json($statuses, 200);
    }

    public function getProject($id)
    {
        $user = Auth::user();
        $academicYear = AcademicYear::orderBy('id', 'desc')->take(1)->first();
        if($user instanceof Student)
        {
            $project = Project::find($id);
            if(empty($project))
            {
                return response()->json("Nie mas takiego projektu", 404);
            }
            if($project->student_id == $user->id && $project->academic_year_id = $academicYear->id)
            {
                $options = [];
                switch ($project->status->id)
                {
                    case 1:
                    case 4:
                    case 6:
                        $options[] = ["id" => 2, "value" => "Prześlij do akceptacji"];
                        break;
                    case 3:
                        $options[] = ["id" => 5, "value" => "Poproś o możliwość edycji"];
                        break;
                }
                return response()->json($options, 200);
            }
            return response()->json("Nie masz uprawnień do projektu", 401);
        }
        else
        {
            $project = Project::find($id);
            if(empty($project))
            {
                return response()->json("Nie mas takiego projektu", 404);
            }
            if($project->worker_id == $user->id && $project->academic_year_id = $academicYear->id)
            {
                $options = [];
                switch ($project->status->id)
                {
                    case 2:
                        $options[] = ["id" => 3, "value" => "Akceptuję"];
                        $options[] = ["id" => 4, "value" => "Do poprawy"];
                        break;
                    case 5:
                        $options[] = ["id" => 6, "value" => "Pozwalam"];
                        $options[] = ["id" => 3, "value" => "Nie pozwalam"];
                        break;
                }
                return response()->json($options, 200);
            }
            return response()->json("Nie masz uprawnień do projektu", 401);
        }
    }

    public function updateProject(Request $request, $id)
    {
        try
        {
            $this->validate($request, [
                'status' => 'required|exists:status,id',
                'password' => 'required',
                'comment' => 'nullable'
            ]);
        }
        catch (ValidationException $e)
        {
            return response()->json($e->response->original, $e->status);
        }
        $user = Auth::user();
        $academicYear = AcademicYear::orderBy('id', 'desc')->take(1)->first();
        if($user instanceof Student)
        {
            $project = Project::find($id);
            if(empty($project))
            {
                return response()->json("Nie mas takiego projektu", 404);
            }
            if($project->student_id == $user->id && $project->academic_year_id = $academicYear->id)
            {
                $canChange = false;
                $body = "";
                $subject = "";
                $comment = $request->get('comment');
                switch ($request->get('status'))
                {
                    case 2:
                        if(in_array($project->status_id, [1, 4, 6]))
                        {
                            $canChange = true;
                            $subject = "Przesłano do akceptacji";
                            $body = "Projekt został przesłany do akceptacji";
                            if($comment != "")
                            {
                                $body .= "\nKomentarz: ".$comment;
                            }
                        }
                        break;
                    case 5:
                        if($project->status_id == 3)
                        {
                            $canChange = true;
                            $subject = "Wysłano prośbę o edycję";
                            $body = "Wysłano prośbę o edycję projektu";
                            if($comment != "")
                            {
                                $body .= "\nKomentarz: ".$comment;
                            }
                        }
                        break;
                }
                if($canChange)
                {
                    $messageController = new MessageController();
                    $sendMessage = $messageController->sendMessage($subject, $body, 0, $project->id, $request->get('password'));
                    if($sendMessage["code"] == 200)
                    {
                        try
                        {
                            $project->status_id = $request->get('status');
                            $project->save();
                            $projectHistory = new ProjectHistory();
                            $projectHistory->project_id = $project->id;
                            $projectHistory->body = $body;
                            $projectHistory->subject = $subject;
                            $projectHistory->save();
                        }
                        catch (QueryException $e)
                        {
                            return response()->json("Something went wrong", 500);
                        }
                        return response()->json("OK", 200);
                    }
                    else
                    {
                        return response()->json($sendMessage["msg"], $sendMessage["code"]);
                    }
                }
                return response()->json("Taka zmiana jest nie dozwolona", 400);
            }
            return response()->json("Nie masz uprawnień do projektu", 401);
        }
        else
        {
            $project = Project::find($id);
            if(empty($project))
            {
                return response()->json("Nie mas takiego projektu", 404);
            }
            if($project->worker_id == $user->id && $project->academic_year_id = $academicYear->id)
            {
                $canChange = false;
                $body = "";
                $subject = "";
                $comment = $request->get('comment');
                switch ($request->get('status'))
                {
                    case 3:
                        if(in_array($project->status_id, [2, 5]))
                        {
                            $canChange = true;
                            if($project->status_id == 2)
                            {
                                $subject = "Zaakceptowano";
                                $body = "Projekt został zaakceptowany";
                            }
                            else
                            {
                                $subject = "Odrzucono prośbę o edycję";
                                $body = "Odrzucono prośbę o edycję projektu";
                            }
                            if($comment != "")
                            {
                                $body .= "\nKomentarz: ".$comment;
                            }
                        }
                        break;
                    case 4:
                        if($project->status_id == 2)
                        {
                            $canChange = true;
                            $subject = "Przesłano do poprawy";
                            $body = "Projekt został przesłany do poprawy";
                            if($comment != "")
                            {
                                $body .= "\nKomentarz: ".$comment;
                            }
                        }
                        break;
                    case 6:
                        if($project->status_id == 5)
                        {
                            $canChange = true;
                            $subject = "Wyrażono zgodę na edycję";
                            $body = "Wyrażono zgodę na edycję projektu";
                            if($comment != "")
                            {
                                $body .= "\nKomentarz: ".$comment;
                            }
                        }
                        break;
                }
                if($canChange)
                {
                    $messageController = new MessageController();
                    $sendMessage = $messageController->sendMessage($subject, $body, 0, $project->id, $request->get('password'));
                    if($sendMessage["code"] == 200)
                    {
                        try
                        {
                            $project->status_id = $request->get('status');
                            $project->save();
                            $projectHistory = new ProjectHistory();
                            $projectHistory->project_id = $project->id;
                            $projectHistory->body = $body;
                            $projectHistory->subject = $subject;
                            $projectHistory->save();
                        }
                        catch (QueryException $e)
                        {
                            return response()->json("Something went wrong", 500);
                        }
                        return response()->json("OK", 200);
                    }
                    else
                    {
                        return response()->json($sendMessage["msg"], $sendMessage["code"]);
                    }
                }
                return response()->json("Taka zmiana jest nie dozwolona", 400);
            }
            return response()->json("Nie masz uprawnień do projektu", 401);
        }
    }
}