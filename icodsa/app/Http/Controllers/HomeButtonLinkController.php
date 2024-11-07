<?php

namespace App\Http\Controllers;

use App\Models\HomeButtonLink;
use Illuminate\Http\Request;

class HomeButtonLinkController extends Controller
{
    // Fetch the button links
    public function index()
    {
        $buttonLink = HomeButtonLink::first(); // Get the first (and only) record
        return response()->json($buttonLink);
    }

    // Store or update the button links
    public function store(Request $request)
    {
        $request->validate([
            'submit_here_link' => 'nullable|url',
            'presentation_schedule_link' => 'nullable|url',
        ]);

        // Get the first (and only) record in the database or create a new one
        $buttonLink = HomeButtonLink::firstOrNew(['id' => 1]);

        // Update the fields with new data from the request
        $buttonLink->submit_here_link = $request->submit_here_link;
        $buttonLink->presentation_schedule_link = $request->presentation_schedule_link;
        $buttonLink->save(); // Save the record (either create or update)

        return response()->json($buttonLink);
    }
}
