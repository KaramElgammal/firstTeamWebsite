<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <style>
        body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 0; }
        .wrapper { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        .header { background: #7f1d1d; padding: 28px 32px; }
        .header h1 { color: #ffffff; margin: 0; font-size: 22px; letter-spacing: 2px; text-transform: uppercase; }
        .header p { color: #f3b8b1; margin: 6px 0 0; font-size: 13px; letter-spacing: 1px; }
        .badge { display: inline-block; margin-top: 10px; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; }
        .badge-ready { background: #dcfce7; color: #166534; }
        .badge-designer { background: #fef3c7; color: #92400e; }
        .body { padding: 32px; }
        .row { margin-bottom: 20px; }
        .label { font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; color: #888; margin-bottom: 4px; }
        .value { font-size: 15px; color: #222; }
        .details-box { background: #f9f9f9; border-left: 3px solid #7f1d1d; padding: 14px 18px; border-radius: 4px; font-size: 14px; color: #333; line-height: 1.7; white-space: pre-wrap; }
        .divider { border: none; border-top: 1px solid #eee; margin: 24px 0; }
        .section-title { font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; color: #7f1d1d; margin-bottom: 16px; }
        .attachment-note { background: #fff7ed; border: 1px solid #fed7aa; border-radius: 6px; padding: 10px 14px; font-size: 13px; color: #9a3412; }
        .footer { background: #f4f4f4; padding: 16px 32px; font-size: 11px; color: #aaa; text-align: center; }
    </style>
</head>
<body>
    <div class="wrapper">
        <div class="header">
            <h1>New Service Request</h1>
            <p>{{ $serviceName }}</p>
            @if($requestType === 'ready')
                <span class="badge badge-ready">Ready Design</span>
            @else
                <span class="badge badge-designer">Needs Designer</span>
            @endif
        </div>
        <div class="body">

            <div class="section-title">Client Information</div>

            <div class="row">
                <div class="label">Name</div>
                <div class="value">{{ $senderName }}</div>
            </div>
            <div class="row">
                <div class="label">Email</div>
                <div class="value">{{ $senderEmail }}</div>
            </div>
            <div class="row">
                <div class="label">Phone</div>
                <div class="value">{{ $senderPhone }}</div>
            </div>
            <div class="row">
                <div class="label">Service</div>
                <div class="value">{{ $serviceName }}</div>
            </div>

            <hr class="divider" />

            <div class="section-title">Project Details</div>

            <div class="row">
                <div class="label">Request Type</div>
                <div class="value">{{ $requestType === 'ready' ? 'Has a ready design / file' : 'Needs a designer' }}</div>
            </div>

            <div class="row">
                <div class="label">Description</div>
                <div class="details-box">{{ $details }}</div>
            </div>

            @if($requestType === 'designer' && $imageNote)
                <div class="row">
                    <div class="label">Reference Image Note</div>
                    <div class="details-box">{{ $imageNote }}</div>
                </div>
            @endif

            @if($fileName)
                <div class="row">
                    <div class="label">Attached File</div>
                    <div class="attachment-note">
                        📎 {{ $fileName }} — see attachment
                    </div>
                </div>
            @endif

        </div>
        <div class="footer">First Team &mdash; {{ date('Y') }}</div>
    </div>
</body>
</html>
