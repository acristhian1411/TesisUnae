<?php

namespace App\Http\Controllers\City;

use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use App\City;

class CityController extends ApiController
{
  public function index()
  {
    $t = City::query()->first();
    $query = City::query();
    $query = $this->filterData($query, $t);
    $datos = $query->get();
      return $this->showAll($datos,200);
  }

  public function store(Request $request)
  {
        $request->validate([
        'city_descrip' => 'required',
    ]);
   $datos = new City($request->all());
   $datos->save();
    return response()->json('Ciudad se agrego con exito!');
  }

  public function show($id)
  {
    //$dato = City::find( $id);
    $dato = City::where( 'city_id', '=', $id)
                              ->first();
    return $this->showOne($dato,200);
  }

  public function update(Request $request, $id)
  {
    $dato = City::findOrFail( $id);
          $request->validate([
            'city_descrip' => 'required',
          ]);
          $dato->city_descrip = $request->city_descrip;
          $dato->save();
          return response()->json([
              'message' => 'Ciudad se actualizo con exito!',
              'dato' => $dato
          ]);
      }

      public function destroy($id)
      {
          $dato = City::findOrFail($id);
          $dato->delete();
          return response()->json([
              'message' => 'Ciudad se elimino con exito!'
          ]);
        }
    public function search($request)
    {
        $dato = City::where('city_descrip', 'ILIKE', '%'.$request.'%' )
        ->get();
        return $this->showAll($dato,200);

      }
}
