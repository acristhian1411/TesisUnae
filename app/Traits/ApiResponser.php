<?php
namespace App\Traits;
//use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Validator;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
trait ApiResponser {

	private function successResponse($data, $code)
	{
		return response()->json($data, $code);
	}

	protected function errorResponse($message, $code)
	{
		return response()->json(['error' => $message, 'code' => $code], $code);
	}


    protected function showAll(Collection $collection, $code = 200)
	{
		if ($collection->isEmpty()) {
			return $this->successResponse(['data' => $collection], $code);
		}
		$transformer ="";
/* 		$transformer = $collection->first()->transformer;*/
		// $collection = $this->filterData($collection, $transformer);
		$collection = $this->sortData($collection, $transformer);
		$collection = $this->paginate($collection);
		$collection = $this->transformData($collection, $transformer);
		$collection = $this->cacheResponse($collection);

		return $this->successResponse($collection, $code);
	}
	protected function showOne(Model $instance, $code = 200)
	{
 		//$transformer = $instance->transformer;
		$transformer ="";
		$instance = $this->transformData($instance, $transformer);

		return $this->successResponse(['data' => $instance], $code);
	}
	protected function showMessage($message, $code = 200)
	{
		return $this->successResponse(['data' => $message], $code);
	}

	public function filterData(Builder $collection, $transformer)
	{
		$flag = 0;
//select * from "subjects" where "subj_code"::text ILIKE 'a' and "subjects"."deleted_at"...
		//$instance=$collection->getModel();
		$instance = $transformer->getAttributes();
		 //dd($instance);
		foreach (request()->query() as $query => $value) {
			//$attribute = $transformer::originalAttribute($query);
			//dd($instance->getAttributes());
			//if (property_exists($instance,$query)) {
			if (array_key_exists($query, $instance)) {
				$attribute = $query;
			} else { unset($attribute); }

			if (isset($attribute, $value)) {
				if ($flag == 0) {
					$flag = 1;
					$collection = $collection->where($attribute,'ILIKE','%'.$value.'%');
				}
				else {
					$collection = $collection->orWhere($attribute,'ILIKE','%'.$value.'%');

				}
				// $collection = $collection->where($attribute,'ILIKE',$value);
			}
		}

		return $collection;
	}

	protected function sortData(Collection $collection, $transformer)
	{
		if (request()->has('sort_by')) {
			$attribute = request()->sort_by;
			if(request()->order=='desc'){
				$collection = $collection->sortByDesc->{$attribute};
			}
			else{
				$collection = $collection->sortBy->{$attribute};
			}

		}
		return $collection;
	}

	protected function paginate(Collection $collection)
	{
		$rules = [
			'per_page' => 'integer|min:2|max:50'
		];

		Validator::validate(request()->all(), $rules);

		$page = LengthAwarePaginator::resolveCurrentPage();

		$perPage = 15;
		if (request()->has('per_page')) {
			$perPage = (int) request()->per_page;
		}
		//echo "per_page->".$perPage;
		$results = $collection->slice(($page - 1) * $perPage, $perPage)->values();

		$paginated = new LengthAwarePaginator($results, $collection->count(), $perPage, $page, [
			'path' => LengthAwarePaginator::resolveCurrentPath(),
		]);

		$paginated->appends(request()->all());

		return $paginated;
	}

	protected function transformData($data, $transformer)
	{
		//$transformation = fractal($data, new $transformer);
		$transformation = $data;
		return $transformation->toArray();
	}

	protected function cacheResponse($data)
	{
		$url = request()->url();
		$queryParams = request()->query();

		ksort($queryParams);

		$queryString = http_build_query($queryParams);

		$fullUrl = "{$url}?{$queryString}";

		return Cache::remember($fullUrl, 30/60, function() use($data) {
			return $data;
		});
	}
}
