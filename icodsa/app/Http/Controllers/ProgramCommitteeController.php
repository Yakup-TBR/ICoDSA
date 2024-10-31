<?php

namespace App\Http\Controllers;

use App\Models\ProgramCommittees;
use Illuminate\Http\Request;

class ProgramCommitteeController extends Controller
{
    public function index()
    {
        $committees = ProgramCommittees::all();
        return response()->json($committees);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'committee_position' => 'required|string|max:255',
            'committee_members' => 'required|string',
        ]);

        $committee = ProgramCommittees::create($validatedData);
        return response()->json($committee, 201);
    }

    public function show($id)
    {
        $committee = ProgramCommittees::findOrFail($id);
        return response()->json($committee);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'committee_position' => 'required|string|max:255',
            'committee_members' => 'required|string',
        ]);

        $committee = ProgramCommittees::findOrFail($id);
        $committee->update($validatedData);
        return response()->json($committee);
    }

    public function destroy($id)
    {
        $committee = ProgramCommittees::findOrFail($id);
        $committee->delete();
        return response()->json(null, 204);
    }
}
