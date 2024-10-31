<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Registration;

class RegistrationController extends Controller
{
    public function index()
    {
        return Registration::all();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'registration_subtitle' => 'nullable|string',
            'registration_text' => 'nullable|string',
            'registration_button_text' => 'nullable|string',
            'registration_button_link' => 'nullable|string',
            'registration_add' => 'required|in:subtitle,text,button',
        ]);

        Registration::create($data);

        return response()->json(['message' => 'Registration data saved successfully']);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'registration_add' => 'required|in:subtitle,text,button',
            'registration_subtitle' => 'nullable|string',
            'registration_text' => 'nullable|string',
            'registration_button_text' => 'nullable|string',
            'registration_button_link' => 'nullable|url'
        ]);

        $registration = Registration::findOrFail($id);
        $registration->update($request->all());

        return response()->json($registration);
    }

    public function destroy($id)
    {
        $registration = Registration::findOrFail($id);
        $registration->delete();

        return response()->json(null, 204);
    }
}
