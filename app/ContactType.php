<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ContactType extends Model
{
    use SoftDeletes;
    protected $table="contact_type";
    protected $primaryKey="ctype_id";
    protected $fillable=["ctype_id","ctype_descrip"];
    protected $hidden = ["created_at","updated_at","deleted_at"];
    protected $dateFormat = 'Y-m-d H:i:sO';


}
