<?php

namespace App\Http\Controllers;

use App\Models\ImportantDate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ImportantDateController extends Controller
{
    public function index()
    {
        $importantDates = ImportantDate::all();
        return response()->json($importantDates);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'activity_icon' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:10240',
            'activity' => 'required|string|max:255',
            'event_date' => 'required|date',
            'important_date_bg' => 'nullable|string|max:255',
        ]);

        // Save the activity icon and get the path
        $path = $request->file('activity_icon')->storeAs('uploads', Str::uuid() . '.' . $request->file('activity_icon')->extension(), 'public');

        // Create new record
        $importantDate = ImportantDate::create([
            'activity' => $validatedData['activity'],
            'activity_icon' => '/storage/' . $path,
            'event_date' => $validatedData['event_date'],
            'important_date_bg' => $validatedData['important_date_bg'] ?? '',
        ]);

        return response()->json($importantDate, 201);
    }

    public function destroy(ImportantDate $importantDate)
    {
        // Delete the icon from storage
        $iconPath = str_replace('/storage/', '', $importantDate->activity_icon);
        if (Storage::disk('public')->exists($iconPath)) {
            Storage::disk('public')->delete($iconPath);
        }

        // Delete the important date from the database
        $importantDate->delete();

        return response()->json(null, 204);
    }
}
