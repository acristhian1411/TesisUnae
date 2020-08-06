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
