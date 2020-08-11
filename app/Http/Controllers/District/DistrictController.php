<?php

namespace App\Http\Controllers\District;

use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use App\District;

class DistrictController extends ApiController
{
  public function index()
  {
    $datos = District::join('city', 'city.city_id', 'districts.city_id')
                          ->select('districts.*', 'city.city_descrip')
                          ->get();

      return $this->showAll($datos,200);
  }

  public function store(Request $request)
  {
        $request->validate([
          'district_descrip' => 'required',
          'city_id' => 'required',
    ]);
   $datos = new District($request->all());
   $datos->save();
    return response()->json('Barrio se agrego con exito!');
  }

  public function show($id)
  {
    //$dato = District::find( $id);
    $dato = District::where( 'district_id', '=', $id)
                              ->first();
    return $this->showOne($dato,200);
  }
  public function showSelect($id)
  {
    //$dato = District::find( $id);
    $dato = District::where( 'city_id', '=', $id)
                              ->get();
    return $this->showAll($dato,200);
  }
  public function update(Request $request, $id)
  {
    $dato = District::findOrFail( $id);
          $request->validate([
            'district_descrip' => 'required',
            'city_id' => 'required',

          ]);
          $dato->district_descrip = $request->district_descrip;
          $dato->city_id = $request->city_id;
          $dato->save();
          return response()->json([
              'message' => 'Barrio se actualizo con exito!',
              'dato' => $dato
          ]);
      }

      public function destroy($id)
      {
          $dato = District::findOrFail($id);
          $dato->delete();
          return response()->json([
              'message' => 'Barrio se elimino con exito!'
          ]);
        }
    public function search($request)
    {
        $dato = District::where('district_descrip', 'ILIKE', '%'.$request.'%' )
        ->get();
        return $this->showAll($dato,200);

      }
}
