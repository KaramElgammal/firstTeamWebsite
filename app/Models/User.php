<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasRoles;

    /**
     * The super-admin email that can never be deleted or demoted.
     */
    public const SUPER_ADMIN_EMAIL = 'firstteamrobots@gmail.com';

    /**
     * Determine whether this user is the protected super-admin.
     */
    public function isSuperAdmin(): bool
    {
        return mb_strtolower($this->email) === self::SUPER_ADMIN_EMAIL;
    }

    /**
     * Prevent deletion of the super-admin account.
     */
    public function delete(): ?bool
    {
        if ($this->isSuperAdmin()) {
            return false;
        }

        return parent::delete();
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'otp_code',
        'otp_expires_at',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'otp_expires_at' => 'datetime',
        ];
    }
}
