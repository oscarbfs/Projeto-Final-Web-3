const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '', 
    database: 'googleclassroom', 
    port: 3306 
});

connection.connect(function(err) {
    if (err) {
        console.error('Erro ao conectar ao banco de dados.');
        return;
    }

    const createTableUsers = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
        )
    `;

    connection.query(createTableUsers, function(err, result) {
        if (err) {
            console.error('Erro ao criar tabela de usuários:', err);
            return;
        }
    });

    const createTableAuth = `
        CREATE TABLE IF NOT EXISTS user_tokens (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            token VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            expires_at DATETIME,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    `;

    connection.query(createTableAuth, function(err, result) {
        if (err) {
            console.error('Erro ao criar tabela de autenticação:', err);
            return;
        }
    });

    const createTableClasses = `
        CREATE TABLE IF NOT EXISTS classes (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            section VARCHAR(255),
            discipline VARCHAR(255),
            room VARCHAR(255),
            creator_id INT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (creator_id) REFERENCES users(id)
        )
    `;

    connection.query(createTableClasses, function(err, result) {
        if (err) {
            console.error('Erro ao criar tabela de classes:', err);
            return;
        }
    });

    const createTableClassMembers = `
        CREATE TABLE IF NOT EXISTS class_members (
            class_id INT,
            member_id INT,
            PRIMARY KEY (class_id, member_id),
            FOREIGN KEY (class_id) REFERENCES classes(id),
            FOREIGN KEY (member_id) REFERENCES users(id)
        )
    `;

    connection.query(createTableClassMembers, function(err, result) {
        if (err) {
            console.error('Erro ao criar tabela dos membros das classes:', err);
            return;
        }
    });

    const createTableActivitys = `
        CREATE TABLE IF NOT EXISTS activitys (
            id INT AUTO_INCREMENT PRIMARY KEY,
            class_id INT NOT NULL,
            user_id INT NOT NULL,
            title VARCHAR(255) NOT NULL,
            body TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (class_id) REFERENCES classes(id),
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    `;

    connection.query(createTableActivitys, function(err, result) {
        if (err) {
            console.error('Erro ao criar tabela de atividades:', err);
            return;
        }
    });

    const createTableActivityResponses = `
        CREATE TABLE IF NOT EXISTS activity_responses (
            response_id INT AUTO_INCREMENT PRIMARY KEY,
            activity_id INT NOT NULL,
            user_id INT NOT NULL,
            response_text TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (activity_id) REFERENCES activitys(id),
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    `;

    connection.query(createTableActivityResponses, function(err, result) {
        if (err) {
            console.error('Erro ao criar tabela de respostas de atividades:', err);
            return;
        }
    });

    const createTableWarnings = `
        CREATE TABLE IF NOT EXISTS warnings (
            id INT AUTO_INCREMENT PRIMARY KEY,
            class_id INT NOT NULL,
            user_id INT NOT NULL,
            message TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (class_id) REFERENCES classes(id),
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    `;

    connection.query(createTableWarnings, function(err, result) {
        if (err) {
            console.error('Erro ao criar tabela de avisos:', err);
            return;
        }
    });

});

module.exports = connection;
