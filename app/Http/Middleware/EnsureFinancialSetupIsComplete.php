<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureFinancialSetupIsComplete
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        $user = $request->user();

        // Check if financial setup is complete. This is just an example; adjust according to your actual columns and models.
        if (is_null($user->monthly_salary) || is_null($user->desired_budget) || is_null($user->budget_type)) {
            // Redirect to the financial setup page if the setup is not complete
            return redirect()->route('financial.setup')->with('error', 'Please complete your financial setup first.');
        }

        return $next($request);
    }
}
