<?php

namespace App\Http\Controllers;

use App\Mail\ContactMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function send(Request $request)
    {
        $request->validate([
            'email'   => ['required', 'email', 'max:255'],
            'message' => ['required', 'string', 'min:10', 'max:2000'],
        ]);

        $adminEmail = config('mail.from.address');

        Mail::to($adminEmail)->send(
            new ContactMail($request->email, $request->message)
        );

        return back()->with('contact_success', true);
    }
}
