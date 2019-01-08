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
$router->get('project/worker', 'ProjectController@getWorker');

$router->post('project', 'ProjectController@add');

$router->put('project', 'ProjectController@edit');
$router->put('project/requestEdition', 'ProjectController@requestEdition');

$router->put('project/feature', 'ProjectController@feature');
$router->put('project/cancelFeature', 'ProjectController@cancelFeature');

$router->delete('project', 'ProjectController@delete');

//WorkerController
$router->get('worker/current', 'WorkerController@getCurrent');

$router->post('worker/current', 'WorkerController@updateCurrent');

//ProgramingLanguageController
$router->get('programing-language', 'ProgramingLanguageController@get');

//AcademicYearController
$router->get('academic-year', 'AcademicYearController@get');

//StatusController
$router->get('status', 'StatusController@get');
$router->get('project/{id:[0-9]+}/status', 'StatusController@getProject');

$router->post('project/{id:[0-9]+}/status', 'StatusController@updateProject');

//ProjectStudentController
$router->post('project/{id:[0-9]+}/students', 'ProjectStudentController@add');

$router->put('project/mine/students/{id:[0-9]+}', 'ProjectStudentController@accept');

$router->put('project/{projectId:[0-9]+}/students/{studentId:[0-9]+}', 'ProjectStudentController@restore');

$router->delete('project/mine/students/{id:[0-9]+}', 'ProjectStudentController@delete');

$router->delete('project/mine/students/signout', 'ProjectStudentController@selfDelete');

$router->delete('project/{projectId:[0-9]+}/students/{studentId:[0-9]+}', 'ProjectStudentController@deleteByWorker');

