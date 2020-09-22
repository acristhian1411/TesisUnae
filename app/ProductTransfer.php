<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductTransfer extends Model
{
    use SoftDeletes;
    protected $table="prod_transfers";
    protected $primaryKey="prod_transfer_id";
    protected $fillable=["prod_transfer_id","br_origin_id",
     "br_destination_id", "transfer_date", "state"];
    protected $hidden = ["created_at","updated_at","deleted_at"];
    protected $dateFormat = 'Y-m-d H:i:sO';


}
