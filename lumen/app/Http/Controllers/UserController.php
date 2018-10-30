<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('jsonApi');
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

        $user = $request->get('username');
        $password = $request->get('password');


        $ldap_host = "ldap://inf.ug.edu.pl";
        $domain = '@inf.ug.edu.pl';

        $ldapconn = ldap_connect($ldap_host);
        $ldapuser = $user.$domain;
        if ($ldapconn)
        {
            ldap_set_option($ldapconn, LDAP_OPT_PROTOCOL_VERSION, 3);
            ldap_set_option($ldapconn, LDAP_OPT_REFERRALS, 0);
            ldap_start_tls($ldapconn);
            try
            {
                ldap_bind($ldapconn, $ldapuser, $password);
                $sr = ldap_search($ldapconn, 'ou=People,dc=inf,dc=ug,dc=edu,dc=pl', "uid=" . $user);
                $info = ldap_get_entries($ldapconn, $sr);
                $data = $info[0];
                //TODO sprawdzić czy jest w bazie danych, jeżeli nie - dopisać i dać tokem, jeżeli jest - dać token
                if(isset($data["givenname"]))
                    $response["givename"] = $data["givenname"];
                if(isset($data["sn"]))
                    $response["sn"] = $data["sn"];
                if(isset($data["employeetype"]))
                    $response["employeetype"] = $data["employeetype"];
                if(isset($data["telephonenumber"]))
                    $response["telephonenumber"] = $data["telephonenumber"];
                if(isset($data["departmentnumber"]))
                    $response["departmentnumber"] = $data["departmentnumber"];
                if(isset($data["mail"]))
                    $response["mail"] = $data["mail"];
                if(isset($data["labeleduri"]))
                    $response["labeleduri"] = $data["labeleduri"];
                if(isset($data["title"]))
                    $response["title"] = $data["title"];
                return response()->json($response, 200);
            }
            catch (\ErrorException $e) {
                return response()->json("Bad credentials", 401);
            }
        }
        else
        {
            return response()->json("Something went wrong", 500);
        }
    }

    public function test()
    {
        return response()->json("Git", 200);
    }

    public function mail(Request $request)
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
        $user = $request->get('username');
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
            $mail->SetFrom($user."@sigma.ug.edu.pl", 'Sender Name');
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