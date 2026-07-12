<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ServiceRequestMail extends Mailable
{
    use Queueable, SerializesModels;

    public string  $senderName;
    public string  $senderEmail;
    public string  $senderPhone;
    public string  $serviceName;
    public string  $requestType;   // 'ready' | 'designer'
    public string  $details;
    public ?string $imageNote;
    public array $attachmentsList;

    public function __construct(
        string  $senderName,
        string  $senderEmail,
        string  $senderPhone,
        string  $serviceName,
        string  $requestType,
        string  $details,
        ?string $imageNote = null,
        array $attachmentsList = []
    ) {
        $this->senderName  = $senderName;
        $this->senderEmail = $senderEmail;
        $this->senderPhone = $senderPhone;
        $this->serviceName = $serviceName;
        $this->requestType = $requestType;
        $this->details     = $details;
        $this->imageNote   = $imageNote;
        $this->attachmentsList = $attachmentsList;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'New Service Request — First Team',
            replyTo: [$this->senderEmail],
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.service-request',
        );
    }

    public function attachments(): array
    {
        $mailAttachments = [];
        foreach ($this->attachmentsList as $file) {
            if (isset($file['path']) && file_exists($file['path'])) {
                $mailAttachments[] = Attachment::fromPath($file['path'])
                    ->as($file['name'] ?? basename($file['path']));
            }
        }
        return $mailAttachments;
    }
}
