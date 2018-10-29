<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

use Illuminate\Support\Facades\DB;

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->options(
    '/{any:.*}',
    [
        'middleware' => ['cors'],
        function (){
            return response(['status' => 'success']);
        }
    ]
);

$router->post('login', 'UserController@login');
$router->get('login', 'UserController@test');
$router->get('test', function () {
    ini_set("display_errors", 1);
    $query = DB::select("SELECT * FROM test");
    print_r($query);
    return 'erer';
});

$router->post('mail', 'UserController@mail');