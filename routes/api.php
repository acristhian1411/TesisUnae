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
Route::get('subcategories/search/{req}', 'SubCategory\SubCategoryController@search');
Route::post('subcategories/', 'SubCategory\SubCategoryController@store');
Route::put('subcategories/{id}','SubCategory\SubCategoryController@update');
Route::delete('subcategories/{id}','SubCategory\SubCategoryController@destroy');
