<?php

namespace App\Http\Controllers;


use App\Project;
use App\Student;
use App\Worker;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class MessageController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function send(Request $request)
    {
        try
        {
            $this->validate($request, [
                'password' => 'required',
                'subject' => 'required',
                'body' => 'required',
                'is_public' => 'required|boolean',
                'project_id' => 'required|exists:project,id'
            ]);
        }
        catch (ValidationException $e)
        {
            return response()->json($e->response->original, $e->status);
        }
        $user = Auth::user();
        $password = $request->get('password');
        $subject = $request->get('subject');
        $body = $request->get('body');
        $is_public = $request->get('is_public');
        $project_id = $request->get('project_id');
        $student_domain = "@sigma.ug.edu.pl";
        $worker_domain = "@sigma.ug.edu.pl";
//        $worker_domain = "@inf.ug.edu.pl";
        if($user instanceof Student)
        {
            $domain = $student_domain;
            $project = Project::where('student_id', $user->id)->fist();
        }
        else
        {
            $domain = $worker_domain;
            $project = Project::where('id', $project_id)->where('worker_id', $user->id)->first();
        }
        if(empty($project))
        {
            return response()->json("Unauthorized", 401);
        }

        if($user instanceof Student)
        {
            $receiver = Worker::find($project->worker_id);
            $to_email = $receiver->username.$worker_domain;
        }
        else
        {
            $receiver = Student::find($project->student_id);
            $to_email = $receiver->username.$student_domain;
        }

        $ldap = new LdapController();
        $ldapResponseSender = $ldap->getUserData($user->username, $password, $user->userame);
        if($ldapResponseSender["code"] == 200)
        {
            $senderData = $ldapResponseSender["data"];
            $senderDisplayName = $senderData["name"];
            $ldapResponseReceiver = $ldap->getUserData($user->username, $password, $receiver->userame);
            $receiverData = $ldapResponseReceiver["data"];
            $receiverDisplayName = $receiverData["name"];
        }
        else
        {
            return response()->json($ldapResponseSender["msg"], $ldapResponseSender["code"]);
        }

        $mail = new PHPMailer();
        try
        {
            $mail->SMTPDebug = 1;
            $mail->isSMTP();
            $mail->SMTPAuth = true;
            $mail->SMTPSecure = 'ssl';
            $mail->SMTPOptions = array(
                'ssl' => array(
                    'verify_peer' => false,
                    'verify_peer_name' => false,
                    'allow_self_signed' => true
                )
            );
//            $mail->Host = "inf.ug.edu.pl";
            $mail->Host = "153.19.7.228";
            $mail->Port = 465;
            $mail->IsHTML(true);
            $mail->Username = $user->username;
            $mail->Password = $password;
            $mail->SetFrom($user->username.$domain, $senderDisplayName);
            $mail->Subject = $subject;
            $mail->Body = $body;
            $mail->AddAddress($to_email, $receiverDisplayName);
            if($is_public)
            {
                //DW do studentów
            }
            $mail->send();
            return "Sended";
        }
        catch (Exception $e)
        {
            return $e;
        }
    }
}