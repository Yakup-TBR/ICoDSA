<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('admin123'),
        ]);

        // Anda bisa menambahkan lebih banyak pengguna di sini
        User::create([
            'name' => 'supri',
            'email' => 'supri@gmail.com',
            'password' => Hash::make('supri123'),
        ]);
    }
}
