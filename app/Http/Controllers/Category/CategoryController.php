<?php

namespace App\Http\Controllers\Category;

use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use App\Category;

class CategoryController extends ApiController
{
  public function index()
  {
    $t = Category::query()->first();
    $query = Category::query();
    $query = $this->filterData($query, $t);
    $datos = $query->get();
      return $this->showAll($datos,200);
  }

  public function store(Request $request)
  {
        $request->validate([
        'cat_descript' => 'required',
    ]);
   $datos = new Category($request->all());
   $datos->save();
    return response()->json('Categoria se agrego con exito!');
  }

  public function show($id)
  {
    //$dato = Category::find( $id);
    $dato = Category::where( 'cat_id', '=', $id)
                              ->first();
    return $this->showOne($dato,200);
  }

  public function update(Request $request, $id)
  {
    $dato = Category::findOrFail( $id);
          $request->validate([
            'cat_descript' => 'required',
          ]);
          $dato->cat_descript = $request->cat_descript;
          $dato->save();
          return response()->json([
              'message' => 'Categoria se actualizo con exito!',
              'dato' => $dato
          ]);
      }

      public function destroy($id)
      {
          $dato = Category::findOrFail($id);
          $dato->delete();
          return response()->json([
              'message' => 'Categoria se elimino con exito!'
          ]);
        }
    public function search($request)
    {
        $dato = Category::where('cat_descript', 'ILIKE', '%'.$request.'%' )
        ->get();
        return $this->showAll($dato,200);

      }
}
