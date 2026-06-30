<!DOCTYPE html>
<html>
<head>
    <title>New Contact Message</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #171110; color: #ffffff; padding: 20px; margin: 0;">
    <div style="max-width: 560px; margin: 0 auto; background-color: #251c1a; padding: 30px; border-radius: 10px; border: 1px solid rgba(243,184,177,0.2);">
        <h2 style="color: #f3b8b1; margin-top: 0;">New Contact Message — First Team</h2>
        <p style="color: #a39997; font-size: 14px; margin-bottom: 24px;">You received a new message through your website contact form.</p>

        <table style="width: 100%; border-collapse: collapse;">
            <tr>
                <td style="padding: 10px 0; color: #a39997; font-size: 13px; width: 110px; vertical-align: top;">From:</td>
                <td style="padding: 10px 0; color: #ffffff; font-size: 14px;">{{ $senderEmail }}</td>
            </tr>
            <tr>
                <td colspan="2" style="border-top: 1px solid rgba(243,184,177,0.15);"></td>
            </tr>
            <tr>
                <td style="padding: 10px 0; color: #a39997; font-size: 13px; vertical-align: top;">Message:</td>
                <td style="padding: 10px 0; color: #ffffff; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">{{ $senderMessage }}</td>
            </tr>
        </table>

        <p style="color: #a39997; font-size: 12px; margin-top: 30px; border-top: 1px solid rgba(243,184,177,0.15); padding-top: 16px;">
            Reply directly to this email to respond to the sender.
        </p>
    </div>
</body>
</html>
