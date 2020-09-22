<?php

namespace App\Http\Controllers\ProductTransfer;

use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use App\ProductTransfer;
use App\ProductTransferDetails;

class ProductTransferController extends ApiController
{
    public function index()
    {
      $datos = ProductTransfer::join('branch AS origin', 'origin.branch_id', 'prod_transfers.br_origin_id')
      ->join('branch AS destination', 'destination.branch_id', 'prod_transfers.br_destination_id')
      ->select('prod_transfers.*', 'origin.branch_descrip AS br_origin_descrip', 'destination.branch_descrip AS br_destination_descrip')
      ->get();
  
        return $this->showAll($datos,200);
    }
  
    public function ProductTransfersPerOrigin($request)
    {
      $datos = ProductTransfer::join('branch AS origin', 'origin.branch_id', 'prod_transfers.br_origin_id')
      ->join('branch AS destination', 'destination.branch_id', 'prod_transfers.br_destination_id')
      ->select('prod_transfers.*', 'origin.branch_descrip AS br_origin_descrip', 'destination.branch_descrip AS br_destination_descrip')
      ->where('prod_transfers.br_origin_id', '=', $request )
      ->get();
  
        return $this->showAll($datos,200);
    }
  
    public function ProductTransfersPerDestination($request)
    {
      $datos = ProductTransfer::join('branch AS origin', 'origin.branch_id', 'prod_transfers.br_origin_id')
      ->join('branch AS destination', 'destination.branch_id', 'prod_transfers.br_destination_id')
      ->select('prod_transfers.*', 'origin.branch_descrip AS br_origin_descrip', 'destination.branch_descrip AS br_destination_descrip')
      ->where('prod_transfers.br_destination_id', '=', $request )
      ->get();
  
        return $this->showAll($datos,200);
    }

    public function store(Request $request)
    {
          $request->validate([
            'br_origin_id' => 'required',
            'br_destination_id' => 'required',
            'transfer_date' => 'required',
            'state' => 'required',

            'product_id' => 'required',
            'pt_det_qty' => 'required',
            
      ]);

      /*
      "stock_min",
      "ProductTransfer_id", "branch_id",
      "district_descrip", "stock_qty"
      */

     $datos = new ProductTransfer([
       'br_origin_id' => $request->br_origin_id,
       'br_destination_id' => $request->br_destination_id,
       'transfer_date' => $request->transfer_date,
       'state' => $request->state,
       
     ]);
     $datos->save();
     $branch = Branch::all();
     foreach ($branch as $key => $value) {
       $stock = new Stock([
         'ProductTransfer_id' => $datos->ProductTransfer_id,
         'branch_id' => $value->branch_id,
         'stock_min' => $request->stock_min,
         'stock_qty' => 0
       ]);
       $stock->save();
     }
      return response()->json('ProductTransfero se agrego con exito!');
    }
  
    public function show($id)
    {
      //$dato = ProductTransfer::find( $id);
      $dato = ProductTransfer::where( 'ProductTransfer_id', '=', $id)
                                ->first();
      return $this->showOne($dato,200);
    }
    public function showSelect($id)
    {
      //$dato = ProductTransfer::find( $id);
      $dato = ProductTransfer::where( 'sub_cat_id', '=', $id)
                                ->get();
      return $this->showAll($dato,200);
    }
    public function update(Request $request, $id)
    {
      $dato = ProductTransfer::findOrFail( $id);
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
                'message' => 'ProductTransfero se actualizo con exito!',
                'dato' => $dato
            ]);
        }
  
        public function destroy($id)
        {
            $dato = ProductTransfer::findOrFail($id);
            $dato->delete();
            return response()->json([
                'message' => 'ProductTransfero se elimino con exito!'
            ]);
          }
      public function search($request)
      {
  
        $datos = ProductTransfer::join('sub_category', 'sub_category.sub_cat_id', 'ProductTransfer.sub_cat_id')
        ->join('category', 'category.cat_id', 'sub_category.cat_id')
        ->join('stock', 'stock.ProductTransfer_id', 'ProductTransfer.ProductTransfer_id')
        ->join('brand', 'brand.brand_id', 'ProductTransfer.brand_id')
        ->join('provider', 'provider.person_id', 'ProductTransfer.person_id')
        ->select('ProductTransfer.*', 'sub_category.sub_cat_descrip', 'category.cat_descript',
         'brand.brand_descrip', 'provider.business_name', 'stock.stock_min', 'stock.stock_qty')
        ->where([
          ['ProductTransfer.prod_descrip', 'ILIKE', '%'.$request.'%' ],
        ['stock.branch_id', '=', $_GET["branch"]]
        ] )
                              ->get();
  
          // $dato = ProductTransfer::where('prod_descrip', 'ILIKE', '%'.$request.'%' )
          // ->get();
          return $this->showAll($datos,200);
  
        }
}
