<?php

namespace App\Http\Controllers;

use App\Models\Tutorial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TutorialController extends Controller
{
    // Menampilkan data dari id tertentu
    public function show(Tutorial $tutorial)
    {
        return response()->json($tutorial);
    }

    // Mengupdate data di tabel tutorial
    public function update(Request $request, Tutorial $tutorial)
    {
        $validated = $request->validate([
            'abstract' => 'nullable|string',
            // tambahkan validasi lain jika diperlukan
        ]);

        // Update data lainnya
        $tutorial->update($validated);

        return response()->json($tutorial);
    }

    // Upload thumbnail image
    public function uploadThumbnailImg(Request $request, Tutorial $tutorial)
    {
        // Validasi file gambar
        $validatedData = $request->validate([
            'thumbail_img' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
        ]);

        // Menghapus gambar sebelumnya jika ada
        if ($tutorial->thumbail_img) {
            Storage::disk('public')->delete($tutorial->thumbail_img);
        }

        // Simpan gambar ke storage
        $path = $request->file('thumbail_img')->store('tutorialThumbs', 'public');

        // Update kolom thumbail_img di database
        $tutorial->thumbail_img = $path; // Simpan path ke database
        $tutorial->save();

        return response()->json(['thumbail_img' => $path], 200); // Kembalikan path yang benar
    }
}
