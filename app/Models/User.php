<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'monthly_salary',
        'desired_budget',
        'budget_type',
        'setup_complete',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];
    public function goals()
    {
        return $this->hasMany(Goals::class);
    }
    public function expenseCategory()
    {
        return $this->hasMany(ExpenseCategory::class);
    }
    public function income()
    {
        return $this->hasMany(Income::class);
    }

    public function expense(): HasMany
    {
        return $this->hasMany(Expense::class, 'user_id');
    }
    public function finance()
    {
        return $this->hasOne(Finance::class);
    }
    public function recurringBills()
    {
        return $this->hasMany(RecurringBill::class);
    }
}
