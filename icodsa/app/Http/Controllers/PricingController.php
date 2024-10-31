<?php

namespace App\Http\Controllers;

use App\Models\Pricing;
use Illuminate\Http\Request;

class PricingController extends Controller
{
    public function index()
    {
        return response()->json(Pricing::all(), 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'price_label' => 'required|string|max:255',
            'price' => 'required|integer',
            'price_idr' => 'required|string|max:255',
        ]);

        $pricing = Pricing::create($request->all());
        return response()->json($pricing, 201);
    }

    public function show($id)
    {
        $pricing = Pricing::findOrFail($id);
        return response()->json($pricing, 200);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'price_label' => 'sometimes|required|string|max:255',
            'price' => 'sometimes|required|integer',
            'price_idr' => 'sometimes|required|string|max:255',
        ]);

        $pricing = Pricing::findOrFail($id);
        $pricing->update($request->all());
        return response()->json($pricing, 200);
    }

    public function destroy($id)
    {
        $pricing = Pricing::findOrFail($id);
        $pricing->delete();
        return response()->json(null, 204);
    }
}
