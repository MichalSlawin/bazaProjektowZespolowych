<?php

namespace App\Http\Controllers;


use App\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

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
        if($user instanceof Student)
        {
            $domain = "@sigma.ug.edu.pl";
        }
        else
        {
            $domain = "@inf.ug.edu.pl";
        }
//        $user = $request->get('username');
        $user = "atrawinski";
        $pass = $request->get('password');
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
            $mail->Username = $user;
            $mail->Password = $pass;
            $mail->SetFrom($user.$domain, 'Sender Name');
            $mail->Subject = "Test Subject";
            $mail->Body    = "Test";
            $mail->AddAddress("atrawinski@sigma.ug.edu.pl");
            $mail->send();
            return "Sended";
        }
        catch (Exception $e)
        {
            return $e;
        }
    }
}