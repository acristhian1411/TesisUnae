<?php

namespace App\Http\Controllers\ContactType;

use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use App\ContactType;

class ContactTypeController extends ApiController
{
  public function index()
  {
    $t = ContactType::query()->first();
    $query = ContactType::query();
    $query = $this->filterData($query, $t);
    $datos = $query->get();
      return $this->showAll($datos,200);
  }

  public function store(Request $request)
  {
        $request->validate([
        'ctype_descrip' => 'required',
    ]);
   $datos = new ContactType($request->all());
   $datos->save();
    return response()->json('Tipo de contacto se agrego con exito!');
  }

  public function show($id)
  {
    //$dato = ContactType::find( $id);
    $dato = ContactType::where( 'ctype_id', '=', $id)
                              ->first();
    return $this->showOne($dato,200);
  }

  public function update(Request $request, $id)
  {
    $dato = ContactType::findOrFail( $id);
          $request->validate([
            'ctype_descrip' => 'required',
          ]);
          $dato->ctype_descrip = $request->ctype_descrip;
          $dato->save();
          return response()->json([
              'message' => 'Tipo de contacto se actualizo con exito!',
              'dato' => $dato
          ]);
      }

      public function destroy($id)
      {
          $dato = ContactType::findOrFail($id);
          $dato->delete();
          return response()->json([
              'message' => 'Tipo de contacto se elimino con exito!'
          ]);
        }
    public function search($request)
    {
        $dato = ContactType::where('ctype_descrip', 'ILIKE', '%'.$request.'%' )
        ->get();
        return $this->showAll($dato,200);

      }

}
