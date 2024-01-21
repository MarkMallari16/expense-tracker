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
    ];


    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
