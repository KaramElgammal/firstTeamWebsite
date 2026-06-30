<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ContactMail extends Mailable
{
    use Queueable, SerializesModels;

    public string $senderEmail;
    public string $senderMessage;

    public function __construct(string $senderEmail, string $senderMessage)
    {
        $this->senderEmail   = $senderEmail;
        $this->senderMessage = $senderMessage;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'New Contact Message — First Team',
            replyTo: [$this->senderEmail],
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.contact',
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
