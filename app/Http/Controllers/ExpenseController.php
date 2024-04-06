<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use App\Models\Finance;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;

class ExpenseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $userId = Auth::id();
        $expenses = Expense::where('user_id', $userId)->get();
        $finance = Finance::where('user_id', $userId)->get();

        return Inertia::render('Dashboard', [
            'expenses' => $expenses,
            'finance' => $finance,
        ]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    function expensePage()
    {
        $userId = Auth::id();
        $expenses = Expense::where('user_id', $userId)->get();
        $finance = Finance::where('user_id', $userId)->get();
        return Inertia::render('Expense', [
            'expenses' => $expenses
        ]);
    }

    public function storeCategory(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'users_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $users_image = null;
        if ($request->hasFile('users_image')) {
            $image = $request->file('users_image');
            $filename = $image->store('images', 'public');
            $users_image = $filename;
        }

        $user = auth()->user();
        $goal = $user->expenseCategory()->create([
            'name' => $request->input('name'),
            'users_image' => $users_image,
        ]);

        return redirect()->route('dashboard');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'price' => 'required|integer'
        ]);

        $user = $request->user();
        $walletBalance = $user->finance->wallet;

        // Check if the user has enough balance
        if ($walletBalance >= $validated['price']) {
            // Deduct expense from wallet
            $user->finance->wallet -= $validated['price'];

            // Update total expenses
            $user->finance->expense += $validated['price'];

            $user->finance->save();

            // Create new expense
            $user->expense()->create($validated);

            return redirect(route('expenses.store'))->with('success', 'Expense added successfully!');
        } else {
            return redirect(route('expenses.store'))->with('error', 'Insufficient funds!');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(expense $expense)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(expense $expense)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, expense $expense)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(expense $expense)
    {
        //
    }
}
