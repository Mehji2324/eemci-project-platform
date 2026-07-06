<?php

namespace App\Repositories\Eloquent;

use App\Models\Setting;
use App\Repositories\Contracts\SettingRepositoryInterface;

class EloquentSettingRepository implements SettingRepositoryInterface
{
    public function all()
    {
        return Setting::all();
    }

    public function getByGroup(string $group)
    {
        return Setting::where('group', $group)->get();
    }

    public function getPublic()
    {
        return Setting::where('is_public', true)->get();
    }

    public function findByKey(string $key)
    {
        return Setting::where('key', $key)->first();
    }

    public function updateByKey(string $key, $value)
    {
        $setting = $this->findByKey($key);
        if ($setting) {
            $setting->update(['value' => $value]);
            return $setting;
        }
        return null;
    }

    public function updateMany(array $settings)
    {
        foreach ($settings as $key => $value) {
            $this->updateByKey($key, $value);
        }
        return true;
    }
}
