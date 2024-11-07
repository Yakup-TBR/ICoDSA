<?php

namespace App\Http\Controllers;

use App\Models\Address;
use Illuminate\Http\Request;

class AddressController extends Controller
{
    public function index()
    {
        $address = Address::first(); // Hanya ada satu address record
        return response()->json($address);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'place' => 'nullable|string',
            'address_additional_info' => 'nullable|string',
            'google_map_link' => 'nullable|string',
        ]);

        $address = Address::create($validatedData);
        return response()->json($address, 201);
    }

    public function update(Request $request, Address $address)
    {
        $validatedData = $request->validate([
            'place' => 'nullable|string',
            'address_additional_info' => 'nullable|string',
            'google_map_link' => 'nullable|string',
        ]);

        $address->update($validatedData);
        return response()->json($address);
    }
}
