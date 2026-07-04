<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\NewsItem;
use App\Models\Project;
use App\Models\Service;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/dashboard', [
            'stats' => [
                'users' => User::count(),
                'admins' => User::role('admin')->count(),
                'news' => NewsItem::count(),
                'projects' => Project::count(),
                'services' => Service::count(),
            ],
            'recentUsers' => User::with('roles')
                ->latest()
                ->take(5)
                ->get()
                ->map(fn (User $user) => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'is_admin' => $user->hasRole('admin'),
                    'created_at' => $user->created_at,
                ]),
        ]);
    }
}
