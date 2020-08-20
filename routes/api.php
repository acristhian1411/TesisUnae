<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
//rutas de Compras
Route::get('buys/', 'Buy\BuyController@index');
Route::get('buys/{id}', 'Buy\BuyController@show');
Route::get('buys/search/{req}', 'Buy\BuyController@search');
Route::post('buys/', 'Buy\BuyController@store');
Route::put('buys/{id}','Buy\BuyController@update');
Route::delete('buys/{id}','Buy\BuyController@destroy');

//rutas de Detalles de Compras
Route::get('buy_details/', 'BuyDetails\BuyDetailsController@index');
Route::get('buy_details/{id}', 'BuyDetails\BuyDetailsController@show');
Route::get('buy_details-per-buy/{id}', 'BuyDetails\BuyDetailsController@BuyDetailsPerBuy');
Route::get('buy_details/search/{req}', 'BuyDetails\BuyDetailsController@search');
Route::post('buy_details/', 'BuyDetails\BuyDetailsController@store');
Route::put('buy_details/{id}','BuyDetails\BuyDetailsController@update');
Route::delete('buy_details/{id}','BuyDetails\BuyDetailsController@destroy');

//rutas de Sucursales
Route::get('branches/', 'Branch\BranchController@index');
Route::get('branches/{id}', 'Branch\BranchController@show');
Route::get('branches/search/{req}', 'Branch\BranchController@search');
Route::post('branches/', 'Branch\BranchController@store');
Route::put('branches/{id}','Branch\BranchController@update');
Route::delete('branches/{id}','Branch\BranchController@destroy');

//rutas de Productos
Route::get('products/', 'Product\ProductController@index');
Route::get('products-stock/{id}', 'Product\ProductController@productsPerBranch');
Route::get('products/{id}', 'Product\ProductController@show');
Route::get('products/search/{req}', 'Product\ProductController@search');
Route::post('products/', 'Product\ProductController@store');
Route::put('products/{id}','Product\ProductController@update');
Route::delete('products/{id}','Product\ProductController@destroy');

//rutas de Cargos
Route::get('appointments/', 'Appointment\AppointmentController@index');
Route::get('appointments/{id}', 'Appointment\AppointmentController@show');
Route::get('appointments/search/{req}', 'Appointment\AppointmentController@search');
Route::post('appointments/', 'Appointment\AppointmentController@store');
Route::put('appointments/{id}','Appointment\AppointmentController@update');
Route::delete('appointments/{id}','Appointment\AppointmentController@destroy');

//rutas de Marcas
Route::get('brands/', 'Brand\BrandController@index');
Route::get('brands/{id}', 'Brand\BrandController@show');
Route::get('brands/search/{req}', 'Brand\BrandController@search');
Route::post('brands/', 'Brand\BrandController@store');
Route::put('brands/{id}','Brand\BrandController@update');
Route::delete('brands/{id}','Brand\BrandController@destroy');

//rutas de Categorias
Route::get('categories/', 'Category\CategoryController@index');
Route::get('categories/{id}', 'Category\CategoryController@show');
Route::get('categories/search/{req}', 'Category\CategoryController@search');
Route::post('categories/', 'Category\CategoryController@store');
Route::put('categories/{id}','Category\CategoryController@update');
Route::delete('categories/{id}','Category\CategoryController@destroy');

//rutas de SubCategorias
Route::get('subcategories/', 'SubCategory\SubCategoryController@index');
Route::get('subcategories/{id}', 'SubCategory\SubCategoryController@show');
Route::get('subcategories/select/{id}', 'SubCategory\SubCategoryController@showSelect');
Route::get('subcategories/search/{req}', 'SubCategory\SubCategoryController@search');
Route::post('subcategories/', 'SubCategory\SubCategoryController@store');
Route::put('subcategories/{id}','SubCategory\SubCategoryController@update');
Route::delete('subcategories/{id}','SubCategory\SubCategoryController@destroy');

//rutas de Proveedores
Route::get('providers/', 'Provider\ProviderController@index');
Route::get('providers/{id}', 'Provider\ProviderController@show');
Route::get('providers/search/{req}', 'Provider\ProviderController@search');
Route::post('providers/', 'Provider\ProviderController@store');
Route::put('providers/{id}','Provider\ProviderController@update');
Route::delete('providers/{id}','Provider\ProviderController@destroy');

//rutas de Ciudades
Route::get('cities/', 'City\CityController@index');
Route::get('cities/{id}', 'City\CityController@show');
Route::get('cities/search/{req}', 'City\CityController@search');
Route::post('cities/', 'City\CityController@store');
Route::put('cities/{id}','City\CityController@update');
Route::delete('cities/{id}','City\CityController@destroy');

//rutas de Barrios
Route::get('districts/', 'District\DistrictController@index');
Route::get('districts/{id}', 'District\DistrictController@show');
Route::get('districts/select/{id}', 'District\DistrictController@showSelect');
Route::get('districts/search/{req}', 'District\DistrictController@search');
Route::post('districts/', 'District\DistrictController@store');
Route::put('districts/{id}','District\DistrictController@update');
Route::delete('districts/{id}','District\DistrictController@destroy');
