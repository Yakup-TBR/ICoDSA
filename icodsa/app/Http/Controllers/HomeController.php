<?php

namespace App\Http\Controllers;

use App\Models\Home;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;


class HomeController extends Controller
{
    public function index()
    {
        $homes = Home::all();
        return response()->json($homes);
    }

    // Menyimpan data baru ke tabel Home
    public function store(Request $request)
    {
        // Validasi request, semua field nullable
        $validatedHome = $request->validate([
            'title' => 'nullable|string|max:255',
            'place_date' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'home_bg' => 'nullable|string',
        ]);

        // Membuat record baru
        $home = Home::create($validatedHome);

        return response()->json($home, 201);
    }

    // Menampilkan data dari id tertentu
    public function show(Home $home)
    {
        return response()->json($home);
    }

    // Mengupdate data di tabel Home
    public function update(Request $request, Home $home)
    {
        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'place_date' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'home_bg' => 'nullable|string',
        ]);

        // Update data sesuai dengan yang diinputkan
        $home->update($validated);

        return response()->json($home);
    }

    // Menghapus data dari id tertentu
    public function destroy(Home $home)
    {
        $home->delete();
        return response()->json(null, 204);
    }

    public function uploadBg(Request $request, Home $home)
    {
        // Validasi file gambar
        $validatedData = $request->validate([
            'home_bg' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // Maksimal 2MB
        ]);

        // Menghapus gambar sebelumnya jika ada
        if ($home->home_bg) {
            // Hapus gambar dari storage
            Storage::disk('public')->delete($home->home_bg);
        }

        // Simpan gambar ke storage
        $path = $request->file('home_bg')->store('backgrounds', 'public'); // Simpan di storage/app/public/backgrounds

        // Update kolom home_bg di database
        $home->home_bg = $path; // Simpan path ke database
        $home->save();

        return response()->json(['home_bg' => $path], 200);
    }
}
