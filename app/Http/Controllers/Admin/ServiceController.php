<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route as RouteFacade;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{
    public function index(): Response
    {
        $requestRoutes = collect(RouteFacade::getRoutes()->getRoutesByName())
            ->filter(fn ($route, $name) => str_ends_with($name, '-request') && in_array('GET', $route->methods()))
            ->keys()
            ->values()
            ->all();

        return Inertia::render('admin/services/index', [
            'items' => Service::orderBy('sort_order')->orderByDesc('id')->get(),
            'requestRoutes' => $requestRoutes,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $this->validated($request);

        if ($request->hasFile('image')) {
            $validated['image'] = '/storage/'.$request->file('image')->store('services', 'public');
        }

        Service::create($validated);

        return back()->with('success', 'Service created successfully.');
    }

    public function update(Request $request, Service $service): RedirectResponse
    {
        $validated = $this->validated($request);

        if ($request->hasFile('image')) {
            if ($service->image) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $service->image));
            }
            $validated['image'] = '/storage/'.$request->file('image')->store('services', 'public');
        } else {
            $validated['image'] = $service->image;
        }

        $service->update($validated);

        return back()->with('success', 'Service updated successfully.');
    }

    public function destroy(Service $service): RedirectResponse
    {
        if ($service->image) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $service->image));
        }

        $service->delete();

        return back()->with('success', 'Service deleted successfully.');
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'icon' => ['required', 'string', 'max:255'],
            'title_en' => ['required', 'string', 'max:255'],
            'title_ar' => ['required', 'string', 'max:255'],
            'description_en' => ['required', 'string'],
            'description_ar' => ['required', 'string'],
            'request_route' => ['required', 'string', 'max:255'],
            'sort_order' => ['nullable', 'integer'],
        ]);
    }
}
