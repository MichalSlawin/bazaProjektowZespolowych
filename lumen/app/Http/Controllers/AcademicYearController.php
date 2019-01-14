<?php

namespace App\Http\Controllers;


use App\AcademicYear;

class AcademicYearController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth', ['only' => ['getWithWorkers']]);
    }

    public function get()
    {
        $academicYears = AcademicYear::orderBy('id', 'desc')->get();

        return response()->json($academicYears, 200);
    }

    public function getWithWorkers()
    {
        $academicYears = AcademicYear::with(['workers'])->orderBy('id', 'desc')->get();

        return response()->json($academicYears, 200);
    }
}
