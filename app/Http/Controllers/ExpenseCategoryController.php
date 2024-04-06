<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ExpenseCategoryController extends Controller
{
    public function store(Request $request)
    {
        // Validate incoming request data
        $validatedData = $request->validate([
            'name' => 'required|string',
            'users_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Validate image file
        ]);

        // Process the uploaded image file
        if ($request->hasFile('users_image')) {
            // Store the uploaded file and get its path
            $imagePath = $request->file('users_image')->store('public/images');
            // Update the 'users_image' field in the validated data with the stored image path
            $validatedData['users_image'] = Storage::url($imagePath);
        }

        // Create a new expense category using the validated data
        $expenseCategory = ExpenseCategory::create($validatedData);

        // Redirect back to the index page with success message
        return redirect()->back()->with('success', 'Expense category created successfully.');
    }
}
