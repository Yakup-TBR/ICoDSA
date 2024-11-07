<?php

namespace App\Http\Controllers;

use App\Models\Copyright;
use Illuminate\Http\Request;

class CopyrightController extends Controller
{
    // Get the current copyright text
    public function index()
    {
        $copyright = Copyright::all();  // Get all entries (should only be 1 entry)
        return response()->json($copyright);
    }

    // Create new copyright text if none exists
    public function store(Request $request)
    {
        $request->validate([
            'copyright_text' => 'required|string',
        ]);

        $copyright = new Copyright();
        $copyright->copyright_text = $request->copyright_text;
        $copyright->save();

        return response()->json($copyright, 201);
    }

    // Update existing copyright text
    public function update(Request $request)
    {
        $request->validate([
            'copyright_text' => 'required|string',
        ]);

        // Assuming only one record exists, so we update the first record
        $copyright = Copyright::first();
        if ($copyright) {
            $copyright->copyright_text = $request->copyright_text;
            $copyright->save();
        } else {
            // Create a new entry if none exists
            $copyright = new Copyright();
            $copyright->copyright_text = $request->copyright_text;
            $copyright->save();
        }

        return response()->json($copyright);
    }
}
