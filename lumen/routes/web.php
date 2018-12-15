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

//LoginController
$router->get('token', 'LoginController@token');
$router->post('login', 'LoginController@login');

//MessageController
$router->post('mail', 'MessageController@send');

//ProjectController
$router->get('project', 'ProjectController@get');
$router->get('project/mine', 'ProjectController@getMine');
$router->get('project/{id:[0-9]+}', 'ProjectController@getById');

$router->post('project', 'ProjectController@add');

$router->delete('project', 'ProjectController@delete');

//WorkerController
$router->get('worker/current', 'WorkerController@getCurrent');

$router->post('worker/current', 'WorkerController@updateCurrent');

//ProgramingLanguageController
$router->get('programing-language', 'ProgramingLanguageController@get');

//AcademicYearController
$router->get('academic-year', 'AcademicYearController@get');


//ProjectStudentController
$router->post('project/{id:[0-9]+}/students', 'ProjectStudentController@add');

$router->put('project/mine/students/{id:[0-9]+}', 'ProjectStudentController@accept');

$router->delete('project/mine/students/{id:[0-9]+}', 'ProjectStudentController@delete');

