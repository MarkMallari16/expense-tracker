<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
    use HasFactory;

    protected $table = "expenses";
    protected $fillable = [
        'title',
        'category',
        'price',
        'recurring', // Add recurring field
        'recurring_type', // Add recurring_type field
        'start_date', // Add start_date field
        'end_date', // Add end_date field
    ];


    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
