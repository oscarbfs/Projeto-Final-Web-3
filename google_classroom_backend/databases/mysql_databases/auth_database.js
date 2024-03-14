const connectionDB = require('../connections/mysql_connection');

async function login(user) {
    try {
        if (user) {
            const userId = user.id;
            await deletePreviousTokens(userId);
            const token = generateAuthToken();
            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + 7);
            await saveToken(userId, token, expirationDate);
            return { responseData: { token }, status: 200 };
        } else {
            return { responseData: { error: 'Credenciais inválidas.' }, status: 400 };
        }
    } catch (err) {
        console.log(err)
        return { responseData: { error: 'Erro ao fazer login.' }, status: 500 };
    }
}

async function deletePreviousTokens(userId) {
    const sqlDelete = 'DELETE FROM user_tokens WHERE user_id = ?';
    await new Promise((resolve, reject) => {
        connectionDB.query(sqlDelete, [userId], (err, result) => {
            if (err) {
                resolve(err);
            } else {
                resolve(result);
            }
        });
    });
}

async function saveToken(userId, token, expiresAt) {
    const sqlInsert = 'INSERT INTO user_tokens (user_id, token, expires_at) VALUES (?, ?, ?)';
    await new Promise((resolve, reject) => {
        connectionDB.query(sqlInsert, [userId, token, expiresAt], (err, result) => {
            if (err) {
                resolve(err);
            } else {
                resolve(result);
            }
        });
    });
}

async function logout(token) {
    const sql = 'DELETE FROM user_tokens WHERE token = ?';
    try {
        await new Promise((resolve, reject) => {
            connectionDB.query(sql, [token], (err, result) => {
                if (err) {
                    resolve(err);
                } else {
                    resolve(result);
                }
            });
        });
        return { responseData: { message: 'Logout bem-sucedido' }, status: 200 };
    } catch (err) {
        return { responseData: { error: 'Erro ao fazer logout.' }, status: 500 };
    }
}

async function checkToken(token) {
    const sql = 'SELECT * FROM user_tokens WHERE token = ? AND expires_at > NOW()';
    try {
        const result = await new Promise((resolve, reject) => {
            connectionDB.query(sql, [token], (err, result) => {
                if (err) {
                    resolve(err);
                } else {
                    resolve(result);
                }
            });
        });
        if (result.length > 0) {
            return { responseData: { isValid: true, user_id: result[0].user_id }, status: 200 };
        } else {
            return { responseData: { isValid: false }, status: 400 };
        }
    } catch (err) {
        return { responseData: { error: 'Erro ao verificar o token.' }, status: 500 };
    }
}

function generateAuthToken() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

async function getTokenData(token) {
    const sql = 'SELECT * FROM user_tokens WHERE token = ?';
    try {
        const result = await new Promise((resolve, reject) => {
            connectionDB.query(sql, [token], (err, result) => {
                if (err) {
                    resolve(err);
                } else {
                    resolve(result);
                }
            });
        });
        if (result.length > 0) {
            const tokenData = result[0];
            const expirationDate = new Date(tokenData.expires_at);
            const isValid = expirationDate > new Date(); 
            return { isValid, user_id: tokenData.user_id };
        } else {
            return { isValid: false };
        }
    } catch (err) {
        return { isValid: false, error: 'Erro ao buscar dados do token.' };
    }
}

module.exports = {
    login,
    logout,
    checkToken,
    getTokenData,
};
