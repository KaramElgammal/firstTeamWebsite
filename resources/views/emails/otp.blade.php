<!DOCTYPE html>
<html>
<head>
    <title>OTP Verification</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #171110; color: #ffffff; padding: 20px;">
    <div style="max-w-md mx-auto; background-color: #251c1a; padding: 30px; border-radius: 10px; text-align: center; border: 1px solid #f3b8b1;">
        <h2 style="color: #f3b8b1;">First Team Verification</h2>
        <p>Hello,</p>
        <p>Your One-Time Password (OTP) for verification is:</p>
        <div style="font-size: 32px; font-weight: bold; margin: 20px 0; letter-spacing: 5px; color: #ffffff;">
            {{ $otp }}
        </div>
        <p>This code will expire in exactly 3 minutes.</p>
        <p style="color: #a39997; font-size: 12px; margin-top: 30px;">If you did not request this code, please ignore this email.</p>
    </div>
</body>
</html>
