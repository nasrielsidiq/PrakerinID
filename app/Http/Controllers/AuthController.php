<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\School;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

use function Laravel\Prompts\error;

class AuthController extends Controller
{
    public function unauthorized()
    {
        return response()->json(['error' => 'Unauthorized'], 401);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        if (Auth::attempt($request->only('email', 'password'))) {
            $token = Auth::user()->createToken('Auth Token')->plainTextToken;

            return response()->json(['token' => $token], 200);
        }

        return response()->json(['error' => 'unauthorized'], 401);
    }

    public function register(Request $request, User $user)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|confirmed',
            'role' => 'required|in:student,school,industry,super_admin',
        ]);

        $userData = $request->only('email', 'password', 'role');
        $model = null;
        $data = [];

        if ($request->role == 'student') {
            $data = $request->only('name', 'date_of_birth', 'gender', 'phone_number', 'address', 'school_id', 'user_id');
            $model = Student::class;
            $validator->addRules([
                'name' => 'required|string|max:255',
                'date_of_birth' =>  'required|date',
                'phone_number' => 'required|numeric',
                'address' => 'required|string',
                'school_id' => 'required|max:20',
                // 'user_id' => 'required|max:20',
                'gender' => 'required|in:female,male'
            ]);
        } else if ($request->role == 'school' || $request->role == 'industry') {
            $request->role == 'school' ? $model = School::class : $model = Company::class;
            $request->role == 'school' ? $data = $request->only('name', 'address', 'phone_number', 'is_verified', 'user_id', 'logo')
                : $data = $request->only('name', 'address', 'phone_number', 'is_verified', 'user_id', 'logo', 'sector');
            $validator->addRules([
                'name' => 'required|string|max:255',
                'phone_number' => 'required|numeric',
                'address' => 'required|string',
                // 'user_id' => 'required|max:20',
                'is_verified' => 'boolean',
                'logo' => 'image'
            ]);

            $request->role == 'industry' ? $validator->addRules([
                'sector' => 'required'
            ]) :  null;
        }

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            $userCreate = $user::create($userData);
            $data['user_id'] = $userCreate->id;
            $model::create($data);
            if (Auth::attempt($request->only('email', 'password'))) {
                $token = Auth::user()->createToken('Auth Token')->plainTextToken;
                return response()->json(['token' => $token, ], 200);
            }
        } catch (\Throwable $th) {
            return response()->json(['error' => 'failed to Register', 'message' => $th], 422);
        }
    }

    public function logout(Request $request){
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'logout success'], 200);
    }
}
