<?php

namespace Tests\Feature\Auth;

use App\Models\Classe;
use App\Models\Filiere;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_student_can_register()
    {
        $filiere = Filiere::factory()->create();
        $classe = Classe::factory()->create(['filiere_id' => $filiere->id]);

        $response = $this->postJson('/api/v1/auth/register', [
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john.doe@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'filiere_id' => $filiere->id,
            'classe_id' => $classe->id,
        ]);

        $response->assertStatus(201)
                 ->assertJsonStructure([
                     'message',
                     'credentials' => [
                         'academic_email', 'temporary_password', 'matricule'
                     ],
                     'user' => ['id', 'full_name', 'email', 'status']
                 ]);

        $this->assertDatabaseHas('users', ['personal_email' => 'john.doe@example.com']);
        $this->assertDatabaseHas('students', ['status' => 'pending']);
    }
}
