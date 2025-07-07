<?php

namespace App\Http\Controllers;

use App\Models\School;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SchoolController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(School $school)
    {
        return response()->json(["data" => $school::with('user')->get()]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, School $school)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'phone_number' => 'required|numeric',
            'address' => 'required|string',
            // 'user_id' => 'required|max:20',
            'is_verified' => 'boolean',
            'logo' => 'image'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $data = $request->only('name', 'date_of_birth', 'gender', 'phone_number', 'address', 'school_id', 'user_id');

        try {
            //code...
            $result = $school::factory()->create($data);
        } catch (\Throwable $th) {
            return response()->json(["error" => $th], 500);
        }

        return response()->json(['data' => $result], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id,)
    {
        if (School::with('user')->find($id) == null) {
            return response()->json(["error" => "School not found"], 404);
        }
        return response()->json([
            "data" => School::with('user')->find($id)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        if (!$school = School::find($id)) {
            return response()->json(["error" => "School not found"], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'phone_number' => 'required|numeric',
            'address' => 'required|string',
            // 'user_id' => 'required|max:20',
            'is_verified' => 'boolean',
            'logo' => 'image'
        ]);


        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $data = $request->only('name', 'date_of_birth', 'gender', 'phone_number', 'address', 'school_id');
        try {
            $school->update($data);
        } catch (\Throwable $th) {
            return response()->json(["error" => $th], 500);
        }

        return response()->json(null, 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        if (!$school = School::with('user')->find($id)) {
            return response()->json(["error" => "School not found"], 404);
        }

        try {
            $school->delete();
            return response()->json(null, 201);
        } catch (\Throwable $th) {
            return response()->json(["error" => $th], 500);
        }
    }
}
