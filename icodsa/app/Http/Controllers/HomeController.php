<?php

namespace App\Http\Controllers;

use App\Models\Home;
use Illuminate\Http\Request;

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
        // Validasi request untuk update, semua field nullable
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
}
