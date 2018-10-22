<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    public function __construct()
    {

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
            $ldapbind = ldap_bind($ldapconn, $ldapuser, $password);
            if ($ldapbind)
            {
                $sr = ldap_search($ldapconn, 'ou=People,dc=inf,dc=ug,dc=edu,dc=pl', "uid=" . $user);
                $info = ldap_get_entries($ldapconn, $sr);
                $data = $info[0];
                return response()->json($data, 200);
            }
            else
            {
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
}