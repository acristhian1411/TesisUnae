<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Stock extends Model
{
    use SoftDeletes;
    protected $table="stock";
    protected $primaryKey="stock_id";
    protected $fillable=["stock_id", "stock_min",
                          "product_id", "branch_id",
                           "stock_qty"
                        ];
    protected $hidden = ["created_at","updated_at","deleted_at"];
    protected $dateFormat = 'Y-m-d H:i:sO';


}
