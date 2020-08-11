<?php

namespace App\Http\Controllers\Brand;

use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use App\Brand;

class BrandController extends ApiController
{
  public function index()
  {
    $t = Brand::query()->first();
    $query = Brand::query();
    $query = $this->filterData($query, $t);
    $datos = $query->get();
      return $this->showAll($datos,200);
  }

  public function store(Request $request)
  {
        $request->validate([
        'brand_descrip' => 'required',
    ]);
   $datos = new Brand($request->all());
   $datos->save();
    return response()->json('Marca se agrego con exito!');
  }

  public function show($id)
  {
    //$dato = Brand::find( $id);
    $dato = Brand::where( 'brand_id', '=', $id)
                              ->first();
    return $this->showOne($dato,200);
  }

  public function update(Request $request, $id)
  {
    $dato = Brand::findOrFail( $id);
          $request->validate([
            'brand_descrip' => 'required',
          ]);
          $dato->brand_descrip = $request->brand_descrip;
          $dato->save();
          return response()->json([
              'message' => 'Marca se actualizo con exito!',
              'dato' => $dato
          ]);
      }

      public function destroy($id)
      {
          $dato = Brand::findOrFail($id);
          $dato->delete();
          return response()->json([
              'message' => 'Marca se elimino con exito!'
          ]);
        }
    public function search($request)
    {
        $dato = Brand::where('brand_descrip', 'ILIKE', '%'.$request.'%' )
        ->get();
        return $this->showAll($dato,200);

      }
}
