<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Provider extends Model
{
    use SoftDeletes;
    protected $table="provider";
    protected $primaryKey="person_id";
    protected $fillable=["person_id","district_id", "nombre",
                        "last_name", "cedula", "ruc", "home_address",
                      "business_name", "prov_activo", "obs"];
    protected $hidden = ["created_at","updated_at","deleted_at"];
    protected $dateFormat = 'Y-m-d H:i:sO';


}
