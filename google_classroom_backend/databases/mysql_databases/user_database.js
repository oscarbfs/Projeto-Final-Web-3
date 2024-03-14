const connectionDB = require('../connections/mysql_connection');

async function createUser(userData) {
    const { name, email, password } = userData;
    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    try {
        const result = await new Promise((resolve, reject) => {
            connectionDB.query(sql, [name, email, password], (err, result) => {
                if (err) {
                    resolve(err);
                } else {
                    resolve(result);
                }
            });
        });

        const userWithoutPassword = { id: result.insertId, name, email };
        return { responseData: userWithoutPassword, status: 201 };
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return { responseData: { error: 'Erro ao criar usuário: Email já existente' }, status: 400 };
        } else {
            return { responseData: { error: 'Erro ao criar usuário no banco de dados', err }, status: 500 };
        }
    }
}

async function getUser(id) {
    const sql = 'SELECT * FROM users WHERE id = ?';
    try {
        const result = await new Promise((resolve, reject) => {
            connectionDB.query(sql, [id], (err, result) => {
                if (err) {
                    resolve(err);
                } else {
                    resolve(result);
                }
            });
        });
        if (result.length > 0) {
            const userWithoutPassword = { ...result[0] };
            delete userWithoutPassword.password;
            return { responseData: userWithoutPassword, status: 200 };
        } else {
            return { responseData: { error: 'Usuário não encontrado.' }, status: 404 };
        }
    } catch (err) {
        return { responseData: { error: 'Erro ao buscar usuário no banco de dados.' }, status: 500 };
    }
}

async function getClassUsers(creator_id, members_ids) {
    let sql = 'SELECT * FROM users WHERE id = ?';
    let params = [creator_id];
    members_ids.forEach(memberId => {
        sql += ' OR id = ?';
        params.push(memberId);
    });
    try {
        const result = await new Promise((resolve, reject) => {
            connectionDB.query(sql, params, (err, result) => {
                if (err) {
                    resolve(err);
                } else {
                    resolve(result);
                }
            });
        });
        const usersWithoutPassword = result.map(user => {
            const userWithoutPassword = { ...user };
            delete userWithoutPassword.password;
            return userWithoutPassword;
        });
        return { responseData: usersWithoutPassword, status: 200 };
    } catch (err) {
        return { responseData: { error: 'Erro ao buscar usuários da turma no banco de dados.' }, status: 500 };
    }
}

async function searchUsers(name, email) {
    let sql = 'SELECT * FROM users WHERE 1=1';
    const params = [];
    if (name) {
        sql += ' AND name = ?';
        params.push(name);
    }
    if (email) {
        sql += ' AND email = ?';
        params.push(email);
    }
    try {
        const result = await new Promise((resolve, reject) => {
            connectionDB.query(sql, params, (err, result) => {
                if (err) {
                    resolve(err);
                } else {
                    resolve(result);
                }
            });
        });
        const usersWithoutPassword = result.map(user => {
            const userWithoutPassword = { ...user };
            delete userWithoutPassword.password;
            return userWithoutPassword;
        });
        return { responseData: usersWithoutPassword, status: 200 };
    } catch (err) {
        return { responseData: { error: 'Erro ao buscar usuários no banco de dados.' }, status: 500 };
    }
}

async function updateUser(userData, user_id) {
    const { name, email, password } = userData;
    const sql = 'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?';
    try {
        const result = await new Promise((resolve, reject) => {
            connectionDB.query(sql, [name, email, password, user_id], (err, result) => {
                if (err) {
                    resolve(err);
                } else {
                    resolve(result);
                }
            });
        });
        if (result.affectedRows > 0) {
            const updatedUserWithoutPassword = { id: user_id, name, email };
            return { responseData: updatedUserWithoutPassword, status: 200 };
        } else {
            return { responseData: { error: 'Usuário não encontrado.' }, status: 404 };
        }
    } catch (err) {
        return { responseData: { error: 'Erro ao atualizar usuário no banco de dados.' }, status: 500 };
    }
}

async function deleteUser(user_id) {
    const sql = 'DELETE FROM users WHERE id = ?';
    try {
        const result = await new Promise((resolve, reject) => {
            connectionDB.query(sql, [user_id], (err, result) => {
                if (err) {
                    resolve(err);
                } else {
                    resolve(result);
                }
            });
        });
        if (result.affectedRows > 0) {
            return { responseData: { message: 'Usuário deletado com sucesso' }, status: 200 };
        } else {
            return { responseData: { error: 'Usuário não encontrado.' }, status: 404 };
        }
    } catch (err) {
        return { responseData: { error: 'Erro ao deletar usuário no banco de dados.' }, status: 500 };
    }
}

async function verifyCredentials(email, password) {
    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
    try {
        const result = await new Promise((resolve, reject) => {
            connectionDB.query(sql, [email, password], (err, result) => {
                if (err) {
                    resolve(err);
                } else {
                    resolve(result);
                }
            });
        });
        if (result.length > 0) {
            return { ...result[0] };
        } else {
            return null;
        }
    } catch (err) {
        return { responseData: { error: 'Erro ao verificar credenciais no banco de dados.' }, status: 500 };
    }
}

module.exports = {
    createUser,
    searchUsers,
    getUser,
    getClassUsers,
    updateUser,
    deleteUser,
    verifyCredentials,
};
