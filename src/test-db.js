// setup-database.js
const mysql = require('mysql2');
require('dotenv').config(); // если используете .env файл

const config = {
  host: 'localhost',
  user: 'root', // или ваш пользователь с правами создания БД
  password: '', // ваш пароль root
  multipleStatements: true
};

const connection = mysql.createConnection(config);

console.log('🚀 Начинаю настройку базы данных...');

connection.connect((err) => {
  if (err) {
    console.error('❌ Ошибка подключения к MySQL:', err.message);
    process.exit(1);
  }

  console.log('✅ Подключение к MySQL успешно');

  // SQL команды для выполнения
  const sqlCommands = `
    -- 1. Создаем базу данных, если не существует
    CREATE DATABASE IF NOT EXISTS sneakersshop 
    CHARACTER SET utf8mb4 
    COLLATE utf8mb4_unicode_ci;
    
    -- 2. Используем созданную базу данных
    USE sneakersshop;
    
    -- 3. Создаем таблицу t_users
    CREATE TABLE IF NOT EXISTS t_users (
      ID_Users INT AUTO_INCREMENT PRIMARY KEY,
      lastName VARCHAR(50) NOT NULL,
      firstName VARCHAR(50) NOT NULL,
      middleName VARCHAR(50),
      login VARCHAR(30) UNIQUE NOT NULL,
      password VARCHAR(30) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      gender VARCHAR(6) NOT NULL,
      age INT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    
    -- 4. Создаем пользователя (если нужно)
    -- CREATE USER IF NOT EXISTS 'sneakers_admin'@'localhost' IDENTIFIED BY '12345';
    -- GRANT ALL PRIVILEGES ON sneakersshop.* TO 'sneakers_admin'@'localhost';
    -- FLUSH PRIVILEGES;
  `;

  connection.query(sqlCommands, (err, results) => {
    if (err) {
      console.error('❌ Ошибка при создании базы данных:', err.message);
      connection.end();
      process.exit(1);
    }

    console.log('✅ База данных и таблица созданы успешно');
    
    // Теперь вставляем тестовые данные
    insertTestData();
  });
});

function insertTestData() {
  // Переподключаемся с пользователем sneakers_admin
  const userConnection = mysql.createConnection({
    host: 'localhost',
    user: 'sneakers_admin',
    password: '12345',
    database: 'sneakersshop'
  });

  userConnection.connect((err) => {
    if (err) {
      console.error('❌ Ошибка подключения как sneakers_admin:', err.message);
      console.log('Проверьте, существует ли пользователь и пароль');
      connection.end();
      process.exit(1);
    }

    console.log('✅ Подключение как sneakers_admin успешно');

    const testUsers = [
      {
        lastName: 'Иванов',
        firstName: 'Иван',
        middleName: 'Иванович',
        login: 'ivanov',
        password: 'password123',
        email: 'ivanov@example.com',
        gender: 'male',
        age: 25
      },
      {
        lastName: 'Петрова',
        firstName: 'Мария',
        middleName: 'Сергеевна',
        login: 'petrova',
        password: 'qwerty123',
        email: 'petrova@example.com',
        gender: 'female',
        age: 30
      },
      {
        lastName: 'Сидоров',
        firstName: 'Алексей',
        middleName: 'Петрович',
        login: 'sidorov',
        password: 'alex123',
        email: 'sidorov@example.com',
        gender: 'male',
        age: 28
      },
      {
        lastName: 'Кузнецова',
        firstName: 'Анна',
        middleName: 'Владимировна',
        login: 'kuznetsova',
        password: 'anna2024',
        email: 'kuznetsova@example.com',
        gender: 'female',
        age: 22
      },
      {
        lastName: 'Васильев',
        firstName: 'Дмитрий',
        middleName: 'Александрович',
        login: 'vasilyev',
        password: 'dima777',
        email: 'vasilyev@example.com',
        gender: 'male',
        age: 35
      }
    ];

    // Проверяем, есть ли уже пользователи
    userConnection.query('SELECT COUNT(*) as count FROM t_users', (err, results) => {
      if (err) {
        console.error('❌ Ошибка проверки данных:', err.message);
        userConnection.end();
        connection.end();
        return;
      }

      const existingCount = results[0].count;
      
      if (existingCount > 0) {
        console.log(`ℹ️ В таблице уже есть ${existingCount} пользователей`);
        console.log('Хотите очистить таблицу и добавить тестовые данные? (y/n)');
        
        // Для автоматизации можно закомментировать этот блок
        const readline = require('readline').createInterface({
          input: process.stdin,
          output: process.stdout
        });
        
        readline.question('', (answer) => {
          if (answer.toLowerCase() === 'y') {
            truncateAndInsert(userConnection, testUsers);
          } else {
            console.log('ℹ️ Таблица не изменена');
            userConnection.end();
            connection.end();
          }
          readline.close();
        });
      } else {
        insertUsers(userConnection, testUsers);
      }
    });
  });
}

function truncateAndInsert(conn, users) {
  console.log('🔄 Очищаю таблицу...');
  
  conn.query('TRUNCATE TABLE t_users', (err) => {
    if (err) {
      console.error('❌ Ошибка очистки таблицы:', err.message);
      conn.end();
      connection.end();
      return;
    }
    
    console.log('✅ Таблица очищена');
    insertUsers(conn, users);
  });
}

function insertUsers(conn, users) {
  console.log(`📝 Добавляю ${users.length} тестовых пользователей...`);
  
  const placeholders = users.map(() => '(?, ?, ?, ?, ?, ?, ?, ?)').join(', ');
  const values = [];
  
  users.forEach(user => {
    values.push(
      user.lastName,
      user.firstName,
      user.middleName,
      user.login,
      user.password,
      user.email,
      user.gender,
      user.age
    );
  });

  const sql = `
    INSERT INTO t_users 
      (lastName, firstName, middleName, login, password, email, gender, age) 
    VALUES ${placeholders}
  `;

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.error('❌ Ошибка при добавлении пользователей:', err.message);
      
      // Попробуем добавить по одному, чтобы увидеть какая запись вызывает ошибку
      console.log('Попытка добавить пользователей по одному...');
      insertUsersOneByOne(conn, users);
      return;
    }

    console.log(`✅ Успешно добавлено ${results.affectedRows} пользователей`);
    console.log(`📊 ID последнего добавленного пользователя: ${results.insertId}`);
    
    // Покажем добавленных пользователей
    showUsers(conn);
  });
}

function insertUsersOneByOne(conn, users) {
  let successCount = 0;
  let errorCount = 0;
  
  users.forEach((user, index) => {
    const sql = `
      INSERT INTO t_users 
        (lastName, firstName, middleName, login, password, email, gender, age) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    const values = [
      user.lastName,
      user.firstName,
      user.middleName,
      user.login,
      user.password,
      user.email,
      user.gender,
      user.age
    ];
    
    conn.query(sql, values, (err, result) => {
      if (err) {
        console.error(`❌ Ошибка при добавлении пользователя ${user.login}:`, err.message);
        errorCount++;
      } else {
        console.log(`✅ Добавлен пользователь: ${user.login}`);
        successCount++;
      }
      
      // Когда все запросы завершены
      if (successCount + errorCount === users.length) {
        console.log(`\n📊 Итог: успешно ${successCount}, ошибок ${errorCount}`);
        showUsers(conn);
      }
    });
  });
}

function showUsers(conn) {
  console.log('\n📋 Содержимое таблицы t_users:');
  
  conn.query('SELECT * FROM t_users ORDER BY ID_Users', (err, results) => {
    if (err) {
      console.error('❌ Ошибка при получении данных:', err.message);
    } else {
      console.table(results.map(user => ({
        ID: user.ID_Users,
        ФИО: `${user.lastName} ${user.firstName} ${user.middleName}`,
        Логин: user.login,
        Email: user.email,
        Пол: user.gender === 'male' ? 'М' : 'Ж',
        Возраст: user.age,
        'Дата создания': user.created_at
      })));
    }
    
    console.log('\n✅ Настройка базы данных завершена!');
    conn.end();
    connection.end();
    
    // Даем рекомендации
    console.log('\n🔧 Для проверки PHP подключения:');
    console.log('1. Убедитесь, что файл config.php содержит:');
    console.log(`
      $servername = "localhost";
      $username = "sneakers_admin";
      $password = "12345";
      $dbname = "sneakersshop";
    `);
    
    console.log('\n2. Проверьте подключение PHP командой:');
    console.log('   php -r \'include "config.php"; echo $conn ? "✅ OK" : "❌ Error";\'');
  });
}

// Обработка завершения
process.on('SIGINT', () => {
  console.log('\n\n👋 Завершение работы...');
  if (connection) connection.end();
  process.exit();
});