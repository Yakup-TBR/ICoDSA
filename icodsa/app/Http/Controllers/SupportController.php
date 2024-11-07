<?php

namespace App\Http\Controllers;

use App\Models\Support;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SupportController extends Controller
{
    // Store logo for supported by
    public function store(Request $request)
    {
        $request->validate([
            'support_logo' => 'required|image|mimes:jpg,jpeg,png,webp|max:10240', // Validate the uploaded image
        ]);

        $path = $request->file('support_logo')->store('support_logos', 'public'); // Save the image in the storage

        // Save the logo path in the database
        Support::create(['support_logo' => $path]);

        return response()->json(['message' => 'Logo uploaded successfully!'], 201);
    }

    // Delete logo
    public function destroy($id)
    {
        $supportLogo = Support::findOrFail($id);
        Storage::disk('public')->delete($supportLogo->support_logo); // Delete the image from storage
        $supportLogo->delete(); // Remove from database

        return response()->json(null, 204);
    }

    // Get all supported logos
    public function index()
    {
        $logos = Support::all(); // Get all logos
        return response()->json($logos);
    }
}
