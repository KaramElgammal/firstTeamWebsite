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
            'file'         => ['nullable', 'file', 'max:51200'],
            'image'        => ['nullable', 'file', 'mimes:jpg,jpeg,png,gif,webp,svg', 'max:10240'],
            'image_note'   => ['nullable', 'string', 'max:1000'],
        ]);

        $filePath  = null;
        $fileName  = null;
        $imageNote = null;

        // ready design — attach the uploaded file
        if ($request->request_type === 'ready' && $request->hasFile('file')) {
            $uploadedFile = $request->file('file');
            $filePath     = $uploadedFile->getRealPath();
            $fileName     = $uploadedFile->getClientOriginalName();
        }

        // designer needed — attach the reference image
        if ($request->request_type === 'designer' && $request->hasFile('image')) {
            $uploadedImage = $request->file('image');
            $filePath      = $uploadedImage->getRealPath();
            $fileName      = $uploadedImage->getClientOriginalName();
            $imageNote     = $request->image_note;
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
                $filePath,
                $fileName,
                $imageNote
            )
        );

        return back()->with('request_success', true);
    }
}
