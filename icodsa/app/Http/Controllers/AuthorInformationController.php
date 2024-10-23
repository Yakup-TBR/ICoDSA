<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AuthorInformation;

class AuthorInformationController extends Controller
{
    public function index()
    {
        return AuthorInformation::all();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'author_subtitle' => 'nullable|string',
            'author_text' => 'nullable|string',
            'author_add_text' => 'nullable|string',
            'author_button_link' => 'nullable|string',
            'author_add' => 'required|in:subtitle,text,button',
        ]);

        AuthorInformation::create($data);

        return response()->json(['message' => 'Author information saved successfully']);
    }


    public function update(Request $request, $id)
    {
        $request->validate([
            'author_add' => 'required|in:subtitle,text,button',
            'author_subtitle' => 'nullable|string',
            'author_text' => 'nullable|string',
            'author_button_link' => 'nullable|url'
        ]);

        $authorInformation = AuthorInformation::findOrFail($id);
        $authorInformation->update($request->all());

        return response()->json($authorInformation);
    }

    public function destroy($id)
    {
        $authorInformation = AuthorInformation::findOrFail($id);
        $authorInformation->delete();

        return response()->json(null, 204);
    }
}
