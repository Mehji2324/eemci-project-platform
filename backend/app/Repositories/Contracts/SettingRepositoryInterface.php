<?php

namespace App\Repositories\Contracts;

interface SettingRepositoryInterface
{
    public function all();
    public function getByGroup(string $group);
    public function getPublic();
    public function updateByKey(string $key, $value);
    public function updateMany(array $settings);
    public function findByKey(string $key);
}
