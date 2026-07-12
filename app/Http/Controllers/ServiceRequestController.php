<?php

namespace App\Http\Controllers;

use App\Mail\ServiceRequestMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ServiceRequestController extends Controller
{
    public function send(Request $request)
    {
        $request->validate([
            'name'         => ['required', 'string', 'max:255'],
            'email'        => ['required', 'email', 'max:255'],
            'phone'        => ['required', 'string', 'max:30'],
            'service'      => ['required', 'string', 'max:255'],
            'request_type' => ['required', 'in:ready,designer'],
            'details'      => ['required', 'string', 'min:5', 'max:3000'],
            'files'        => ['nullable', 'array'],
            'files.*'      => ['file', 'max:51200'],
            'images'       => ['nullable', 'array'],
            'images.*'     => ['file', 'mimes:jpg,jpeg,png,gif,webp,svg', 'max:10240'],
            'image_note'   => ['nullable', 'string', 'max:1000'],
        ]);

        $attachmentsList = [];
        $imageNote = null;

        // ready design — attach the uploaded files
        if ($request->request_type === 'ready' && $request->hasFile('files')) {
            foreach ($request->file('files') as $uploadedFile) {
                $attachmentsList[] = [
                    'path' => $uploadedFile->getRealPath(),
                    'name' => $uploadedFile->getClientOriginalName(),
                ];
            }
        }

        // designer needed — attach the reference images
        if ($request->request_type === 'designer' && $request->hasFile('images')) {
            foreach ($request->file('images') as $uploadedImage) {
                $attachmentsList[] = [
                    'path' => $uploadedImage->getRealPath(),
                    'name' => $uploadedImage->getClientOriginalName(),
                ];
            }
            $imageNote = $request->image_note;
        }

        $adminEmail = config('mail.from.address');

        Mail::to($adminEmail)->send(
            new ServiceRequestMail(
                $request->name,
                $request->email,
                $request->phone,
                $request->service,
                $request->request_type,
                $request->details,
                $imageNote,
                $attachmentsList
            )
        );

        return back()->with('request_success', true);
    }
}
