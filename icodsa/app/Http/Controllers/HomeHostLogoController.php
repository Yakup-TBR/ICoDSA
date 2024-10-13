<?php

namespace App\Http\Controllers;

use App\Models\HomeHostLogo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class HomeHostLogoController extends Controller
{
    // Menyimpan logo baru
    public function store(Request $request)
    {
        $request->validate([
            'host_logo.*' => 'required|image|mimes:jpg,jpeg,png,webp|max:10240', // Validasi array file gambar
        ]);

        $logoPaths = [];
        foreach ($request->file('host_logo') as $file) {
            $path = $file->store('host_logos', 'public'); // Menyimpan gambar ke storage
            $logoPaths[] = $path; // Menyimpan path gambar
        }

        // Menyimpan informasi logo ke database
        foreach ($logoPaths as $path) {
            HomeHostLogo::create(['host_logo' => $path]);
        }

        return response()->json(['message' => 'Logos uploaded successfully!'], 201);
    }

    // Menghapus logo
    public function destroy($id)
    {
        $logo = HomeHostLogo::findOrFail($id);
        Storage::disk('public')->delete($logo->host_logo); // Menghapus file dari storage
        $logo->delete(); // Menghapus dari database

        return response()->json(null, 204);
    }

    // Menampilkan semua logo
    public function index()
    {
        $logos = HomeHostLogo::all(); // Mengambil semua logo dari database
        return response()->json($logos);
    }
}
