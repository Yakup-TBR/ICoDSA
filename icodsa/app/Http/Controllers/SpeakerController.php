<?php

namespace App\Http\Controllers;

use App\Models\Speakers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class SpeakerController extends Controller
{
    public function index()
    {
        $speakers = Speakers::all();
        return response()->json($speakers);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'speakers_img' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:5120',
            'speakers_name' => 'required|string|max:255',
            'speakers_desc' => 'required|string',
        ]);

        // Simpan gambar ke storage dan ambil path-nya
        $path = $request->file('speakers_img')->storeAs('uploads', Str::uuid() . '.' . $request->file('speakers_img')->extension(), 'public');

        // Membuat record baru
        $speaker = Speakers::create([
            'speakers_img' => '/storage/' . $path,
            'speakers_name' => $validatedData['speakers_name'],
            'speakers_desc' => $validatedData['speakers_desc'],
        ]);

        return response()->json($speaker, 201);
    }

    public function destroy(Speakers $speaker)
    {
        // Ambil path gambar
        $imagePath = str_replace('/storage/', '', $speaker->speakers_img);

        // Hapus file dari storage
        if (Storage::disk('public')->exists($imagePath)) {
            Storage::disk('public')->delete($imagePath);
        }

        // Hapus speaker dari database
        $speaker->delete();

        return response()->json(null, 204);
    }
}
