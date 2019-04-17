<?php

namespace App\Http\Controllers;


class LdapController extends Controller
{
    private $ldap_host = "ldap://inf.ug.edu.pl";
    private $domain = "@inf.ug.edu.pl";

    public function checkLogin($username, $password)
    {
        $ldapconn = $this->connect($username, $password);
        if(is_array($ldapconn))
        {
            return $ldapconn;
        }
        else
        {
            $sr = ldap_search($ldapconn, 'ou=People,dc=inf,dc=ug,dc=edu,dc=pl', "uid=" . $username);
            $info = ldap_get_entries($ldapconn, $sr);
            $data = $info[0];
            if($data["employeetype"][0] == "student")
            {
                $response["index_no"] = $data["telephonenumber"][0];
                $response["field"] = $data["departmentnumber"][0];
            }
            else if($data["employeetype"][0] == "pracownik")
            {
                $response["link"] = $data["labeleduri"][0];
            }
            else
            {
                return ["msg" => "Unsupported type", "code" => 401];
            }
            $response["name"] = $data["displayname"][0];
            $response["type"] = $data["employeetype"][0];
            return ["data" => $response, "code" => 200];
        }
    }

    public function getUserData($username, $password, $search)
    {
        $ldapconn = $this->connect($username, $password);
        if(is_array($ldapconn))
        {
            return $ldapconn;
        }
        else
        {
            $sr = ldap_search($ldapconn, 'ou=People,dc=inf,dc=ug,dc=edu,dc=pl', "uid=" . $search);
            $info = ldap_get_entries($ldapconn, $sr);
            $data = $info[0];
            $response["name"] = $data["displayname"][0];
            $response["type"] = $data["employeetype"][0];
            return ["data" => $response, "code" => 200];
        }
    }

    public function findUser($username, $password, $filter)
    {
        $ldapconn = $this->connect($username, $password);
        if(is_array($ldapconn))
        {
            return $ldapconn;
        }
        else
        {
            $sr = ldap_search($ldapconn, 'ou=People,dc=inf,dc=ug,dc=edu,dc=pl', $filter);
            $info = ldap_get_entries($ldapconn, $sr);
            $data = $info[0];
            $response["name"] = $data["displayname"][0];
            $response["type"] = $data["employeetype"][0];
            $response["link"] = $data["labeleduri"][0];
            $response["username"] = $data["uid"][0];
            return ["data" => $response, "code" => 200];
        }
    }

    private function connect($username, $password)
    {
        $ldapconn = ldap_connect($this->ldap_host);
        $ldapuser = $username.$this->domain;
        if($ldapconn)
        {
            ldap_set_option($ldapconn, LDAP_OPT_PROTOCOL_VERSION, 3);
            ldap_set_option($ldapconn, LDAP_OPT_REFERRALS, 0);
            ldap_start_tls($ldapconn);
            try
            {
                ldap_bind($ldapconn, $ldapuser, $password);
                return $ldapconn;
            }
            catch (\ErrorException $e)
            {
                return ["msg" => "Bad credentials", "code" => 401];
            }
        }
        else
        {
            return ["msg" => "Something went wrong", "code" => 500];
        }
    }
}
