<?php

namespace App\Http\Controllers;


use App\Message;
use App\Project;
use App\ProjectStudent;
use App\Student;
use App\Worker;
use Illuminate\Database\QueryException;
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

    public function sendMessage($subject, $body, $is_public, $project_id, $password, $saveMessage = false)
    {
        $user = Auth::user();
        $student_domain = "@sigma.ug.edu.pl";
        $worker_domain = "@inf.ug.edu.pl";
        if($user instanceof Student)
        {
            $from_role = "Student";
            $domain = $student_domain;
            $project = Project::where('student_id', $user->id)->first();
        }
        else
        {
            $from_role = 'Pracownik';
            $domain = $worker_domain;
            $project = Project::where('id', $project_id)->where('worker_id', $user->id)->first();
        }
        if(empty($project))
        {
            return ["msg" => "Unauthorized", "code" => 401];
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
        $ldapResponseSender = $ldap->getUserData($user->username, $password, $user->username);
        if($ldapResponseSender["code"] == 200)
        {
            $senderData = $ldapResponseSender["data"];
            $senderDisplayName = $senderData["name"];
            $ldapResponseReceiver = $ldap->getUserData($user->username, $password, $receiver->username);
            $receiverData = $ldapResponseReceiver["data"];
            $receiverDisplayName = $receiverData["name"];
        }
        else
        {
            return $ldapResponseSender;
        }

        if($saveMessage)
        {
            try
            {
                $message = new Message();
                $message->subject = $subject;
                $message->body = $body;
                $message->is_public = $is_public;
                $message->project_id = $project_id;
                $message->from_role = $from_role;
            $message->save();
            }
            catch (QueryException $e)
            {
                return ["msg" => "Something went wrong", "code" => 500];
            }
        }

        $mail = new PHPMailer();
        try
        {
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
            $mail->CharSet = 'UTF-8';
            $mail->Encoding = 'base64';
            $mail->IsHTML(true);
            $mail->Username = $user->username;
            $mail->Password = $password;
            $mail->SetFrom($user->username.$domain, $senderDisplayName);
            $subject = "(Projekty zespołowe) $subject";
            $mail->Subject = $subject;
            $body .= "<br>Dotyczy projektu: <a href='http://".env("APP_URL")."/projekt/".$project_id."'>".env("APP_URL")."/projekt/".$project_id."</a>";
            $mail->Body = $body;
            $mail->AddAddress($to_email, $receiverDisplayName);
            if($is_public == 1)
            {
                $students = ProjectStudent::with(['student'])->where('project_id', $project_id)->get();
                foreach ($students as $student)
                {
                    if($student->student->username != $user->username)
                    {
                        $mail->addCC($student->student->username.$student_domain);
                    }
                }
            }
            $mail->send();
            return ["msg" => "Sended", "code" => 200];
        }
        catch (Exception $e)
        {
            return ["msg" => "Something went wrong", "code" => 500];
        }
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
        $password = $request->get('password');
        $subject = $request->get('subject');
        $body = $request->get('body');
        $is_public = $request->get('is_public');
        $project_id = $request->get('project_id');
        $sendMail = $this->sendMessage($subject, $body, $is_public, $project_id, $password, true);
        return response()->json($sendMail["msg"], $sendMail["code"]);
    }
}
