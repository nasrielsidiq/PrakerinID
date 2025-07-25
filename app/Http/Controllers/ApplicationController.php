<?php

namespace App\Http\Controllers;

use App\Models\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ApplicationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Application $application)
    {
        return response()->json([
            'data' => $application::get()
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if ($request->user()->tokenCant('application:create')) {
            return response()->json([
                'error' => "you can't access this route"
            ], 403);
        }
        $validator = Validator::make($request->all(), [
            'internship_id' =>  'required|numeric',
            'cv' => 'required|mimes:pdf,docx,doc,txt,rtf,tex|max:2082'
        ]);

        if ($validator->fails()) {
            return response()->json(["error" => $validator->errors()], 422);
        }

        $data = $request->only('internship_id');
        // return dd($request->user()->student);
        $data['student_id'] = $request->user()->student?->id;
        if (Application::where('internship_id', $data['internship_id'])->where('student_id', $data['student_id'])->exists()) {
            return response()->json([
                'error' => 'Kamu tidak bisa melamar dua kali'
            ], 403);
        }
        if ($request->file('cv')) {
            $data['cv'] = $request->file('cv')->getClientOriginalName();
            $request->file('cv')->storeAs('cv', $data['cv']);
        }
        Application::create($data);
        return response()->json(["data" => $data], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        if (!$data = Application::find($id)) {
            return response()->json(['error' => 'Application not found!'], 404);
        }
        return response()->json(["data" => $data], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'internship_id' =>  'required|numeric',
            'cv' => 'required|mimes:pdf,docx,doc,txt,rtf,tex|max:2082'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
