const connectionDB = require('../connections/mysql_connection');

async function createClass(classData, creator_id) {
    try {
        const { name, section, discipline, room } = classData;
        const sql = 'INSERT INTO classes (name, creator_id, section, discipline, room) VALUES (?, ?, ?, ?, ?)';
        const result = await new Promise((resolve, reject) => {
            connectionDB.query(sql, [name, creator_id, section, discipline, room], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
        
        const cls = {
            id: result.insertId,
            creator_id,
            name,
            section,
            discipline,
            room,
            members_ids: [],
            created_at: new Date().toISOString(),
            updated_at: null,
        };

        return { responseData: cls, status: 201 };
    } catch (error) {
        return { responseData: { error: `Falha ao criar turma. ${error}`}, status: 400 };
    }
}

async function getClass(id, user_id) {
    try {
        const sql = 'SELECT * FROM classes WHERE id = ? AND (creator_id = ? OR FIND_IN_SET(?, members_ids))';
        const result = await new Promise((resolve, reject) => {
            connectionDB.query(sql, [id, user_id, user_id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        if (result.length > 0) {
            const cls = {
                id: result[0].id,
                creator_id: result[0].creator_id,
                name: result[0].name,
                section: result[0].section,
                discipline: result[0].discipline,
                room: result[0].room,
                members_ids: result[0].members_ids.split(',').map(Number),
                created_at: result[0].created_at,
                updated_at: result[0].updated_at,
            };

            return { responseData: cls, status: 200 };
        } else {
            return { responseData: { error: `Turma não encontrada ou você não tem permissão.` }, status: 404 };
        }
    } catch (error) {
        return { responseData: { error: `Falha ao buscar turma. ${error}` }, status: 400 };
    }
}

async function searchClasses(name, discipline, section, room, user_id) {
    try {
        let sql = 'SELECT * FROM classes WHERE 1=1';
        const params = [];

        if (name) {
            sql += ' AND name = ?';
            params.push(name);
        }
        if (discipline) {
            sql += ' AND discipline = ?';
            params.push(discipline);
        }
        if (section) {
            sql += ' AND section = ?';
            params.push(section);
        }
        if (room) {
            sql += ' AND room = ?';
            params.push(room);
        }

        sql += ' AND (creator_id = ? OR FIND_IN_SET(?, members_ids))';
        params.push(user_id, user_id);

        const result = await new Promise((resolve, reject) => {
            connectionDB.query(sql, params, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        const classes = result.map(cls => {
            return {
                id: cls.id,
                creator_id: cls.creator_id,
                name: cls.name,
                section: cls.section,
                discipline: cls.discipline,
                room: cls.room,
                members_ids: cls.members_ids.split(',').map(Number),
                created_at: cls.created_at,
                updated_at: cls.updated_at,
            };
        });

        return { responseData: classes, status: 200 };
    } catch (error) {
        return { responseData: { error: `Erro ao buscar turmas. ${error}` }, status: 400 };
    }
}

async function updateClass(classData, user_id) {
    try {
        const { id, name, section, discipline, room } = classData;
        const sql = 'UPDATE classes SET name = ?, section = ?, discipline = ?, room = ?, updated_at = ? WHERE id = ? AND creator_id = ?';
        const result = await new Promise((resolve, reject) => {
            connectionDB.query(sql, [name, section, discipline, room, new Date().toISOString(), id, user_id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        if (result.affectedRows > 0) {
            return { responseData: { message: 'Turma atualizada com sucesso' }, status: 200 };
        } else {
            return { responseData: { error: `Turma não encontrada ou você não é o criador da turma.` }, status: 404 };
        }
    } catch (error) {
        return { responseData: { error: `Erro ao atualizar turma. ${error}` }, status: 400 };
    }
}

async function deleteClass(classData, user_id) {
    try {
        const { id } = classData;
        const sql = 'DELETE FROM classes WHERE id = ? AND creator_id = ?';
        const result = await new Promise((resolve, reject) => {
            connectionDB.query(sql, [id, user_id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        if (result.affectedRows > 0) {
            return { responseData: { message: 'Turma deletada com sucesso' }, status: 200 };
        } else {
            return { responseData: { error: `Turma não encontrada ou você não é o criador da turma.` }, status: 404 };
        }
    } catch (error) {
        return { responseData: { error: `Erro ao deletar turma. ${error}` }, status: 400 };
    }
}

async function joinClass(classData, user_id) {
    try {
        const { id } = classData;
        const sql = 'UPDATE classes SET members_ids = CONCAT(IFNULL(members_ids, ""), ?, ",") WHERE id = ? AND creator_id != ?';
        const result = await new Promise((resolve, reject) => {
            connectionDB.query(sql, [user_id, id, user_id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        if (result.affectedRows > 0) {
            return { responseData: { message: 'Entrou na turma com sucesso' }, status: 200 };
        } else {
            return { responseData: { error: `Turma não encontrada ou você é o criador da turma.` }, status: 404 };
        }
    } catch (error) {
        return { responseData: { error: `Erro ao entrar na turma. ${error}` }, status: 400 };
    }
}

async function leaveClass(classData, user_id) {
    try {
        const { id } = classData;
        const sql = 'UPDATE classes SET members_ids = TRIM(BOTH "," FROM REPLACE(CONCAT(",", IFNULL(members_ids, ""), ","), CONCAT(",", ?, ","), ",")) WHERE id = ? AND creator_id != ?';
        const result = await new Promise((resolve, reject) => {
            connectionDB.query(sql, [user_id, id, user_id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        if (result.affectedRows > 0) {
            return { responseData: { message: 'Saiu da turma com sucesso' }, status: 200 };
        } else {
            return { responseData: { error: `Turma não encontrada ou você é o criador da turma.` }, status: 404 };
        }
    } catch (error) {
        return { responseData: { error: `Erro ao sair da turma. ${error}` }, status: 400 };
    }
}

async function isCreator(classId, userId) {
    try {
        const sql = 'SELECT creator_id FROM classes WHERE id = ?';
        const result = await new Promise((resolve, reject) => {
            connectionDB.query(sql, [classId], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        if (result.length > 0) {
            return result[0].creator_id === userId;
        } else {
            return null;
        }
    } catch (error) {
        return undefined;
    }
}

module.exports = {
    createClass,
    getClass,
    searchClasses,
    updateClass,
    deleteClass,
    joinClass,
    leaveClass,
    isCreator,
};
