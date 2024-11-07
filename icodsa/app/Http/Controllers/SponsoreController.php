<?php

namespace App\Http\Controllers;

use App\Models\Sponsore;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SponsoreController extends Controller
{
    // Store new sponsor logo
    public function store(Request $request)
    {
        $request->validate([
            'sponsore_logo' => 'required|image|mimes:jpg,jpeg,png,webp|max:10240', // Validate logo image
        ]);

        // Store the logo
        $path = $request->file('sponsore_logo')->store('sponsors', 'public');

        // Save to database
        $sponsor = new Sponsore();
        $sponsor->sponsore_logo = $path;
        $sponsor->save();

        return response()->json($sponsor, 201);
    }

    // Delete a sponsor logo
    public function destroy($id)
    {
        $sponsor = Sponsore::findOrFail($id);

        // Delete the file from storage
        Storage::disk('public')->delete($sponsor->sponsore_logo);

        // Delete the database entry
        $sponsor->delete();

        return response()->json(null, 204);
    }

    // Get all sponsors
    public function index()
    {
        $sponsors = Sponsore::all();
        return response()->json($sponsors);
    }
}
