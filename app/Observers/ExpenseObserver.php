<?php

namespace App\Observers;

use App\Models\Expense;
use App\Models\ExpenseHistory;

class ExpenseObserver
{
    /**
     * Handle the expense "created" event.
     *
     * @param  \App\Models\Expense  $expense
     * @return void
     */
    public function created(Expense $expense)
    {
        // Add the expense to the expense history
        ExpenseHistory::create([
            'title' => $expense->title,
            'category' => $expense->category,
            'price' => $expense->price,
            'user_id' => $expense->user_id,
            // Add other fields if needed
        ]);
    }

    /**
     * Handle the expense "updated" event.
     *
     * @param  \App\Models\Expense  $expense
     * @return void
     */
    public function updated(Expense $expense)
    {
        // Handle the expense updated event if needed
    }

    /**
     * Handle the expense "deleted" event.
     *
     * @param  \App\Models\Expense  $expense
     * @return void
     */
    public function deleted(Expense $expense)
    {
        // Handle the expense deleted event if needed
    }
}
