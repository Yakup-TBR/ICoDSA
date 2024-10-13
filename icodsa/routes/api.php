<?php

use App\Http\Controllers\AboutUsController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\HomeHostLogoController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\SpeakerController;
use App\Http\Controllers\TutorialController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('posts', PostController::class);

Route::apiResource('homes', HomeController::class);
Route::post('homes/{home}/bg', [HomeController::class, 'uploadBg']);
Route::apiResource('host_host_logos', HomeHostLogoController::class);


Route::apiResource('abouts', AboutUsController::class);
Route::post('abouts/{about}/about_img', [AboutUsController::class, 'uploadImgAbout']);

Route::apiResource('speakers', SpeakerController::class);


Route::apiResource('tutorial', TutorialController::class);
Route::post('tutorial/{tutorial}/thumbail_img', [TutorialController::class, 'uploadThumbnailImg']);







