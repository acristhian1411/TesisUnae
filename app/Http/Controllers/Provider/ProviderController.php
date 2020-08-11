<?php

namespace App\Http\Controllers\Provider;

use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use App\Provider;
use App\Person;

class ProviderController extends ApiController
{
  public function index()
  {
    $datos = Provider::join('districts', 'districts.district_id', 'provider.district_id')
    ->join('city', 'city.city_id', 'districts.city_id')
    ->select('provider.*', 'districts.district_descrip', 'city.city_descrip')
    ->get();

      return $this->showAll($datos,200);
  }

  public function store(Request $request)
  {

    $request->validate([
      'district_id' => 'required',
      'nombre' => 'required',
      'last_name' => 'required',
      'cedula' => 'required',
      'ruc' => 'required',
      'home_address' => 'required',
      'business_name' => 'required',
      'prov_activo' => 'required',
      'obs' => 'required',
  ]);

      $dato = new Person([
        'district_id' => $request ->get('district_id'),
        'nombre' => $request ->get('nombre'),
        'last_name' => $request ->get('last_name'),
        'cedula' => $request ->get('cedula'),
        'ruc' => $request ->get('ruc'),
        'home_address' => $request ->get('home_address'),
        'business_name' => $request ->get('business_name')
      ]);

      $dato->save();

      $datos = new Provider([
        'person_id' =>  $dato->person_id,
        'district_id' => $request ->get('district_id'),
        'nombre' => $request ->get('nombre'),
        'last_name' => $request ->get('last_name'),
        'cedula' => $request ->get('cedula'),
        'ruc' => $request ->get('ruc'),
        'home_address' => $request ->get('home_address'),
        'business_name' => $request ->get('business_name'),
        'prov_activo' => $request ->get('prov_activo'),
        'obs' => $request ->get('obs')
      ]);

      $datos->save();

    return response()->json('Proveedor se agrego con exito!');
  }

  public function show($id)
  {
    //$dato = Provider::find( $id);
    $dato = Provider::where( 'person_id', '=', $id)
                              ->first();
    return $this->showOne($dato,200);
  }

  public function update(Request $request, $id)
  {
    $dato = Provider::findOrFail( $id);
    $request->validate([
      'district_id' => 'required',
      'nombre' => 'required',
      'last_name' => 'required',
      'cedula' => 'required',
      'ruc' => 'required',
      'home_address' => 'required',
      'business_name' => 'required',
      'prov_activo' => 'required',
      'obs' => 'required',
    ]);
          $dato->district_id = $request->district_id;
          $dato->nombre = $request->nombre;
          $dato->last_name = $request->last_name;
          $dato->cedula = $request->cedula;
          $dato->ruc = $request->ruc;
          $dato->home_address = $request->home_address;
          $dato->business_name = $request->business_name;
          $dato->prov_activo = $request->prov_activo;
          $dato->obs = $request->obs;
          $dato->save();
          return response()->json([
              'message' => 'Proveedor se actualizo con exito!',
              'dato' => $dato
          ]);
      }

      public function destroy($id)
      {
          $dato = Provider::findOrFail($id);
          $dato->delete();
          return response()->json([
              'message' => 'Proveedor se elimino con exito!'
          ]);
        }
    public function search($request)
    {
        $dato = Provider::where('nombre', 'ILIKE', '%'.$request.'%' )
                      ->orWhere('last_name', 'ILIKE', '%'.$request.'%' )
        ->get();
        return $this->showAll($dato,200);

      }
}
