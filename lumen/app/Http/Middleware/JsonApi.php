<?php
namespace App\Http\Middleware;

use Closure;

class JsonApi
{
    const PARSED_METHODS = [
        'POST', 'PUT', 'PATCH'
    ];

    public function handle($request, Closure $next)
    {
        if (in_array($request->getMethod(), self::PARSED_METHODS))
        {
            $request->merge((array)json_decode($request->getContent()));
        }

        return $next($request);
    }
}