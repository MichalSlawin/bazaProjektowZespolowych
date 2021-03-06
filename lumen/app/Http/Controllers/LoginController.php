<?php

namespace App\Http\Controllers;


use App\Student;
use App\Worker;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{

    public function token()
    {
        $user = Auth::user();
        if(empty($user))
        {
            return response()->json("Unauthorized", 401);
        }
        return response()->json("OK", 200);
    }

    public function login(Request $request)
    {
        try
        {
            $this->validate($request, [
                'password' => 'required',
                'username' => 'required'
            ]);
        }
        catch (ValidationException $e)
        {
            return response()->json($e->response->original, $e->status);
        }

        $username = trim($request->get('username'));
        $password = trim($request->get('password'));

        $ldap = new LdapController();
        $ldapResponse = $ldap->checkLogin($username, $password);
        if($ldapResponse["code"] == 200)
        {
            $userData = $ldapResponse["data"];
            if($userData["type"] == "student")
            {
                $student = Student::where('username', $username)->first();
                if(empty($student))
                {
                    try
                    {
                        $student = new Student();
                        $student->index_no = $userData["index_no"];
                        $student->username = $username;
                        $student->field = $userData["field"];
                        $student->save();
                    }
                    catch (QueryException $e)
                    {
                        return response()->json("Something went wrong", 500);
                    }
                }
                $student->token = base64_encode(str_random(40));
                $student->save();
                return response()->json(["token" => $student->token, "role" => "student"], 200);
            }
            else
            {
                $worker = Worker::where('username', $username)->first();
                if(empty($worker))
                {
                    try
                    {
                        $fullName = explode(" ", $userData["name"]);
                        $worker = new Worker();
                        $worker->first_name = $fullName[0];
                        $worker->last_name = $fullName[1];
                        $worker->username = $username;
                        $worker->link = $userData["link"];
                        $worker->save();
                    }
                    catch (QueryException $e)
                    {
                        return response()->json("Something went wrong", 500);
                    }
                }
                $worker->token = base64_encode(str_random(40));
                $worker->save();
                return response()->json(["token" => $worker->token, "role" => "worker"], 200);
            }
        }
        else
        {
            return response()->json($ldapResponse["msg"], $ldapResponse["code"]);
        }
    }

}
