<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Workplace extends Model
{
    use SoftDeletes;
    protected $table="workplaces";
    protected $primaryKey="wplace_id";
    protected $fillable=["wplace_id","description", "address", "telephone"];
    protected $hidden = ["created_at","updated_at","deleted_at"];
    protected $dateFormat = 'Y-m-d H:i:sO';


}
