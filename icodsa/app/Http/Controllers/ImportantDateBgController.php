<?php

namespace App\Http\Controllers;

use App\Models\ImportantDateBg;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImportantDateBgController extends Controller
{
    public function index()
    {
        // Mengambil semua data dan memastikan URL gambar penuh
        $importantDateBgs = ImportantDateBg::all()->map(function ($bg) {
            $bg->important_date_bg = $bg->important_date_bg ? asset('storage/' . $bg->important_date_bg) : null;
            return $bg;
        });

        return response()->json($importantDateBgs);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'important_date_bg' => 'nullable|string',
        ]);

        $importantDateBg = ImportantDateBg::create($validatedData);
        return response()->json($importantDateBg, 201);
    }

    public function show(ImportantDateBg $importantDateBg)
    {
        // Mengembalikan URL gambar penuh
        $importantDateBg->important_date_bg = $importantDateBg->important_date_bg 
            ? asset('storage/' . $importantDateBg->important_date_bg) 
            : null;

        return response()->json($importantDateBg);
    }

    public function update(Request $request, ImportantDateBg $importantDateBg)
    {
        $validatedData = $request->validate([
            'important_date_bg' => 'nullable|string',
        ]);

        $importantDateBg->update($validatedData);
        return response()->json($importantDateBg);
    }

    public function uploadBg(Request $request, ImportantDateBg $importantDateBg)
    {
        $validatedData = $request->validate([
            'background' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
        ]);

        if ($importantDateBg->important_date_bg) {
            Storage::disk('public')->delete($importantDateBg->important_date_bg);
        }

        $path = $request->file('background')->store('backgrounds', 'public');
        $importantDateBg->important_date_bg = $path;
        $importantDateBg->save();

        return response()->json(['background_url' => asset('storage/' . $path)], 200);
    }

    public function destroy(ImportantDateBg $importantDateBg)
    {
        $importantDateBg->delete();
        return response()->json(null, 204);
    }
}
