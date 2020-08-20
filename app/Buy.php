<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Buy extends Model
{
    use SoftDeletes;
    protected $table="buys";
    protected $primaryKey="buy_id";
    protected $fillable=["buy_id","person_id","buy_date","buy_invoice_number"];
    protected $hidden = ["created_at","updated_at","deleted_at"];
    protected $dateFormat = 'Y-m-d H:i:sO';
}
