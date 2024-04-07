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
        'recurring', 
        'recurring_type', 
        'start_date', 
        'end_date', 
    ];


    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
