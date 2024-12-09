<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        if ($request->user() && $request->user()->mobile === '1821702694') {
            return $next($request);
        }

        return response()->json(['message' => 'Unauthorized'], 403);
    }
}