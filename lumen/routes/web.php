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

$router->post('login', 'LoginController@login');

$router->post('mail', 'MessageController@send');

$router->get('project', 'ProjectController@get');
$router->get('project/mine', 'ProjectController@getMine');
$router->get('project/{id:[0-9]+}', 'ProjectController@getById');

$router->post('project', 'ProjectController@add');

$router->delete('project', 'ProjectController@delete');

$router->get('worker/current', 'WorkerController@getCurrent');

$router->post('worker/current', 'WorkerController@updateCurrent');

$router->get('programing-language', 'ProgramingLanguageController@get');

$router->get('academic-year', 'AcademicYearController@get');