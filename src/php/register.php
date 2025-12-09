<?php
// api/php/register.php

require_once 'db_connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Получаем данные из POST запроса
    $data = json_decode(file_get_contents('php://input'), true);
    
    $lastName = trim($data['lastName'] ?? '');
    $firstName = trim($data['firstName'] ?? '');
    $middleName = trim($data['middleName'] ?? '');
    $login = trim($data['login'] ?? '');
    $password = $data['password'] ?? '';
    $email = trim($data['email'] ?? '');
    $gender = $data['gender'] ?? '';
    $age = intval($data['age'] ?? 0);
    
    // Валидация данных
    if (empty($lastName) || empty($firstName) || empty($login) || empty($password) || empty($email) || empty($gender) || $age < 1) {
        echo json_encode(['success' => false, 'message' => 'Все обязательные поля должны быть заполнены']);
        exit();
    }
    
    // Проверка длины
    if (strlen($lastName) > 50 || strlen($firstName) > 50 || strlen($middleName) > 50 || 
        strlen($login) > 30 || strlen($password) < 6 || strlen($password) > 30 || 
        strlen($email) > 100) {
        echo json_encode(['success' => false, 'message' => 'Некорректная длина полей']);
        exit();
    }
    
    // Хеширование пароля
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    
    try {
        // Проверяем, существует ли пользователь с таким логином или email
        $stmt = $pdo->prepare("SELECT COUNT(*) FROM t_users WHERE login = ? OR email = ?");
        $stmt->execute([$login, $email]);
        
        if ($stmt->fetchColumn() > 0) {
            echo json_encode(['success' => false, 'message' => 'Пользователь с таким логином или email уже существует']);
            exit();
        }
        
        // Вставляем нового пользователя
        $stmt = $pdo->prepare("INSERT INTO t_users (lastName, firstName, middleName, login, password, email, gender, age) 
                              VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$lastName, $firstName, $middleName, $login, $hashedPassword, $email, $gender, $age]);
        
        echo json_encode([
            'success' => true, 
            'message' => 'Регистрация успешно завершена!',
            'userId' => $pdo->lastInsertId()
        ]);
        
    } catch(PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Ошибка при регистрации: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Метод не поддерживается']);
}
?>