<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\Events\Registered;
use Carbon\Carbon;
use App\Mail\OtpMail;
use Illuminate\Support\Facades\Mail;

class OtpController extends Controller
{
    public function show(Request $request)
    {
        $email = session('email') ?? $request->query('email');

        if (!$email) {
            return redirect()->route('register');
        }

        return Inertia::render('auth/otp-verify', [
            'email' => $email
        ]);
    }

    public function verify(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
            'otp' => 'required|string|size:6'
        ]);

        $user = User::where('email', $request->email)->first();

        if ($user->otp_code !== $request->otp) {
            return back()->withErrors(['otp' => 'Invalid OTP code.']);
        }

        if (Carbon::now()->greaterThan($user->otp_expires_at)) {
            return back()->withErrors(['otp' => 'OTP has expired. Please request a new one.']);
        }

        // Verify user
        $user->update([
            'otp_code' => null,
            'otp_expires_at' => null,
            'email_verified_at' => Carbon::now()
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect()->route('dashboard');
    }

    public function resend(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
        ]);

        $user = User::where('email', $request->email)->first();
        
        if ($user->email_verified_at) {
            return response()->json(['message' => 'User is already verified.'], 400);
        }

        $otpCode = str_pad(rand(0, 999999), 6, '0', STR_PAD_LEFT);
        
        $user->update([
            'otp_code' => $otpCode,
            'otp_expires_at' => Carbon::now()->addMinutes(3),
        ]);

        Mail::to($user->email)->send(new OtpMail($otpCode));

        return response()->json(['message' => 'OTP resent successfully.']);
    }
}
