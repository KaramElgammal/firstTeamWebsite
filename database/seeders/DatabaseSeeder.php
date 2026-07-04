<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $userRole = Role::firstOrCreate(['name' => 'user']);

        // Give every existing (and future-seeded) permission to the admin role.
        $permissionNames = [
            'manage users',
            'manage news',
            'manage projects',
            'manage services',
        ];

        foreach ($permissionNames as $permissionName) {
            $permission = Permission::firstOrCreate(['name' => $permissionName]);
            $adminRole->givePermissionTo($permission);
        }

        $admins = [
            [
                'name' => 'First Team Robots',
                'email' => 'firstteamrobots@gmail.com',
                'password' => '12345678',
            ],
            [
                'name' => 'Karam Mahmoud',
                'email' => 'karammahmoud9990@gmail.com',
                'password' => '12345678',
            ],
        ];

        foreach ($admins as $admin) {
            $user = User::firstOrCreate(
                ['email' => $admin['email']],
                [
                    'name' => $admin['name'],
                    'password' => Hash::make($admin['password']),
                    'email_verified_at' => now(),
                ]
            );

            $user->syncRoles([$adminRole]);
        }

        $testUser = User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );

        if (! $testUser->hasAnyRole([$adminRole, $userRole])) {
            $testUser->assignRole($userRole);
        }

        // Make sure every other existing user has at least the base "user" role.
        User::doesntHave('roles')->get()->each(function (User $user) use ($userRole) {
            $user->assignRole($userRole);
        });

        $this->call(ContentSeeder::class);
    }
}
