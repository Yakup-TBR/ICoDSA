<?php

namespace App\Http\Controllers;

use App\Models\DocumentationLink;
use Illuminate\Http\Request;

class DocumentationLinkController extends Controller
{
    public function index()
    {
        $link = DocumentationLink::first();
        return response()->json($link);
    }

    public function store(Request $request)
    {
        $link = DocumentationLink::first();
        if ($link) {
            $link->update($request->only('documentation_cloud', 'video_link'));
        } else {
            $link = DocumentationLink::create($request->only('documentation_cloud', 'video_link'));
        }

        return response()->json($link);
    }
}
