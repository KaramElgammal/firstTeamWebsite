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
    public ?string $filePath;
    public ?string $fileName;
    public ?string $imageNote;

    public function __construct(
        string  $senderName,
        string  $senderEmail,
        string  $senderPhone,
        string  $serviceName,
        string  $requestType,
        string  $details,
        ?string $filePath  = null,
        ?string $fileName  = null,
        ?string $imageNote = null
    ) {
        $this->senderName  = $senderName;
        $this->senderEmail = $senderEmail;
        $this->senderPhone = $senderPhone;
        $this->serviceName = $serviceName;
        $this->requestType = $requestType;
        $this->details     = $details;
        $this->filePath    = $filePath;
        $this->fileName    = $fileName;
        $this->imageNote   = $imageNote;
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
        if ($this->filePath && file_exists($this->filePath)) {
            return [
                Attachment::fromPath($this->filePath)
                    ->as($this->fileName ?? basename($this->filePath)),
            ];
        }
        return [];
    }
}
