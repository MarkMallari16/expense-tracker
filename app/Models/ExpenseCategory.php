<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExpenseCategory extends Model
{
    use HasFactory;
    protected $table = 'goals';
    protected $fillable = ['user_id', 'name', 'users_image'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
