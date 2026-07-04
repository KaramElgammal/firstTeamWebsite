<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\NewsItem;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class NewsController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/news/index', [
            'items' => NewsItem::orderBy('sort_order')->orderByDesc('id')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $this->validated($request);

        $validated['images'] = $this->storeImages($request);

        NewsItem::create($validated);

        return back()->with('success', 'News item created successfully.');
    }

    public function update(Request $request, NewsItem $newsItem): RedirectResponse
    {
        $validated = $this->validated($request);

        if ($request->hasFile('images')) {
            $this->deleteImages($newsItem->images);
            $validated['images'] = $this->storeImages($request);
        } else {
            $validated['images'] = $newsItem->images;
        }

        $newsItem->update($validated);

        return back()->with('success', 'News item updated successfully.');
    }

    public function destroy(NewsItem $newsItem): RedirectResponse
    {
        $this->deleteImages($newsItem->images);
        $newsItem->delete();

        return back()->with('success', 'News item deleted successfully.');
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'tag_en' => ['nullable', 'string', 'max:255'],
            'tag_ar' => ['nullable', 'string', 'max:255'],
            'date' => ['nullable', 'string', 'max:255'],
            'title_en' => ['required', 'string', 'max:255'],
            'title_ar' => ['required', 'string', 'max:255'],
            'body_en' => ['required', 'string'],
            'body_ar' => ['required', 'string'],
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
            $paths[] = '/storage/'.$file->store('news', 'public');
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
