<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$routes = app('router')->getRoutes();
$output = "";
foreach ($routes as $route) {
    $output .= $route->uri() . "\n";
}
file_put_contents('routes_dump.txt', $output);
echo "Done.";
