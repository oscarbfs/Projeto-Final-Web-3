const connectionDB = require('../connections/mysql_connection');

async function createActivity(activityData, user_id) {
    try {
        const { class_id, title, body } = activityData;
        const sql = 'INSERT INTO activitys (class_id, user_id, title, body) VALUES (?, ?, ?, ?)';
        const result = await new Promise((resolve, reject) => {
            connectionDB.query(sql, [class_id, user_id, title, body], (err, result) => {
                if (err) {
                    resolve(err);
                } else {
                    resolve(result);
                }
            });
        });
        
        const activity = {
            id: result.insertId,
            class_id,
            user_id,
            title,
            body,
            responses: [],
            created_at: new Date().toISOString(),
            updated_at: null,
        };

        return { responseData: activity, status: 201 };
    } catch (error) {
        return { responseData: { error: `Falha ao criar atividade. ${error}` }, status: 400 };
    }
}

async function editResponseInActivity(activityData, user_id) {
    try {
        const { activity_id, response_id, response } = activityData;
        const sql = 'UPDATE activity_responses SET response = ?, updated_at = ? WHERE activity_id = ? AND response_id = ? AND user_id = ?';
        const result = await new Promise((resolve, reject) => {
            connectionDB.query(sql, [response, new Date().toISOString(), activity_id, response_id, user_id], (err, result) => {
                if (err) {
                    resolve(err);
                } else {
                    resolve(result);
                }
            });
        });

        if (result.affectedRows > 0) {
            return { responseData: { message: 'Resposta editada com sucesso' }, status: 200 };
        } else {
            return { responseData: { error: `Resposta não encontrada para este usuário nesta atividade.` }, status: 404 };
        }
    } catch (error) {
        return { responseData: { error: `Erro ao editar resposta na atividade. ${error}` }, status: 400 };
    }
}

async function addResponseToActivity(activityData, user_id) {
    try {
        const { activity_id, response } = activityData;
        const sql = 'INSERT INTO activity_responses (activity_id, user_id, response, created_at) VALUES (?, ?, ?, ?)';
        const result = await new Promise((resolve, reject) => {
            connectionDB.query(sql, [activity_id, user_id, response, new Date().toISOString()], (err, result) => {
                if (err) {
                    resolve(err);
                } else {
                    resolve(result);
                }
            });
        });

        return { responseData: { message: 'Resposta adicionada com sucesso' }, status: 200 };
    } catch (error) {
        return { responseData: { error: `Erro ao adicionar resposta à atividade. ${error}` }, status: 400 };
    }
}

async function getClassActivitys(class_id, user_id) {
    try {
        const sql = 'SELECT * FROM activitys WHERE class_id = ?';
        const result = await new Promise((resolve, reject) => {
            connectionDB.query(sql, [class_id], (err, result) => {
                if (err) {
                    resolve(err);
                } else {
                    resolve(result);
                }
            });
        });

        const activitys = result.map(activity => {
            return {
                id: activity.id,
                class_id: activity.class_id,
                user_id: activity.user_id,
                title: activity.title,
                body: activity.body,
                created_at: activity.created_at,
                updated_at: activity.updated_at,
            };
        });

        return { responseData: activitys, status: 200 };
    } catch (error) {
        return { responseData: { error: `Erro ao buscar atividades. ${error}` }, status: 400 };
    }
}

async function getActivity(activity_id) {
    try {
        const sql = 'SELECT * FROM activitys WHERE id = ?';
        const result = await new Promise((resolve, reject) => {
            connectionDB.query(sql, [activity_id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        if (result.length === 0) {
            return { responseData: { error: `Atividade não encontrada.` }, status: 404 };
        }

        const activity = result[0];

        return {
            responseData: {
                id: activity.id,
                class_id: activity.class_id,
                user_id: activity.user_id,
                title: activity.title,
                body: activity.body,
                created_at: activity.created_at,
                updated_at: activity.updated_at,
            },
            status: 200
        };
    } catch (error) {
        return { responseData: { error: `Erro ao buscar atividade. ${error}` }, status: 400 };
    }
}


async function updateActivity(activityData, user_id) {
    try {
        const { id, title, body } = activityData;
        const sql = 'UPDATE activitys SET title = ?, body = ?, updated_at = ? WHERE id = ? AND user_id = ?';
        const result = await new Promise((resolve, reject) => {
            connectionDB.query(sql, [title, body, new Date().toISOString(), id, user_id], (err, result) => {
                if (err) {
                    resolve(err);
                } else {
                    resolve(result);
                }
            });
        });

        if (result.affectedRows > 0) {
            return { responseData: { message: 'Atividade atualizada com sucesso' }, status: 200 };
        } else {
            return { responseData: { error: `Atividade não encontrada ou você não tem permissão.` }, status: 404 };
        }
    } catch (error) {
        return { responseData: { error: `Erro ao atualizar atividade. ${error}` }, status: 400 };
    }
}

async function deleteActivity(activityData, user_id) {
    try {
        const { id } = activityData;
        const sql = 'DELETE FROM activitys WHERE id = ? AND user_id = ?';
        const result = await new Promise((resolve, reject) => {
            connectionDB.query(sql, [id, user_id], (err, result) => {
                if (err) {
                    resolve(err);
                } else {
                    resolve(result);
                }
            });
        });

        if (result.affectedRows > 0) {
            return { responseData: { message: 'Atividade removida com sucesso' }, status: 200 };
        } else {
            return { responseData: { error: `Atividade não encontrada ou você não tem permissão.` }, status: 404 };
        }
    } catch (error) {
        return { responseData: { error: `Erro ao remover atividade. ${error}` }, status: 400 };
    }
}

module.exports = {
    createActivity,
    editResponseInActivity,
    addResponseToActivity,
    getClassActivitys,
    getActivity,
    updateActivity,
    deleteActivity,
};
