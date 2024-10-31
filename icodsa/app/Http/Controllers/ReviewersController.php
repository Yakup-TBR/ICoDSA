<?php

namespace App\Http\Controllers;

use App\Models\Reviewers;
use Illuminate\Http\Request;

class ReviewersController extends Controller
{
    // Menampilkan semua data reviewer
    public function index()
    {
        $reviewers = Reviewers::select('reviewer_name')->get(); // Mengambil hanya reviewer_name
        return response()->json($reviewers); // Mengembalikan sebagai JSON
    }

    // Menyimpan reviewer baru
    public function store(Request $request)
    {
        $request->validate([
            'reviewers' => 'required|array',
            'reviewers.*' => 'string|max:255'
        ]);

        Reviewers::truncate(); // Membersihkan tabel sebelum menyimpan daftar baru
        foreach ($request->input('reviewers') as $reviewerName) {
            Reviewers::create(['reviewer_name' => $reviewerName]);
        }

        return response()->json(['message' => 'Reviewers successfully saved']);
    }
}
