<?php

namespace App\Http\Controllers;

use App\Models\AboutUs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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
        $validatedAbout = $request->validate([
            'about_img' => 'nullable|string',
            'about_desc' => 'nullable|string',
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
        $validated = $request->validate([
            'about_img' => 'nullable|string',
            'about_desc' => 'nullable|string',
            'event_dd' => 'nullable|string|max:255',
            'event_mmyy' => 'nullable|string|max:255',
        ]);

        // Update data lainnya
        $about->update($validated);

        return response()->json($about);
    }

    public function uploadImgAbout(Request $request, AboutUs $about)
    {
        // Validasi file gambar
        $validatedData = $request->validate([
            'about_img' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
    
        // Menghapus gambar sebelumnya jika ada
        if ($about->about_img) {
            // Hapus gambar dari storage
            Storage::disk('public')->delete($about->about_img);
        }
    
        // Simpan gambar ke storage
        $path = $request->file('about_img')->store('aboutImg', 'public'); // Simpan di storage/app/public/aboutImg
    
        // Update kolom about_img di database
        $about->about_img = $path; // Simpan path ke database
        $about->save();
    
        return response()->json(['about_img' => $path], 200); // Kembalikan path yang benar
    }
    


    // Menghapus data dari id tertentu
    public function destroy(AboutUs $about)
    {
        $about->delete();
        return response()->json(null, 204);
    }
}
