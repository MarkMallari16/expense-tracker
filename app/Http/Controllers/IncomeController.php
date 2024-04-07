<?php

namespace App\Http\Controllers;

use App\Models\Income;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Finance;

class IncomeController extends Controller
{
    /**
     * Display a listing of the income.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        // Retrieve all income records from the database
        $user_id = Auth::id();

        // Fetch all income records
        $finance = Finance::where('user_id', $user_id)->get();
        $income = Income::where('user_id', $user_id)->get();

        // Fetch and sum monthly income records
        $monthlyIncomeSum = Income::where('user_id', $user_id)
            ->where('schedule', 'monthly')
            ->sum('income');

        // Debugging
        // Output the value of $monthlyIncomeSum

        $yearlyIncome = $monthlyIncomeSum * 12;


        // Use Inertia to render the React component with data
        return Inertia::render('IncomeFolder/IncomePage', [
            'income' => $income,
            'monthlyIncomeSum' => $monthlyIncomeSum,
            'yearlyIncome' => $yearlyIncome ,// Corrected
            'finance' =>     $finance,
        ]);
    }

    /**
     * Show the form for creating a new income.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        // Use Inertia to render the React component for creating income
        return Inertia::render('Income/Create');
    }

    /**
     * Store a newly created income in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        // Validate the incoming request
        $request->validate([
            'title' => 'required|string',
            'schedule' => 'required|string',
            'income' => 'required|numeric',
        ]);

        // Create a new income record associated with the currently authenticated user
        $user = auth()->user();
        $income = $user->income()->create($request->all());

        // Update or create finance record
        $finance = $user->finance ?? new Finance();
        $finance->income_id = $income->id; // Assign income_id
        $finance->user_id = $user->id; // Assign user_id
        $finance->totalIncome += $income->income;
        $finance->wallet += $income->income;
        $finance->save();


        // Redirect to the index page with a success message
        return redirect()->route('income')->with('success', 'Income added successfully!');
    }


    // Other methods like show, edit, update, destroy, etc.
}
