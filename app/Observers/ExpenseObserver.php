<?php

namespace App\Observers;

use App\Models\Expense;

class ExpenseObserver
{
    /**
     * Handle the Expense "created" event.
     */
    public function created(Expense $expense)
    {
        if ($expense->recurring === false) {
            $finance = $expense->user->finance()->firstOrCreate();
            $finance->increment('expense', $expense->price);
            $finance->decrement('wallet', $expense->price);
        }
    }

    /**
     * Handle the Expense "updated" event.
     */
    public function updated(Expense $expense)
    {
        //
    }

    /**
     * Handle the Expense "deleted" event.
     */
    public function deleted(Expense $expense)
    {
        //
    }

    /**
     * Handle the Expense "restored" event.
     */
    public function restored(Expense $expense)
    {
        //
    }

    /**
     * Handle the Expense "force deleted" event.
     */
    public function forceDeleted(Expense $expense)
    {
        //
    }
}
