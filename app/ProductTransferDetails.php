<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductTransferDetails extends Model
{
    use SoftDeletes;
    protected $table="prod_transfer_details";
    protected $primaryKey="pt_details_id";
    protected $fillable=["pt_details_id","prod_transfer_id", 
    "product_id", "pt_det_qty", "state"];
    protected $hidden = ["created_at","updated_at","deleted_at"];
    protected $dateFormat = 'Y-m-d H:i:sO';


}
