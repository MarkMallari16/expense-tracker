<?php

use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\GoalsController;
use App\Http\Controllers\IncomeController;
use Illuminate\Foundation\Application;
use App\Http\Controllers\FinancialSetupController;

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/dashboard', [GoalsController::class, 'index'])->middleware(['auth', 'verified', 'financial.setup.complete'])->name('dashboard');

Route::group(['middleware' => ['auth', 'setup.complete']], function () {
    Route::get('financial/setup', [FinancialSetupController::class, 'index'])->name('financial.setup');
    Route::post('/financial/setup', [FinancialSetupController::class, 'store']);
});

Route::get('/income', [IncomeController::class, 'index'])->middleware(['auth', 'verified'])->name('income');
Route::get('/income/create', [IncomeController::class, 'create'])->middleware(['auth', 'verified'])->name('income.create');
Route::post('/income', [IncomeController::class, 'store'])->middleware(['auth', 'verified'])->name('income.store');
Route::get('/income/{income}', [IncomeController::class, 'show'])->middleware(['auth', 'verified'])->name('income.show');
Route::get('/income/{income}/edit', [IncomeController::class, 'edit'])->middleware(['auth', 'verified'])->name('income.edit');
Route::put('/income/{income}', [IncomeController::class, 'update'])->middleware(['auth', 'verified'])->name('income.update');
Route::delete('/income/{income}', [IncomeController::class, 'destroy'])->middleware(['auth', 'verified'])->name('income.destroy');

Route::get('/goals', [GoalsController::class, 'index'])->name('goals.index');
Route::get('/goals/create', [GoalsController::class, 'create'])->name('goals.create');
Route::post('/goals', [GoalsController::class, 'store'])->name('goals.store');
Route::get('/goals/{goal}', [GoalsController::class, 'show'])->name('goals.show');
Route::get('/goals/{goal}/edit', [GoalsController::class, 'edit'])->name('goals.edit');
Route::put('/goals/{goal}', [GoalsController::class, 'update'])->name('goals.update');
Route::delete('/goals/{goal}', [GoalsController::class, 'destroy'])->name('goals.destroy');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
Route::post('/reset-password', 'PasswordResetController@reset')->name('password.reset');


Route::resource('expenses', ExpenseController::class)
    ->middleware(['auth', 'verified']);


// expense page route
    Route::get('/expense', function(){
        return Inertia::render('Expense');
        
        })->middleware(['auth', 'verified']);


require __DIR__ . '/auth.php';
