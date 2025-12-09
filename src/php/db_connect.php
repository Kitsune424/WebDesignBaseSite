<?php
// api/php/db_connect.php

// Разрешаем все источники (для разработки)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Max-Age: 86400');    // 24 часа для кэширования preflight

// Разрешаем заголовки
$allowed_headers = [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin'
];
header('Access-Control-Allow-Headers: ' . implode(', ', $allowed_headers));

// Разрешаем методы
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');

// Для preflight запросов
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // Возвращаем 200 OK для preflight
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    
    exit(0);
}

// Основные заголовки для ответов
header('Content-Type: application/json; charset=utf-8');

// Настройки подключения к БД
$host = 'localhost';
$dbname = 'sneakersshop';
$username = 'sneakers_admin';
$password = '12345';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Ошибка подключения к БД: ' . $e->getMessage()]);
    exit();
}
?>