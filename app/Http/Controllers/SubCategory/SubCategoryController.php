<?php

namespace App\Http\Controllers\SubCategory;

use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use App\SubCategory;

class SubCategoryController extends ApiController
{
  public function index()
  {
    $datos = SubCategory::join('category', 'category.cat_id', 'sub_category.cat_id')
                          ->select('sub_category.*', 'category.cat_descript')
                          ->get();

      return $this->showAll($datos,200);
  }

  public function store(Request $request)
  {
        $request->validate([
          'sub_cat_descrip' => 'required',
          'cat_id' => 'required',
    ]);
   $datos = new SubCategory($request->all());
   $datos->save();
    return response()->json('SubCategoria se agrego con exito!');
  }

  public function show($id)
  {
    //$dato = SubCategory::find( $id);
    $dato = SubCategory::where( 'sub_cat_id', '=', $id)
                              ->first();
    return $this->showOne($dato,200);
  }

  public function showSelect($id)
  {
    //$dato = SubCategory::find( $id);
    $dato = SubCategory::where( 'cat_id', '=', $id)
                              ->get();
    return $this->showAll($dato,200);
  }

  public function update(Request $request, $id)
  {
    $dato = SubCategory::findOrFail( $id);
          $request->validate([
            'sub_cat_descrip' => 'required',
            'cat_id' => 'required',

          ]);
          $dato->sub_cat_descrip = $request->sub_cat_descrip;
          $dato->cat_id = $request->cat_id;
          $dato->save();
          return response()->json([
              'message' => 'SubCategoria se actualizo con exito!',
              'dato' => $dato
          ]);
      }

      public function destroy($id)
      {
          $dato = SubCategory::findOrFail($id);
          $dato->delete();
          return response()->json([
              'message' => 'SubCategoria se elimino con exito!'
          ]);
        }
    public function search($request)
    {
        $dato = SubCategory::where('sub_cat_descrip', 'ILIKE', '%'.$request.'%' )
        ->get();
        return $this->showAll($dato,200);

      }
}
