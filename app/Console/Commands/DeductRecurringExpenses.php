<?php

namespace App\Console\Commands;

use App\Models\Expense;
use Illuminate\Console\Command;
use Carbon\Carbon;

class DeductRecurringExpenses extends Command
{
    protected $signature = 'expenses:deduct';
    protected $description = 'Deduct recurring expenses from users\' wallets';

    public function handle()
    {
        $today = Carbon::today();

        // Fetch expenses with recurring set to true
        $recurringExpenses = Expense::where('recurring', true)->get();

        foreach ($recurringExpenses as $expense) {
            if ($this->isScheduledForToday($expense, $today)) {
                $this->processExpense($expense);
            }
        }

        $this->info('Scheduled expenses have been processed.');
    }

    private function isScheduledForToday($expense, $today)
    {
        // Check if the expense is recurring
        if (!$expense->recurring) {
            return false; // If not recurring, return false
        }

        // Determine if today matches the expense's schedule
        switch ($expense->recurring_type) {
            case 'Monthly':
                return $today->day === Carbon::parse($expense->created_at)->day;
            case 'Weekly':
                return $today->dayOfWeek === Carbon::parse($expense->created_at)->dayOfWeek;
            case 'Daily':
                return true;
            default:
                return false;
        }
    }

    private function processExpense($expense)
    {
        $user = $expense->user;

        // Check if the user has sufficient balance for the expense
        if ($user->finance->wallet >= $expense->price) {
            // Deduct expense from wallet
            $user->finance->wallet -= $expense->price;
            $user->finance->save();

            // Duplicate the expense entry
            $newExpense = $expense->replicate(['created_at', 'updated_at']);
            $newExpense->recurring = false; // Set recurring to false for the duplicate
            $newExpense->created_at = Carbon::now();
            $newExpense->updated_at = Carbon::now();
            $newExpense->save();

            $this->info("Expense '{$expense->title}' deducted from user '{$user->name}' wallet successfully.");
        } else {
            $this->warn("User '{$user->name}' has insufficient funds to deduct expense '{$expense->title}'.");
        }
    }
}
