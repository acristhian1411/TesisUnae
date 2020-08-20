<?php

namespace App\Http\Controllers\BuyDetails;

use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use App\Buy;
use App\BuyDetails;

class BuyDetailsController extends ApiController
{
  public function index()
  {
    $datos = BuyDetails::join('buys', 'buys.buy_id', 'buy_details.buy_id')
    ->join('product', 'product.product_id', 'buy_details.product_id')
    ->select('buy_details.*', 'product.prod_descrip')
    ->get();

      return $this->showAll($datos,200);
  }

  public function BuyDetailsPerBuy($request)
  {
    $datos = BuyDetails::join('buys', 'buys.buy_id', 'buy_details.buy_id')
    ->join('product', 'product.product_id', 'buy_details.product_id')
    ->select('buy_details.*', 'product.prod_descrip')
    ->where('buy_details.buy_id', '=', $request )

    ->get();

      return $this->showAll($datos,200);
  }

  public function store(Request $request)
  {
        $request->validate([
          'prod_descrip' => 'required',
          'sub_cat_id' => 'required',
          'person_id' => 'required',
          'prod_iva' => 'required',
          'prod_sale_price' => 'required',
          'stock_min' => 'required',
          'brand_id' => 'required',
    ]);
    /*

    "stock_min",
    "Buy_id", "branch_id",
    "district_descrip", "stock_qty"
    */
   $datos = new Buy([
     'prod_descrip' => $request->prod_descrip,
     'sub_cat_id' => $request->sub_cat_id,
     'person_id' => $request->person_id,
     'brand_id' => $request->brand_id,
     'prod_iva' => $request->prod_iva,
     'prod_sale_price' => $request->prod_sale_price
   ]);
   $datos->save();
   $branch = Branch::all();
   foreach ($branch as $key => $value) {
     $stock = new Stock([
       'Buy_id' => $datos->Buy_id,
       'branch_id' => $value->branch_id,
       'stock_min' => $request->stock_min,
       'stock_qty' => 0
     ]);
     $stock->save();
   }
    return response()->json('Buyo se agrego con exito!');
  }

  public function show($id)
  {
    //$dato = Buy::find( $id);
    $dato = Buy::where( 'Buy_id', '=', $id)
                              ->first();
    return $this->showOne($dato,200);
  }
  public function showSelect($id)
  {
    //$dato = Buy::find( $id);
    $dato = Buy::where( 'sub_cat_id', '=', $id)
                              ->get();
    return $this->showAll($dato,200);
  }
  public function update(Request $request, $id)
  {
    $dato = Buy::findOrFail( $id);
          $request->validate([
            'prod_descrip' => 'required',
            'sub_cat_id' => 'required',
            'brand_id' => 'required',
            'person_id' => 'required',
            'prod_iva' => 'required',
            'prod_sale_price' => 'required',

          ]);
          $dato->prod_descrip = $request->prod_descrip;
          $dato->brand_id = $request->brand_id;
          $dato->person_id = $request->person_id;
          $dato->prod_iva = $request->prod_iva;
          $dato->sub_cat_id = $request->sub_cat_id;
          $dato->prod_sale_price = $request->prod_sale_price;
          $dato->save();
          return response()->json([
              'message' => 'Buyo se actualizo con exito!',
              'dato' => $dato
          ]);
      }

      public function destroy($id)
      {
          $dato = Buy::findOrFail($id);
          $dato->delete();
          return response()->json([
              'message' => 'Buyo se elimino con exito!'
          ]);
        }
    public function search($request)
    {

      $datos = Buy::join('sub_category', 'sub_category.sub_cat_id', 'Buy.sub_cat_id')
      ->join('category', 'category.cat_id', 'sub_category.cat_id')
      ->join('stock', 'stock.Buy_id', 'Buy.Buy_id')
      ->join('brand', 'brand.brand_id', 'Buy.brand_id')
      ->join('provider', 'provider.person_id', 'Buy.person_id')
      ->select('Buy.*', 'sub_category.sub_cat_descrip', 'category.cat_descript',
       'brand.brand_descrip', 'provider.business_name', 'stock.stock_min', 'stock.stock_qty')
      ->where([
        ['Buy.prod_descrip', 'ILIKE', '%'.$request.'%' ],
      ['stock.branch_id', '=', $_GET["branch"]]
      ] )
                            ->get();

        // $dato = Buy::where('prod_descrip', 'ILIKE', '%'.$request.'%' )
        // ->get();
        return $this->showAll($datos,200);

      }
}
