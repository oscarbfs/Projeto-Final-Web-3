const connectionDB = require('../connections/mysql_connection');

async function createClass(classData, creator_id) {
    try {
        const { name, section, discipline, room } = classData;
        const sql = 'INSERT INTO classes (name, creator_id, section, discipline, room) VALUES (?, ?, ?, ?, ?)';
        const result = await new Promise((resolve, reject) => {
            connectionDB.query(sql, [name, creator_id, section, discipline, room], (err, result) => {
                if (err) {
                    resolve(err);
                } else {
                    resolve(result);
                }
            });
        });

        const clsId = result.insertId;
        const cls = {
            id: clsId,
            creator_id,
            name,
            section,
            discipline,
            room,
            created_at: new Date().toISOString(),
            updated_at: null,
        };

        return { responseData: cls, status: 201 };
    } catch (error) {
        return { responseData: { error: `Falha ao criar turma. ${error}` }, status: 400 };
    }
}

async function getClass(id, user_id) {
    try {
        const sql = `
            SELECT classes.*, users.id AS creator_id, users.email AS creator_email, users.name AS creator_name, 
            GROUP_CONCAT(members.id) AS member_ids, GROUP_CONCAT(members.email) AS member_emails, GROUP_CONCAT(members.name) AS member_names
            FROM classes 
            LEFT JOIN users ON classes.creator_id = users.id 
            LEFT JOIN class_members ON classes.id = class_members.class_id
            LEFT JOIN users AS members ON class_members.member_id = members.id
            WHERE classes.id = ? AND (classes.creator_id = ? OR EXISTS (SELECT * FROM class_members WHERE class_id = ? AND member_id = ?))
            GROUP BY classes.id`;
        const result = await new Promise((resolve, reject) => {
            connectionDB.query(sql, [id, user_id, id, user_id], (err, result) => {
                if (err) {
                    resolve(err);
                } else {
                    resolve(result);
                }
            });
        });

        if (result.length > 0) {
            const cls = {
                id: result[0].id,
                creator: {
                    id: result[0].creator_id,
                    email: result[0].creator_email,
                    name: result[0].creator_name
                },
                name: result[0].name,
                section: result[0].section,
                discipline: result[0].discipline,
                room: result[0].room,
                members: result[0].member_ids ? result[0].member_ids.split(",").map((id, index) => ({
                    id: id,
                    email: result[0].member_emails.split(",")[index],
                    name: result[0].member_names.split(",")[index]
                })) : [],
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
        let sql = 'SELECT classes.*, users.id AS creator_id, users.email AS creator_email, users.name AS creator_name FROM classes LEFT JOIN users ON classes.creator_id = users.id WHERE 1=1';
        const params = [];

        if (name) {
            sql += ' AND classes.name = ?';
            params.push(name);
        }
        if (discipline) {
            sql += ' AND classes.discipline = ?';
            params.push(discipline);
        }
        if (section) {
            sql += ' AND classes.section = ?';
            params.push(section);
        }
        if (room) {
            sql += ' AND classes.room = ?';
            params.push(room);
        }

        sql += ' AND (classes.creator_id = ? OR EXISTS (SELECT * FROM class_members WHERE class_id = classes.id AND member_id = ?))';
        params.push(user_id, user_id);

        const result = await new Promise((resolve, reject) => {
            connectionDB.query(sql, params, (err, result) => {
                if (err) {
                    resolve(err);
                } else {
                    resolve(result);
                }
            });
        });
        
        const classes = result.map(cls => {
            return {
                id: cls.id,
                name: cls.name,
                section: cls.section,
                discipline: cls.discipline,
                room: cls.room,
                creator: {
                    id: cls.creator_id,
                    email: cls.creator_email,
                    name: cls.creator_name
                },
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

        const isCreatorQuery = 'SELECT creator_id FROM classes WHERE id = ?';
        const isCreatorResult = await new Promise((resolve, reject) => {
            connectionDB.query(isCreatorQuery, [id], (err, result) => {
                if (err) {
                    resolve(err);
                } else {
                    resolve(result);
                }
            });
        });

        if (isCreatorResult.length === 0 || isCreatorResult[0].creator_id !== user_id) {
            return { responseData: { error: `Turma não encontrada ou você não é o criador da turma.` }, status: 404 };
        }

        let updateQuery = 'UPDATE classes SET';
        const updateValues = [];
        if (name) {
            updateQuery += ' name = ?,';
            updateValues.push(name);
        }
        if (section) {
            updateQuery += ' section = ?,';
            updateValues.push(section);
        }
        if (discipline) {
            updateQuery += ' discipline = ?,';
            updateValues.push(discipline);
        }
        if (room) {
            updateQuery += ' room = ?,';
            updateValues.push(room);
        }
        updateQuery += ' updated_at = ? WHERE id = ?';
        updateValues.push(new Date().toISOString(), id);

        const updateResult = await new Promise((resolve, reject) => {
            connectionDB.query(updateQuery, updateValues, (err, result) => {
                if (err) {
                    resolve(err);
                } else {
                    resolve(result);
                }
            });
        });

        if (updateResult.affectedRows > 0) {
            return getClass(id, user_id);
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

        const isCreatorQuery = 'SELECT creator_id FROM classes WHERE id = ?';
        const isCreatorResult = await new Promise((resolve, reject) => {
            connectionDB.query(isCreatorQuery, [id], (err, result) => {
                if (err) {
                    resolve(err);
                } else {
                    resolve(result);
                }
            });
        });

        if (isCreatorResult.length === 0 || isCreatorResult[0].creator_id !== user_id) {
            return { responseData: { error: `Turma não encontrada ou você não é o criador da turma.` }, status: 404 };
        }

        const deleteResponsesQuery = 'DELETE FROM activity_responses WHERE activity_id IN (SELECT id FROM activitys WHERE class_id = ?)';
        await new Promise((resolve, reject) => {
            connectionDB.query(deleteResponsesQuery, [id], (err, result) => {
                if (err) {
                    resolve(err);
                } else {
                    resolve(result);
                }
            });
        });

        const deleteMembersQuery = 'DELETE FROM class_members WHERE class_id = ?';
        await new Promise((resolve, reject) => {
            connectionDB.query(deleteMembersQuery, [id], (err, result) => {
                if (err) {
                    resolve(err);
                } else {
                    resolve(result);
                }
            });
        });

        const deleteWarningsQuery = 'DELETE FROM warnings WHERE class_id = ?';
        await new Promise((resolve, reject) => {
            connectionDB.query(deleteWarningsQuery, [id], (err, result) => {
                if (err) {
                    resolve(err);
                } else {
                    resolve(result);
                }
            });
        });

        const deleteActivitiesQuery = 'DELETE FROM activitys WHERE class_id = ?';
        await new Promise((resolve, reject) => {
            connectionDB.query(deleteActivitiesQuery, [id], (err, result) => {
                if (err) {
                    resolve(err);
                } else {
                    resolve(result);
                }
            });
        });

        const deleteClassQuery = 'DELETE FROM classes WHERE id = ?';
        const result = await new Promise((resolve, reject) => {
            connectionDB.query(deleteClassQuery, [id], (err, result) => {
                if (err) {
                    resolve(err);
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
        
        const isMemberOrCreatorQuery = 'SELECT * FROM classes WHERE id = ? AND (creator_id = ? OR EXISTS (SELECT * FROM class_members WHERE class_id = ? AND member_id = ?))';
        const isMemberOrCreatorResult = await new Promise((resolve, reject) => {
            connectionDB.query(isMemberOrCreatorQuery, [id, user_id, id, user_id], (err, result) => {
                if (err) {
                    resolve(err);
                } else {
                    resolve(result);
                }
            });
        });

        if (isMemberOrCreatorResult.length > 0) {
            return { responseData: { error: `Você já é membro ou criador desta turma.` }, status: 400 };
        }
        
        const insertQuery = 'INSERT INTO class_members (class_id, member_id) VALUES (?, ?)';
        const insertResult = await new Promise((resolve, reject) => {
            connectionDB.query(insertQuery, [id, user_id], (err, result) => {
                if (err) {
                    resolve(err);
                } else {
                    resolve(result);
                }
            });
        });

        if (insertResult.affectedRows > 0) {
            return { responseData: { message: 'Entrou na turma com sucesso' }, status: 200 };
        } else {
            return { responseData: { error: `Turma não encontrada.` }, status: 404 };
        }
    } catch (error) {
        return { responseData: { error: `Erro ao entrar na turma. ${error}` }, status: 400 };
    }
}


async function leaveClass(classData, user_id) {
    try {
        const { id } = classData;
        const sql = 'DELETE FROM class_members WHERE class_id = ? AND member_id = ?';
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
                    resolve(err);
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
