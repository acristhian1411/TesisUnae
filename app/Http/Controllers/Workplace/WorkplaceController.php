<?php

namespace App\Http\Controllers\Workplace;

use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use App\Workplace;

class WorkplaceController extends ApiController
{
  public function index()
  {
    $t = Workplace::query()->first();
    $query = Workplace::query();
    $query = $this->filterData($query, $t);
    $datos = $query->get();
      return $this->showAll($datos,200);
  }

  public function store(Request $request)
  {
        $request->validate([
          'description' => 'required',
          'address' => 'required',
        'telephone' => 'required',
    ]);
   $datos = new Workplace($request->all());
   $datos->save();
    return response()->json('Lugar de trabajo se agrego con exito!');
  }

  public function show($id)
  {
    //$dato = Workplace::find( $id);
    $dato = Workplace::where( 'wplace_id', '=', $id)
                              ->first();
    return $this->showOne($dato,200);
  }

  public function update(Request $request, $id)
  {
    $dato = Workplace::findOrFail( $id);
          $request->validate([
            'description' => 'required',
            'address' => 'required',
          'telephone' => 'required',
                  ]);
                  $dato->description = $request->description;
                  $dato->address = $request->address;
          $dato->telephone = $request->telephone;
          $dato->save();
          return response()->json([
              'message' => 'Lugar de trabajo se actualizo con exito!',
              'dato' => $dato
          ]);
      }

      public function destroy($id)
      {
          $dato = Workplace::findOrFail($id);
          $dato->delete();
          return response()->json([
              'message' => 'Lugar de trabajo se elimino con exito!'
          ]);
        }
    public function search($request)
    {
        $dato = Workplace::where('description', 'ILIKE', '%'.$request.'%' )
                        ->orWhere('telephone', 'ILIKE', '%'.$request.'%')
        ->get();
        return $this->showAll($dato,200);

      }
}
