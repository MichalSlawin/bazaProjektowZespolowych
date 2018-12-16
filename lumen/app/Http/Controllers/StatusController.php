<?php

namespace App\Http\Controllers;



use App\Status;

class StatusController extends Controller
{
    public function get()
    {
        $statuses = Status::all();

        return response()->json($statuses, 200);
    }
}