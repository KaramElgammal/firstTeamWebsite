<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\ServiceRequestController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/lang/{locale}', function ($locale) {
    if (in_array($locale, ['en', 'ar'])) {
        session()->put('locale', $locale);
    }
    return redirect()->back();
})->name('lang.switch');

Route::get('/projects', function () {
    return Inertia::render('projects');
})->name('projects');

Route::get('/contact', function () {
    return Inertia::render('contact');
})->name('contact');

Route::post('/contact', [ContactController::class, 'send'])->name('contact.send');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('services', function () {
        return Inertia::render('services');
    })->name('services');

    Route::get('service-request', function () {
        return Inertia::render('service-request');
    })->name('service-request');

    Route::post('service-request', [ServiceRequestController::class, 'send'])->name('service-request.send');

    Route::get('3d-request', function () {
        return Inertia::render('3d-request');
    })->name('3d-request');

    Route::post('3d-request', [ServiceRequestController::class, 'send'])->name('3d-request.send');

    Route::get('robotics-request', function () {
        return Inertia::render('robotics-request');
    })->name('robotics-request');

    Route::post('robotics-request', [ServiceRequestController::class, 'send'])->name('robotics-request.send');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
