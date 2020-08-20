<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class BuyDetails extends Model
{
    use SoftDeletes;
    protected $table="buy_details";
    protected $primaryKey="buy_details_id";
    protected $fillable=["buy_details_id","buy_id","product_id",
    "bdetails_qty","bdetails_price","bdetails_discount"];
    protected $hidden = ["created_at","updated_at","deleted_at"];
    protected $dateFormat = 'Y-m-d H:i:sO';
}
