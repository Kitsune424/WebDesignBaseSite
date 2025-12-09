<?php
// api/php/login.php

// Включите отладку только для разработки
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

// CORS заголовки ДО любого вывода
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

// Обработка preflight запросов
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Подключение к БД
$host = 'localhost';
$dbname = 'sneakersshop';
$username = 'sneakers_admin';
$password = '12345';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch(PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Ошибка подключения к БД']);
    exit();
}

// Обработка POST запроса
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Получаем сырые данные
    $input = file_get_contents('php://input');
    
    // Проверяем, что данные есть
    if (empty($input)) {
        echo json_encode(['success' => false, 'message' => 'Нет данных']);
        exit();
    }
    
    // Декодируем JSON
    $data = json_decode($input, true);
    
    // Проверяем, что JSON декодирован
    if (json_last_error() !== JSON_ERROR_NONE) {
        echo json_encode(['success' => false, 'message' => 'Некорректный JSON']);
        exit();
    }
    
    // Получаем данные
    $login = trim($data['username'] ?? '');
    $password = $data['password'] ?? '';
    
    // Валидация
    if (empty($login) || empty($password)) {
        echo json_encode(['success' => false, 'message' => 'Заполните все поля']);
        exit();
    }
    
    try {
        // Ищем пользователя по логину ИЛИ email
        $stmt = $pdo->prepare("SELECT * FROM t_users WHERE login = ? OR email = ?");
        $stmt->execute([$login, $login]);
        $user = $stmt->fetch();
        
        if (!$user) {
            echo json_encode(['success' => false, 'message' => 'Пользователь не найден']);
            exit();
        }
        
        // Проверяем пароль
        if (password_verify($password, $user['password'])) {
            // Удаляем пароль из ответа
            unset($user['password']);
            
            echo json_encode([
                'success' => true,
                'message' => 'Вход выполнен успешно!',
                'user' => $user
            ]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Неверный пароль']);
        }
        
    } catch(PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Ошибка БД: ' . $e->getMessage()]);
    }
    
} else {
    echo json_encode(['success' => false, 'message' => 'Используйте POST метод']);
}
?>