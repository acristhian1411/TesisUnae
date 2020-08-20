<?php

namespace App\Http\Controllers\Stock;

use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use App\Stock;
use App\Branch;

class StockController extends ApiController
{
  public function index()
  {
    $datos = Stock::all();

      return $this->showAll($datos,200);
  }

  public function store(Request $request)
  {

    $branch= Branch::all();
    $product_id = $request->product_id;
    $sems_name = '';
    // $nro_sems = 1;
    $nro_year = 1;
    for ($nro_sems=1; $nro_sems <= $career->career_semsqity;) {
      for ($j=0; $j < 2 && $nro_sems <= $career->career_semsqity; $j++) {
        $sems_name = $nro_year.'° '.$nro_sems.'° '.$career->career_name;
        $dato = new Semester([
          'sems_name' => $sems_name,
          'career_id' => $request->career_id,
          'sems_year' => $sems_year,
        ]);
        $nro_sems++;
        $dato->save();
      }
      $nro_year++;
    }

   $datos = new Stock($request->all());
   $datos->save();
    return response()->json('Barrio se agrego con exito!');
  }

  public function show($id)
  {
    //$dato = Stock::find( $id);
    $dato = Stock::where( 'Stock_id', '=', $id)
                              ->first();
    return $this->showOne($dato,200);
  }
  public function showSelect($id)
  {
    //$dato = Stock::find( $id);
    $dato = Stock::where( 'city_id', '=', $id)
                              ->get();
    return $this->showAll($dato,200);
  }
  public function update(Request $request, $id)
  {
    $dato = Stock::findOrFail( $id);
          $request->validate([
            'Stock_descrip' => 'required',
            'city_id' => 'required',

          ]);
          $dato->Stock_descrip = $request->Stock_descrip;
          $dato->city_id = $request->city_id;
          $dato->save();
          return response()->json([
              'message' => 'Barrio se actualizo con exito!',
              'dato' => $dato
          ]);
      }

      public function destroy($id)
      {
          $dato = Stock::findOrFail($id);
          $dato->delete();
          return response()->json([
              'message' => 'Barrio se elimino con exito!'
          ]);
        }
    public function search($request)
    {
        $dato = Stock::where('Stock_descrip', 'ILIKE', '%'.$request.'%' )
        ->get();
        return $this->showAll($dato,200);

      }
}
