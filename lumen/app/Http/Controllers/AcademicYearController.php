<?php

namespace App\Http\Controllers;


use App\AcademicYear;
use App\Worker;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Auth;

class AcademicYearController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth', ['except' => ['get']]);
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

    public function add()
    {
        $user = Auth::user();
        if (!$user instanceof Worker)
        {
            return response()->json("Unauthorized", 401);
        }
        $year = date('Y');
        $nextYearArray = str_split($year + 1);
        $yearName = $year.'/'.$nextYearArray[2].$nextYearArray[3];
        $nameCheck = AcademicYear::where('name', $yearName)->first();
        if (!empty($nameCheck))
        {
            return response()->json('Ten rok już istnieje', 400);
        }
        $month = date('m');
        if ($month < 9)
        {
            return response()->json('Nowy rok można dodać dopiero we wrześniu', 400);
        }
        try
        {
            $academinYear = new AcademicYear();
            $academinYear->name = $yearName;
            $academinYear->save();
            return response()->json('OK', 200);
        }
        catch (QueryException $e)
        {
            return response()->json("Something went wrong", 500);
        }
    }
}
