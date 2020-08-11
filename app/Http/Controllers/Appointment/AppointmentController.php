<?php

namespace App\Http\Controllers\Appointment;

use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use App\Appointment;

class AppointmentController extends ApiController
{
  public function index()
  {
    $t = Appointment::query()->first();
    $query = Appointment::query();
    $query = $this->filterData($query, $t);
    $datos = $query->get();
      return $this->showAll($datos,200);
  }

  public function store(Request $request)
  {
        $request->validate([
        'appoin_description' => 'required',
    ]);
   $datos = new Appointment($request->all());
   $datos->save();
    return response()->json('Cargo se agrego con exito!');
  }

  public function show($id)
  {
    //$dato = Appointment::find( $id);
    $dato = Appointment::where( 'appoin_id', '=', $id)
                              ->first();
    return $this->showOne($dato,200);
  }

  public function update(Request $request, $id)
  {
    $dato = Appointment::findOrFail( $id);
          $request->validate([
            'appoin_description' => 'required',
          ]);
          $dato->appoin_description = $request->appoin_description;
          $dato->save();
          return response()->json([
              'message' => 'Cargo se actualizo con exito!',
              'dato' => $dato
          ]);
      }

      public function destroy($id)
      {
          $dato = Appointment::findOrFail($id);
          $dato->delete();
          return response()->json([
              'message' => 'Cargo se elimino con exito!'
          ]);
        }
    public function search($request)
    {
        $dato = Appointment::where('appoin_description', '=', $request )
        ->get();
        return $this->showAll($dato,200);

      }
}
