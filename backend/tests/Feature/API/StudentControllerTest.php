<?php

namespace Tests\Feature\API;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class StudentControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_list_all_students()
    {
        $this->createStudent(['status' => 'validated']);
        $this->createStudent(['status' => 'pending']);

        $response = $this->actingAsAdmin()->getJson('/api/v1/students');

        $response->assertStatus(200)
                 ->assertJsonCount(2, 'data');
    }

    public function test_teacher_can_list_all_students()
    {
        $response = $this->actingAsTeacher()->getJson('/api/v1/students');
        $response->assertStatus(200);
    }
}
