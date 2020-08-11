<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use SoftDeletes;
    protected $table="product";
    protected $primaryKey="product_id";
    protected $fillable=["product_id","sub_cat_id", "brand_id", "person_id", "prod_iva", "prod_sale_price", "prod_descrip"];
    protected $hidden = ["created_at","updated_at","deleted_at"];
    protected $dateFormat = 'Y-m-d H:i:sO';


}
