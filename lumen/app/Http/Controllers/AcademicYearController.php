<?php

namespace App\Http\Controllers;


use App\AcademicYear;

class AcademicYearController extends Controller
{
    public function get()
    {
        $academicYears = AcademicYear::orderBy('id', 'desc')->get();

        return response()->json($academicYears, 200);
    }
}