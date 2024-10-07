<?php

namespace App\Http\Controllers;

use App\Models\AboutUs;
use Illuminate\Http\Request;

class AboutUsController extends Controller
{
    // Menampilkan semua data dari tabel Home
    public function index()
    {
        $abouts = AboutUs::all();
        return response()->json($abouts);
    }

    // Menyimpan data baru ke tabel about
    public function store(Request $request)
    {
        // Validasi request, karena nullable, semua bisa optional
        $validatedAbout = $request->validate([
            'about_img' => 'nullable|string',
            'about_desc' => 'nullable|string|max:255',
            'event_dd' => 'nullable|string|max:255',
            'event_mmyy' => 'nullable|string|max:255',
        ]);

        // Membuat record baru
        $about = AboutUs::create($validatedAbout);

        return response()->json($about, 201);
    }

    // Menampilkan data dari id tertentu
    public function show(AboutUs $about)
    {
        return response()->json($about);
    }

    // Mengupdate data di tabel Home
    public function update(Request $request, AboutUs $about)
    {
        // Validasi request untuk update, semua field nullable
        $validated = $request->validate([
            'about_img' => 'nullable|string',
            'about_desc' => 'nullable|string|max:255',
            'place_date' => 'nullable|string|max:255',
            'event_dd' => 'nullable|string|max:255',
            'event_mmyy' => 'nullable|string|max:255',
        ]);

        // Update data sesuai dengan yang diinputkan
        $about->update($validated);

        return response()->json($about);
    }

    // Menghapus data dari id tertentu
    public function destroy(AboutUs $about)
    {
        $about->delete();
        return response()->json(null, 204);
    }
}
