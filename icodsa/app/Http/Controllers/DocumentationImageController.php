<?php

namespace App\Http\Controllers;

use App\Models\DocumentationImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class DocumentationImageController extends Controller
{
    public function index()
    {
        $images = DocumentationImage::all();
        return response()->json($images);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'documentation_img' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:10240',
        ]);

        $path = $request->file('documentation_img')->storeAs(
            'uploads',
            Str::uuid() . '.' . $request->file('documentation_img')->extension(),
            'public'
        );

        $image = DocumentationImage::create([
            'documentation_img' => '/storage/' . $path,
        ]);

        return response()->json($image, 201);
    }


    public function destroy($id)
    {
        $image = DocumentationImage::findOrFail($id);

        // Hapus gambar dari storage
        if ($image->documentation_img) {
            $imagePath = str_replace('/storage/', '', $image->documentation_img);
            Storage::disk('public')->delete($imagePath);
        }

        // Hapus data gambar dari database
        $image->delete();

        return response()->json(null, 204);  // Status 204 menandakan penghapusan berhasil tanpa konten
    }
}
