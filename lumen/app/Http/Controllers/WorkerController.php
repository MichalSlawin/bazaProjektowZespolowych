<?php
namespace App\Http\Controllers;


use App\AcademicYear;
use App\Worker;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class WorkerController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function getCurrent()
    {
        $academicYear = AcademicYear::orderBy('id', 'desc')->take(1)->first();
        $workers = Worker::whereHas('academicYear', function ($query) use ($academicYear) {
            $query->where('id', $academicYear->id);
        })->get();
        return response()->json($workers, 200);
    }

    public function updateCurrent(Request $request)
    {
        $user = Auth::user();
        if(!$user instanceof Worker)
        {
            return response()->json("Unauthorized", 401);
        }
        try
        {
            $this->validate($request, [
                'password' => 'required'
            ]);
        }
        catch (ValidationException $e)
        {
            return response()->json($e->response->original, $e->status);
        }
        $url = "https://inf.ug.edu.pl/plan/?grupa=3I&format=json";
        $schedule = json_decode(file_get_contents($url), true);
        $workers = [];
        $workersData = [];
        $ldap = new LdapController();
        foreach ($schedule as $class)
        {
            if($class["przedmiot"] == "Projekt zespołowy")
            {
                if(!in_array($class["nauczyciel"], $workers))
                {
                    $workers[] = $class["nauczyciel"];
                    $nameArray = explode(" ", $class["nauczyciel"]);
                    $filer = "(&(employeetype=pracownik)(givenname=".$nameArray[count($nameArray) - 2].")(sn=".$nameArray[count($nameArray) - 1]."))";
                    $ldapResponseSender = $ldap->findUser($user->username, $request->get('password'), $filer);
                    if($ldapResponseSender["code"] == 200)
                    {
                        $workersData[] = $ldapResponseSender["data"];
                    }
                    else
                    {
                        return response()->json($ldapResponseSender["msg"], $ldapResponseSender["code"]);
                    }
                }
            }
        }
        $academicYear = AcademicYear::orderBy('id', 'desc')->take(1)->first();
        $academicYear->workers()->detach();
        foreach ($workersData as $worker)
        {
            $workerObject = Worker::where('username', $worker["username"])->first();
            if(empty($workerObject))
            {
                $workerObject = new Worker();
                $workerObject->username = $worker["username"];
                $workerObject->link = $worker["link"];
            }
            $academicYear->workers()->save($workerObject);
        }

        return response()->json("List updated", 200);

    }
}