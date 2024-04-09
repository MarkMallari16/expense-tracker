<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Models\Income;
use App\Observers\IncomeObserver;

class AppServiceProvider extends ServiceProvider
{

    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {

        Income::observe(IncomeObserver::class);
        Expense::observe(ExpenseObserver::class);
    }
}
