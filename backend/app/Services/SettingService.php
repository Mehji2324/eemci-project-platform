<?php

namespace App\Services;

use App\Repositories\Contracts\SettingRepositoryInterface;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Config;

class SettingService
{
    protected $settingRepository;
    protected $cacheKey = 'app_settings';

    public function __construct(SettingRepositoryInterface $settingRepository)
    {
        $this->settingRepository = $settingRepository;
    }

    public function getAllSettings()
    {
        return Cache::rememberForever($this->cacheKey, function () {
            return $this->settingRepository->all()->groupBy('group');
        });
    }

    public function getPublicSettings()
    {
        return Cache::rememberForever($this->cacheKey . '_public', function () {
            return $this->settingRepository->getPublic()->groupBy('group');
        });
    }

    public function updateSettings(array $settings)
    {
        $result = $this->settingRepository->updateMany($settings);
        $this->clearCache();
        return $result;
    }

    public function uploadFile(string $key, $file)
    {
        $path = $file->store('settings', 'public');
        $url = Storage::url($path);
        $this->settingRepository->updateByKey($key, $url);
        $this->clearCache();
        return $url;
    }

    public function testEmail(array $data)
    {
        // Temporarily configure mail to test settings
        Config::set('mail.mailers.smtp.host', $data['smtp_host'] ?? config('mail.mailers.smtp.host'));
        Config::set('mail.mailers.smtp.port', $data['smtp_port'] ?? config('mail.mailers.smtp.port'));
        Config::set('mail.mailers.smtp.username', $data['smtp_username'] ?? config('mail.mailers.smtp.username'));
        Config::set('mail.mailers.smtp.password', $data['smtp_password'] ?? config('mail.mailers.smtp.password'));
        Config::set('mail.mailers.smtp.encryption', $data['smtp_encryption'] ?? config('mail.mailers.smtp.encryption'));
        Config::set('mail.from.address', $data['sender_email'] ?? config('mail.from.address'));
        Config::set('mail.from.name', $data['sender_name'] ?? config('mail.from.name'));

        try {
            Mail::raw('This is a test email from ' . config('app.name'), function ($message) use ($data) {
                $message->to($data['test_email'])
                    ->subject('SMTP Test Email');
            });
            return true;
        } catch (\Exception $e) {
            throw $e;
        }
    }

    public function clearCache()
    {
        Cache::forget($this->cacheKey);
        Cache::forget($this->cacheKey . '_public');
    }

    public function getByKey(string $key, $default = null)
    {
        $settings = $this->getAllSettings();
        foreach ($settings as $group => $items) {
            $setting = $items->firstWhere('key', $key);
            if ($setting) {
                return $setting->value;
            }
        }
        return $default;
    }
}
