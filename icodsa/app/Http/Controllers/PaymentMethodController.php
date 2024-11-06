<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PaymentMethods;

class PaymentMethodController extends Controller
{
    public function index()
    {
        return PaymentMethods::all();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'payment_method' => 'nullable|string',
            'payment_details' => 'nullable|string',
            'payment_additional_info' => 'nullable|string',
            'method_or_info' => 'required|in:method,info'
        ]);

        $paymentMethod = PaymentMethods::create($data);

        return response()->json($paymentMethod);
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'payment_method' => 'nullable|string',
            'payment_details' => 'nullable|string',
            'payment_additional_info' => 'nullable|string',
            'method_or_info' => 'required|in:method,info'
        ]);

        $paymentMethod = PaymentMethods::findOrFail($id);
        $paymentMethod->update($data);

        return response()->json($paymentMethod);
    }

    public function destroy($id)
    {
        $paymentMethod = PaymentMethods::findOrFail($id);
        $paymentMethod->delete();

        return response()->json(['message' => 'Payment method deleted successfully']);
    }
}
