const connectionDB = require('../connections/mysql_connection');

async function getClassWarnings(class_id, user_id) {
    try {
        const isCreatorQuery = 'SELECT creator_id FROM classes WHERE id = ?';
        const isCreatorResult = await new Promise((resolve, reject) => {
            connectionDB.query(isCreatorQuery, [class_id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        if (isCreatorResult.length === 0 || isCreatorResult[0].creator_id !== user_id) {
            const isMemberQuery = 'SELECT * FROM class_members WHERE class_id = ? AND member_id = ?';
            const isMemberResult = await new Promise((resolve, reject) => {
                connectionDB.query(isMemberQuery, [class_id, user_id], (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });

            if (isMemberResult.length === 0) {
                return { responseData: { error: `Você não tem permissão para visualizar os avisos desta turma.` }, status: 403 };
            }
        }

        const sql = `
            SELECT warnings.*, users.name as user_name
            FROM warnings
            JOIN users ON warnings.user_id = users.id
            WHERE warnings.class_id = ?
        `;
        const result = await new Promise((resolve, reject) => {
            connectionDB.query(sql, [class_id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        const classWarnings = result.map(warning => {
            return {
                id: warning.id,
                user_id: warning.user_id,
                user_name: warning.user_name,
                class_id: warning.class_id,
                message: warning.message,
                created_at: warning.created_at,
                updated_at: warning.updated_at,
            };
        });

        return { responseData: classWarnings, status: 200 };
    } catch (error) {
        return { responseData: { error: `Erro ao buscar avisos. ${error}` }, status: 400 };
    }
}

async function createWarning(warningData, user_id) {
    try {
        console.log(warningData)
        const { class_id, message } = warningData;
        const isCreatorQuery = 'SELECT creator_id FROM classes WHERE id = ?';
        const isCreatorResult = await new Promise((resolve, reject) => {
            connectionDB.query(isCreatorQuery, [class_id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        if (isCreatorResult.length === 0 || isCreatorResult[0].creator_id !== user_id) {
            const isMemberQuery = 'SELECT * FROM class_members WHERE class_id = ? AND member_id = ?';
            const isMemberResult = await new Promise((resolve, reject) => {
                connectionDB.query(isMemberQuery, [class_id, user_id], (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });

            if (isMemberResult.length === 0) {
                return { responseData: { error: `Você não tem permissão para visualizar os avisos desta turma.` }, status: 403 };
            }
        }

        const sql = 'INSERT INTO warnings (user_id, class_id, message) VALUES (?, ?, ?)';
        const result = await new Promise((resolve, reject) => {
            connectionDB.query(sql, [user_id, class_id, message], (err, result) => {
                if (err) {
                    resolve(err);
                } else {
                    resolve(result);
                }
            });
        });

        const warning = {
            id: result.insertId,
            user_id,
            class_id,
            message,
            created_at: new Date().toISOString(),
            updated_at: null,
        };

        return { responseData: warning, status: 201 };
    } catch (error) {
        return { responseData: { error: `Falha ao criar aviso. ${error}` }, status: 400 };
    }
}

async function updateWarning(warningData, user_id) {
    try {
        console.log(warningData);
        const { id, message } = warningData;
        const isOwnerQuery = 'SELECT * FROM warnings WHERE id = ? AND user_id = ?';
        const isOwnerResult = await new Promise((resolve, reject) => {
            connectionDB.query(isOwnerQuery, [id, user_id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        if (isOwnerResult.length === 0) {
            return { responseData: { error: `Aviso não encontrado ou você não tem permissão para atualizá-lo.` }, status: 404 };
        }

        const sql = 'UPDATE warnings SET message = ?, updated_at = ? WHERE id = ?';
        const result = await new Promise((resolve, reject) => {
            connectionDB.query(sql, [message, new Date().toISOString(), id], (err, result) => {
                if (err) {
                    resolve(err);
                } else {
                    resolve(result);
                }
            });
        });

        if (result.affectedRows > 0) {
            return { responseData: { message: 'Aviso atualizado com sucesso' }, status: 200 };
        } else {
            return { responseData: { error: `Aviso não encontrado ou você não tem permissão.` }, status: 404 };
        }
    } catch (error) {
        return { responseData: { error: `Erro ao atualizar aviso. ${error}` }, status: 400 };
    }
}

async function deleteWarning(warningData, user_id) {
    try {
        const { id } = warningData;
        const isOwnerQuery = 'SELECT * FROM warnings WHERE id = ? AND user_id = ?';
        const isOwnerResult = await new Promise((resolve, reject) => {
            connectionDB.query(isOwnerQuery, [id, user_id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        if (isOwnerResult.length === 0) {
            return { responseData: { error: `Aviso não encontrado ou você não tem permissão para removê-lo.` }, status: 404 };
        }

        const sql = 'DELETE FROM warnings WHERE id = ?';
        const result = await new Promise((resolve, reject) => {
            connectionDB.query(sql, [id], (err, result) => {
                if (err) {
                    resolve(err);
                } else {
                    resolve(result);
                }
            });
        });

        if (result.affectedRows > 0) {
            return { responseData: { message: 'Aviso removido com sucesso' }, status: 200 };
        } else {
            return { responseData: { error: `Aviso não encontrado ou você não tem permissão.` }, status: 404 };
        }
    } catch (error) {
        return { responseData: { error: `Erro ao remover aviso. ${error}` }, status: 400 };
    }
}

module.exports = {
    createWarning,
    getClassWarnings,
    updateWarning,
    deleteWarning,
};
