<?php

namespace App\Http\Controllers\Branch;

use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use App\Branch;

class BranchController extends ApiController
{
  public function index()
  {
    $t = Branch::query()->first();
    $query = Branch::query();
    $query = $this->filterData($query, $t);
    $datos = $query->get();
      return $this->showAll($datos,200);
  }

  public function store(Request $request)
  {
        $request->validate([
          'branch_descrip' => 'required',
        'brand_address' => 'required',
    ]);
   $datos = new Branch($request->all());
   $datos->save();
    return response()->json('Sucursal se agrego con exito!');
  }

  public function show($id)
  {
    //$dato = Branch::find( $id);
    $dato = Branch::where( 'branch_id', '=', $id)
                              ->first();
    return $this->showOne($dato,200);
  }

  public function update(Request $request, $id)
  {
    $dato = Branch::findOrFail( $id);
          $request->validate([
            'branch_descrip' => 'required',
            'brand_address' => 'required',
          ]);
          $dato->branch_descrip = $request->branch_descrip;
          $dato->brand_address = $request->brand_address;
          $dato->save();
          return response()->json([
              'message' => 'Sucursal se actualizo con exito!',
              'dato' => $dato
          ]);
      }

      public function destroy($id)
      {
          $dato = Branch::findOrFail($id);
          $dato->delete();
          return response()->json([
              'message' => 'Sucursal se elimino con exito!'
          ]);
        }
    public function search($request)
    {
        $dato = Branch::where('branch_descrip', 'ILIKE', '%'.$request.'%' )
        ->get();
        return $this->showAll($dato,200);

      }
}
