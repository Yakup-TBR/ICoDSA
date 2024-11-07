<?php

use App\Http\Controllers\AboutUsController;
use App\Http\Controllers\AddressController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AuthorInformationController;
use App\Http\Controllers\CopyrightController;
use App\Http\Controllers\DocumentationController;
use App\Http\Controllers\DocumentationImageController;
use App\Http\Controllers\DocumentationLinkController;
use App\Http\Controllers\HomeButtonLinkController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\HomeHostLogoController;
use App\Http\Controllers\ImportantDateBgController;
use App\Http\Controllers\ImportantDateController;
use App\Http\Controllers\PaymentMethodController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\PricingController;
use App\Http\Controllers\ProgramCommitteeController;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\ReviewersController;
use App\Http\Controllers\SpeakerController;
use App\Http\Controllers\SponsoreController;
use App\Http\Controllers\SupportController;
use App\Http\Controllers\TopicsController;
use App\Http\Controllers\TutorialController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);
Route::middleware('auth:sanctum')->get('/dashboard', [AuthController::class, 'dashboard']);

Route::apiResource('posts', PostController::class);

Route::apiResource('homes', HomeController::class);
Route::post('homes/{home}/bg', [HomeController::class, 'uploadBg']);
Route::apiResource('host_host_logos', HomeHostLogoController::class);


Route::apiResource('abouts', AboutUsController::class);
Route::post('abouts/{about}/about_img', [AboutUsController::class, 'uploadImgAbout']);

Route::apiResource('speakers', SpeakerController::class);

Route::apiResource('tutorial', TutorialController::class);
Route::post('tutorial/{tutorial}/thumbail_img', [TutorialController::class, 'uploadThumbnailImg']);

Route::apiResource('important-dates', ImportantDateController::class);

Route::apiResource('important_date_bg', ImportantDateBgController::class);
Route::post('important_date_bg/{importantDateBg}/bg', [ImportantDateBgController::class, 'uploadBg']);

Route::apiResource('topics', TopicsController::class);

Route::apiResource('author-information', AuthorInformationController::class);

Route::apiResource('registration', RegistrationController::class);

Route::apiResource('program-committees', ProgramCommitteeController::class);

Route::post('/reviewers', [ReviewersController::class, 'store']);
Route::get('/reviewers', [ReviewersController::class, 'index']);

Route::apiResource('pricing', PricingController::class);


Route::apiResource('payment-methods', PaymentMethodController::class);
Route::put('payment-methods/{id}', [PaymentMethodController::class, 'update']);

Route::get('/articles', [ArticleController::class, 'index']);
Route::post('/articles', [ArticleController::class, 'store']);
Route::post('/articles/{id}', [ArticleController::class, 'update']);
Route::delete('/articles/{id}', [ArticleController::class, 'destroy']);


Route::apiResource('documentation-images', DocumentationImageController::class);
Route::post('documentation-links', [DocumentationLinkController::class, 'store']);
Route::get('documentation-links', [DocumentationLinkController::class, 'index']);

Route::apiResource('address', AddressController::class);

Route::apiResource('sponsored_by', SponsoreController::class);

Route::apiResource('supported_by', SupportController::class);

Route::get('/copyright', [CopyrightController::class, 'index']);
Route::post('/copyright', [CopyrightController::class, 'store']);
Route::put('/copyright', [CopyrightController::class, 'update']);

Route::get('button-links', [HomeButtonLinkController::class, 'index']);
Route::post('button-links', [HomeButtonLinkController::class, 'store']);
Route::put('button-links/{id}', [HomeButtonLinkController::class, 'update']);


