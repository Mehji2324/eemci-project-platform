@echo off
echo ===========================================
echo Fixing Laravel Development Environment
echo ===========================================
echo.

cd backend

echo 1. Clearing Laravel caches...
call php artisan config:clear
call php artisan cache:clear
call php artisan optimize:clear
echo.

echo 2. Running fresh migrations and seeding the database...
call php artisan migrate:fresh --seed
echo.

echo 3. Testing Login for admin@eemci.ma...
php -r "$data=json_encode(['email'=>'admin@eemci.ma','password'=>'demo1234']); $ch=curl_init('http://localhost:8000/api/v1/auth/login'); curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); curl_setopt($ch, CURLOPT_POST, true); curl_setopt($ch, CURLOPT_POSTFIELDS, $data); curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json', 'Accept: application/json']); $res=curl_exec($ch); curl_close($ch); $json=json_decode($res, true); if(isset($json['token']) || isset($json['access_token'])) { echo 'SUCCESS: Token received! ' . substr(json_encode($json), 0, 100) . '...'; } else { echo 'FAILED: ' . $res; }"
echo.
echo.
echo 4. Testing Login for teacher@eemci.ma...
php -r "$data=json_encode(['email'=>'teacher@eemci.ma','password'=>'demo1234']); $ch=curl_init('http://localhost:8000/api/v1/auth/login'); curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); curl_setopt($ch, CURLOPT_POST, true); curl_setopt($ch, CURLOPT_POSTFIELDS, $data); curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json', 'Accept: application/json']); $res=curl_exec($ch); curl_close($ch); $json=json_decode($res, true); if(isset($json['token']) || isset($json['access_token'])) { echo 'SUCCESS: Token received! ' . substr(json_encode($json), 0, 100) . '...'; } else { echo 'FAILED: ' . $res; }"
echo.
echo.
echo 5. Testing Login for student@eemci.ma...
php -r "$data=json_encode(['email'=>'student@eemci.ma','password'=>'demo1234']); $ch=curl_init('http://localhost:8000/api/v1/auth/login'); curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); curl_setopt($ch, CURLOPT_POST, true); curl_setopt($ch, CURLOPT_POSTFIELDS, $data); curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json', 'Accept: application/json']); $res=curl_exec($ch); curl_close($ch); $json=json_decode($res, true); if(isset($json['token']) || isset($json['access_token'])) { echo 'SUCCESS: Token received! ' . substr(json_encode($json), 0, 100) . '...'; } else { echo 'FAILED: ' . $res; }"
echo.
echo.

cd ..
echo ===========================================
echo IMPORTANT: Please restart your 'php artisan serve' process if it's currently running.
echo ===========================================
pause
