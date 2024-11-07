<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ArticleController extends Controller
{
    public function index()
    {
        $articles = Article::all();
        return response()->json($articles);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'article_img' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:10240',
            'article_title' => 'required|string|max:255',
            'article_description' => 'required|string',
            'article_link' => 'required|url',
        ]);

        $path = $request->file('article_img')->storeAs('uploads', Str::uuid() . '.' . $request->file('article_img')->extension(), 'public');

        $article = Article::create([
            'article_img' => '/storage/' . $path,
            'article_title' => $validatedData['article_title'],
            'article_description' => $validatedData['article_description'],
            'article_link' => $validatedData['article_link'],
        ]);

        return response()->json($article, 201);
    }

    public function update(Request $request, $id)
    {
        $article = Article::findOrFail($id);

        $validatedData = $request->validate([
            'article_img' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:10240',
            'article_title' => 'required|string|max:255',
            'article_description' => 'required|string',
            'article_link' => 'required|url',
        ]);

        if ($request->hasFile('article_img')) {
            // Hapus gambar lama dari storage
            if ($article->article_img) {
                $oldImagePath = str_replace('/storage/', '', $article->article_img);
                Storage::disk('public')->delete($oldImagePath);
            }

            // Simpan gambar baru
            $path = $request->file('article_img')->storeAs('uploads', Str::uuid() . '.' . $request->file('article_img')->extension(), 'public');
            $article->article_img = '/storage/' . $path;
        }

        $article->article_title = $validatedData['article_title'];
        $article->article_description = $validatedData['article_description'];
        $article->article_link = $validatedData['article_link'];
        $article->save();

        return response()->json($article);
    }

    public function destroy($id)
    {
        $article = Article::findOrFail($id);

        if ($article->article_img) {
            $oldImagePath = str_replace('/storage/', '', $article->article_img);
            Storage::disk('public')->delete($oldImagePath);
        }

        $article->delete();

        return response()->json(null, 204);
    }
}
