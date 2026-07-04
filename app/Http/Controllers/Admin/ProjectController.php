<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/projects/index', [
            'items' => Project::orderBy('sort_order')->orderByDesc('id')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $this->validated($request);

        $validated['images'] = $this->storeImages($request);

        Project::create($validated);

        return back()->with('success', 'Project created successfully.');
    }

    public function update(Request $request, Project $project): RedirectResponse
    {
        $validated = $this->validated($request);

        if ($request->hasFile('images')) {
            $this->deleteImages($project->images);
            $validated['images'] = $this->storeImages($request);
        } else {
            $validated['images'] = $project->images;
        }

        $project->update($validated);

        return back()->with('success', 'Project updated successfully.');
    }

    public function destroy(Project $project): RedirectResponse
    {
        $this->deleteImages($project->images);
        $project->delete();

        return back()->with('success', 'Project deleted successfully.');
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'name_en' => ['required', 'string', 'max:255'],
            'name_ar' => ['required', 'string', 'max:255'],
            'description_en' => ['required', 'string'],
            'description_ar' => ['required', 'string'],
            'sort_order' => ['nullable', 'integer'],
        ]);
    }

    private function storeImages(Request $request): ?array
    {
        if (! $request->hasFile('images')) {
            return null;
        }

        $paths = [];
        foreach ($request->file('images') as $file) {
            $paths[] = '/storage/'.$file->store('projects', 'public');
        }

        return $paths;
    }

    private function deleteImages(?array $images): void
    {
        if (! $images) {
            return;
        }

        foreach ($images as $image) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $image));
        }
    }
}
