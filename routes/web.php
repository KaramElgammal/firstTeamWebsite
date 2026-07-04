<?php

use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\NewsController as AdminNewsController;
use App\Http\Controllers\Admin\ProjectController as AdminProjectController;
use App\Http\Controllers\Admin\ServiceController as AdminServiceController;
use App\Http\Controllers\Admin\UserController as AdminUserController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ServiceRequestController;
use App\Models\NewsItem;
use App\Models\Project;
use App\Models\Service;
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
    return Inertia::render('projects', [
        'projects' => Project::orderBy('sort_order')->orderByDesc('id')->get(),
    ]);
})->name('projects');

Route::get('/news', function () {
    return Inertia::render('news', [
        'newsItems' => NewsItem::orderBy('sort_order')->orderByDesc('id')->get(),
    ]);
})->name('news');

Route::get('/contact', function () {
    return Inertia::render('contact');
})->name('contact');

Route::post('/contact', [ContactController::class, 'send'])->name('contact.send');

Route::get('/sitemap.xml', function () {
    $urls = [
        // Homepage — highest priority
        [
            'loc' => route('home'),
            'lastmod' => now()->toDateString(),
            'changefreq' => 'weekly',
            'priority' => '1.0',
        ],
        // Projects page
        [
            'loc' => route('projects'),
            'lastmod' => Project::max('updated_at')
                ? \Carbon\Carbon::parse(Project::max('updated_at'))->toDateString()
                : now()->toDateString(),
            'changefreq' => 'weekly',
            'priority' => '0.9',
        ],
        // News page
        [
            'loc' => route('news'),
            'lastmod' => NewsItem::max('updated_at')
                ? \Carbon\Carbon::parse(NewsItem::max('updated_at'))->toDateString()
                : now()->toDateString(),
            'changefreq' => 'daily',
            'priority' => '0.9',
        ],
        // Contact page
        [
            'loc' => route('contact'),
            'lastmod' => now()->toDateString(),
            'changefreq' => 'monthly',
            'priority' => '0.7',
        ],
    ];

    $xml = view('sitemap', ['urls' => $urls])->render();

    return response($xml, 200)->header('Content-Type', 'text/xml');
})->name('sitemap');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('services', function () {
        return Inertia::render('services', [
            'services' => Service::orderBy('sort_order')->orderByDesc('id')->get(),
        ]);
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

Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [AdminDashboardController::class, 'index'])->name('dashboard');

    Route::get('/users', [AdminUserController::class, 'index'])->name('users.index');
    Route::post('/users', [AdminUserController::class, 'store'])->name('users.store');
    Route::put('/users/{user}', [AdminUserController::class, 'update'])->name('users.update');
    Route::delete('/users/{user}', [AdminUserController::class, 'destroy'])->name('users.destroy');

    Route::get('/news', [AdminNewsController::class, 'index'])->name('news.index');
    Route::post('/news', [AdminNewsController::class, 'store'])->name('news.store');
    Route::put('/news/{newsItem}', [AdminNewsController::class, 'update'])->name('news.update');
    Route::delete('/news/{newsItem}', [AdminNewsController::class, 'destroy'])->name('news.destroy');

    Route::get('/projects', [AdminProjectController::class, 'index'])->name('projects.index');
    Route::post('/projects', [AdminProjectController::class, 'store'])->name('projects.store');
    Route::put('/projects/{project}', [AdminProjectController::class, 'update'])->name('projects.update');
    Route::delete('/projects/{project}', [AdminProjectController::class, 'destroy'])->name('projects.destroy');

    Route::get('/services', [AdminServiceController::class, 'index'])->name('services.index');
    Route::post('/services', [AdminServiceController::class, 'store'])->name('services.store');
    Route::put('/services/{service}', [AdminServiceController::class, 'update'])->name('services.update');
    Route::delete('/services/{service}', [AdminServiceController::class, 'destroy'])->name('services.destroy');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
