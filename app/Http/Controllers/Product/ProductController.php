<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use App\Product;
use App\Stock;
use App\Branch;

class ProductController extends ApiController
{
  public function index()
  {
    $datos = Product::join('sub_category', 'sub_category.sub_cat_id', 'product.sub_cat_id')
    ->join('stock', 'stock.product_id', 'product.product_id')
    ->join('category', 'category.cat_id', 'sub_category.cat_id')
    ->join('brand', 'brand.brand_id', 'product.brand_id')
    ->join('provider', 'provider.person_id', 'product.person_id')
    ->select('product.*', 'sub_category.sub_cat_descrip', 'category.cat_descript',
     'brand.brand_descrip', 'provider.business_name', 'stock.stock_min', 'stock.stock_qty')
    ->get();

      return $this->showAll($datos,200);
  }

  public function productsPerBranch($request)
  {
    $datos = Product::join('sub_category', 'sub_category.sub_cat_id', 'product.sub_cat_id')
    ->join('stock', 'stock.product_id', 'product.product_id')
    ->join('category', 'category.cat_id', 'sub_category.cat_id')
    ->join('brand', 'brand.brand_id', 'product.brand_id')
    ->join('provider', 'provider.person_id', 'product.person_id')
    ->where('stock.branch_id', '=', $request )
    ->select('product.*', 'sub_category.sub_cat_descrip', 'category.cat_descript',
     'brand.brand_descrip', 'provider.business_name', 'stock.stock_min', 'stock.stock_qty')
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
    "product_id", "branch_id",
    "district_descrip", "stock_qty"
    */
   $datos = new Product([
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
       'product_id' => $datos->product_id,
       'branch_id' => $value->branch_id,
       'stock_min' => $request->stock_min,
       'stock_qty' => 0
     ]);
     $stock->save();
   }
    return response()->json('Producto se agrego con exito!');
  }

  public function show($id)
  {
    //$dato = Product::find( $id);
    $dato = Product::where( 'product_id', '=', $id)
                              ->first();
    return $this->showOne($dato,200);
  }
  public function showSelect($id)
  {
    //$dato = Product::find( $id);
    $dato = Product::where( 'sub_cat_id', '=', $id)
                              ->get();
    return $this->showAll($dato,200);
  }
  public function update(Request $request, $id)
  {
    $dato = Product::findOrFail( $id);
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
              'message' => 'Producto se actualizo con exito!',
              'dato' => $dato
          ]);
      }

      public function destroy($id)
      {
          $dato = Product::findOrFail($id);
          $dato->delete();
          return response()->json([
              'message' => 'Producto se elimino con exito!'
          ]);
        }
    public function search($request)
    {

      $datos = Product::join('sub_category', 'sub_category.sub_cat_id', 'product.sub_cat_id')
      ->join('category', 'category.cat_id', 'sub_category.cat_id')
      ->join('stock', 'stock.product_id', 'product.product_id')
      ->join('brand', 'brand.brand_id', 'product.brand_id')
      ->join('provider', 'provider.person_id', 'product.person_id')
      ->select('product.*', 'sub_category.sub_cat_descrip', 'category.cat_descript',
       'brand.brand_descrip', 'provider.business_name', 'stock.stock_min', 'stock.stock_qty')
      ->where([
        ['product.prod_descrip', 'ILIKE', '%'.$request.'%' ],
      ['stock.branch_id', '=', $_GET["branch"]]
      ] )
                            ->get();

        // $dato = Product::where('prod_descrip', 'ILIKE', '%'.$request.'%' )
        // ->get();
        return $this->showAll($datos,200);

      }
}
