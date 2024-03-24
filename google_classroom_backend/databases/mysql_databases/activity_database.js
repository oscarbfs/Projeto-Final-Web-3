const connectionDB = require('../connections/mysql_connection');

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

        const deleteResponsesQuery = 'DELETE FROM activity_responses WHERE activity_id = ?';
        await new Promise((resolve, reject) => {
            connectionDB.query(deleteResponsesQuery, [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        const deleteActivityQuery = 'DELETE FROM activitys WHERE id = ? AND user_id = ?';
        const result = await new Promise((resolve, reject) => {
            connectionDB.query(deleteActivityQuery, [id, user_id], (err, result) => {
                if (err) {
                    reject(err);
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


async function getResponseActivity(response_id) {
    try {
        const sql = `
            SELECT ar.response_id, ar.user_id, u.name AS user_name, ar.response_text, ar.created_at, ar.updated_at, ar.activity_id, a.class_id, a.body AS activity_body
            FROM activity_responses AS ar
            INNER JOIN activitys AS a ON ar.activity_id = a.id
            INNER JOIN users AS u ON ar.user_id = u.id
            WHERE ar.response_id = ?
        `;
        const result = await new Promise((resolve, reject) => {
            connectionDB.query(sql, [response_id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        if (result.length === 0) {
            return { responseData: { error: `Resposta não encontrada.` }, status: 404 };
        }

        const response = result[0];

        return {
            responseData: {
                response_id: response.response_id,
                user_id: response.user_id,
                user_name: response.user_name,
                response_text: response.response_text,
                created_at: response.created_at,
                updated_at: response.updated_at,
                activity_id: response.activity_id,
                class_id: response.class_id,
                activity_body: response.activity_body
            },
            status: 200
        };
    } catch (error) {
        return { responseData: { error: `Erro ao buscar resposta. ${error}` }, status: 400 };
    }
}



async function editResponseInActivity(activityData, user_id) {
    try {
        const { response_id, response_text } = activityData;
        
        const checkOwnershipQuery = 'SELECT user_id FROM activity_responses WHERE response_id = ?';
        const ownershipResult = await new Promise((resolve, reject) => {
            connectionDB.query(checkOwnershipQuery, [response_id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        if (ownershipResult.length === 0 || ownershipResult[0].user_id !== user_id) {
            return { responseData: { error: `Você não tem permissão para editar esta resposta.` }, status: 403 };
        }

        const updateQuery = 'UPDATE activity_responses SET response_text = ?, updated_at = ? WHERE response_id = ?';
        const updateResult = await new Promise((resolve, reject) => {
            connectionDB.query(updateQuery, [response_text, new Date().toISOString(), response_id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        if (updateResult.affectedRows > 0) {
            return { responseData: { message: 'Resposta editada com sucesso' }, status: 200 };
        } else {
            return { responseData: { error: `Resposta não encontrada para este usuário.` }, status: 404 };
        }
    } catch (error) {
        return { responseData: { error: `Erro ao editar resposta. ${error}` }, status: 400 };
    }
}

async function deleteResponseInActivity(activityData, user_id) {
    try {
        const { response_id } = activityData;

        const checkOwnershipQuery = 'SELECT user_id FROM activity_responses WHERE response_id = ?';
        const ownershipResult = await new Promise((resolve, reject) => {
            connectionDB.query(checkOwnershipQuery, [response_id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        if (ownershipResult.length === 0 || ownershipResult[0].user_id !== user_id) {
            return { responseData: { error: `Você não tem permissão para excluir esta resposta.` }, status: 403 };
        }

        const deleteQuery = 'DELETE FROM activity_responses WHERE response_id = ?';
        const deleteResult = await new Promise((resolve, reject) => {
            connectionDB.query(deleteQuery, [response_id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        if (deleteResult.affectedRows > 0) {
            return { responseData: { message: 'Resposta removida com sucesso' }, status: 200 };
        } else {
            return { responseData: { error: `Resposta não encontrada para este usuário.` }, status: 404 };
        }
    } catch (error) {
        return { responseData: { error: `Erro ao remover resposta. ${error}` }, status: 400 };
    }
}

async function addResponseToActivity(activityData, user_id) {
    try {
        const { activity_id, response_text } = activityData;
        const sql = 'INSERT INTO activity_responses (activity_id, user_id, response_text, created_at) VALUES (?, ?, ?, ?)';
        const result = await new Promise((resolve, reject) => {
            connectionDB.query(sql, [activity_id, user_id, response_text, new Date().toISOString()], (err, result) => {
                if (err) {
                    reject(err);
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

async function getResponsesActivity(activity_id) {
    try {
        const sql = `
            SELECT ar.response_id, ar.user_id, ar.response_text, ar.created_at, ar.updated_at, u.name AS user_name
            FROM activity_responses AS ar
            INNER JOIN users AS u ON ar.user_id = u.id
            WHERE ar.activity_id = ?
        `;
        const result = await new Promise((resolve, reject) => {
            connectionDB.query(sql, [activity_id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        const responses = result.map(response => {
            return {
                response_id: response.response_id,
                user_id: response.user_id,
                user_name: response.user_name,
                response_text: response.response_text,
                created_at: response.created_at,
                updated_at: response.updated_at,
            };
        });

        return { responseData: responses, status: 200 };
    } catch (error) {
        return { responseData: { error: `Erro ao buscar respostas da atividade. ${error}` }, status: 400 };
    }
}

module.exports = {
    getClassActivitys,
    getActivity,
    createActivity,
    updateActivity,
    deleteActivity,
    getResponsesActivity,
    getResponseActivity,
    deleteResponseInActivity,
    editResponseInActivity,
    addResponseToActivity,
};
