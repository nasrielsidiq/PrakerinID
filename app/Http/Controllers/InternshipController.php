<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\Internship;
use App\Models\Slug;
use Illuminate\Http\Request;

class InternshipController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $kota     = request()->query('kota');
        $provinsi = request()->query('provinsi');
        $grade    = request()->query('grade');
        $bidang   = request()->query('bidang');
        $durasi   = request()->query('durasi');
        $slug     = request()->query('slug');

        $internshipQuery = Internship::with('company', 'slugs');

        if ($slug) {

            if (str_contains($slug, ' ')) {
                $slugKeywords = explode(' ', $slug);
                $slugs = Slug::where(function ($query) use ($slugKeywords) {
                    foreach ($slugKeywords as $keyword) {
                        $query->orWhere('name', 'like', '%' . $keyword . '%');
                    }
                })->with('internships')->get();
            } else {
                $slugs = Slug::where('name', 'like', '%' . $slug . '%')->with('internships')->get();
            }

            // Ambil semua internship_id dari relasi internships di setiap slug
            $internshipIds = $slugs->flatMap(function ($slug) {
                return $slug->internships->pluck('id');
            })->unique()->values();

            // Contoh: filter query internship
            $internshipQuery->whereIn('id', $internshipIds);

            // dd($internshipIds); // Lihat hasilnya
        }

        // Filter berdasarkan company
        if ($kota || $provinsi) {
            $companyQuery = Company::query();
            if ($kota) {
                if (str_contains($kota, ',')) {
                    $companyQuery->whereIn('kota', explode(',', $kota));
                } else {
                    $companyQuery->where('kota', $kota);
                }
            }
            if ($provinsi) {
                if (str_contains($provinsi, ',')) {
                    $companyQuery->whereIn('provinsi', explode(',', $provinsi));
                } else {
                    $companyQuery->where('provinsi', $provinsi);
                }
            }
            $company = $companyQuery->get();
            // return response()->json(['data company' => $company], 200);
            // dd($company);
            $companyIds = $company->pluck('id');
            $internshipQuery->whereIn('company_id', $companyIds);
        }

        // Filter grade
        if ($grade) {
            if (str_contains($grade,',')) {
                // dd(explode(',', $grade));
                $internshipQuery->whereIn('grade', explode(',', $grade));
            } else {
                // dd($grade);
                $internshipQuery->where('grade', $grade);
            }
        }

        // Filter bidang
        if ($bidang && str_contains(',', $bidang)) {
            $internshipQuery->where('bidang', explode(',', $bidang));
        } else if ($bidang) {
            $internshipQuery->where('bidang', $bidang);
        }

        // Filter durasi
        if ($durasi) {
            if (str_contains($durasi, ',')) {
                // Pisahkan jadi array
                $durasiList = explode(',', $durasi); // ['3', '6', '8']

                $internshipQuery->where(function ($query) use ($durasiList) {
                    foreach ($durasiList as $d) {
                        $query->orWhereRaw('TIMESTAMPDIFF(MONTH, start_date, end_date) BETWEEN ? AND ?', [(int)$d - 1, (int)$d]);
                    }
                });
            } else {
                // Durasi tunggal
                $d = (int) $durasi;
                $internshipQuery->whereRaw('TIMESTAMPDIFF(MONTH, start_date, end_date) BETWEEN ? AND ?', [$d - 1, $d]);
            }
        }


        $data = $internshipQuery->limit(10)->get();

        return response()->json(["data" => $data]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    public function getSlug($slug)
    {
        return response()->json(['data' => Slug::where('name', 'like', '%' . $slug . '%')->with('internships')->get()]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Internship $internship)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Internship $internship)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Internship $internship)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Internship $internship)
    {
        //
    }
}
