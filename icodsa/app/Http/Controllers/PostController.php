<?php

namespace App\Http\Controllers;

use App\Models\AboutUs;
use App\Models\Home;
use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\Speakers;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::all();
        $home = Home::all();
        $about = AboutUs::all();
        $speaker = Speakers::all();
        return response()->json([
            'posts' => $posts,
            'home' => $home,
            'about' => $about,
            'speaker' => $speaker,
        ]);
    }

    public function store(Request $request)
    {
        $post = Post::create($request->all());
        return response()->json($post, 201);
    }

    public function show(Post $post)
    {
        return response()->json($post);
    }

    public function update(Request $request, Post $post)
    {
        $post->update($request->all());
        return response()->json($post);
    }

    public function destroy(Post $post)
    {
        $post->delete();
        return response()->json(null, 204);
    }
}
