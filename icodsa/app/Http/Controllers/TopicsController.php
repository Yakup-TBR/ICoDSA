<?php

namespace App\Http\Controllers;

use App\Models\Topics;
use Illuminate\Http\Request;

class TopicsController extends Controller
{
    public function index()
    {
        $topics = Topics::all();
        return response()->json($topics);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'topic_order' => 'required|string|max:255',
            'topic_title' => 'required|string|max:255',
            'topic_list' => 'required|string',
        ]);

        $topic = Topics::create($validatedData);
        return response()->json($topic, 201);
    }

    public function show($id)
    {
        $topic = Topics::findOrFail($id);
        return response()->json($topic);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'topic_order' => 'required|string|max:255',
            'topic_title' => 'required|string|max:255',
            'topic_list' => 'required|string',
        ]);

        $topic = Topics::findOrFail($id);
        $topic->update($validatedData);
        return response()->json($topic);
    }

    public function destroy($id)
    {
        $topic = Topics::findOrFail($id);
        $topic->delete();
        return response()->json(null, 204);
    }
}
