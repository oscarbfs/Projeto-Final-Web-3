let classes = [];
let classIdCounter = 1;

function createClass(classData, creator_id) {
    try {
        classData.id = (classIdCounter++).toString();
        classData.creator_id = creator_id;
        classData.members_ids = [];
        delete classData.token;
        classes.push(classData);
        return { responseData: classData, status: 201 };
    } catch (error) {
        return { responseData: { error: `Falha ao criar turma. ${error}`}, status: 400 };
    }
}

function getClass(id) {
    try {
        const foundClass = classes.find(cls => cls.id === id);
        return foundClass 
            ? { responseData: foundClass, status: 200 } 
            : { responseData: { error: `Turma não encontrada.` }, status: 404 };
    } catch (error) {
        return { responseData: { error: `Falha ao buscar turma. ${error}` }, status: 400 };
        
    }
}

function searchClasses(name, discipline, section, room) {
    try {
        const foundClasses = classes.filter(cls =>
            (!name || cls.name === name) &&
            (!discipline || cls.discipline === discipline) &&
            (!section || cls.section === section) &&
            (!room || cls.room === room)
        );
        const classesLite = foundClasses.map(cls => {
            const clsLite = { ...cls };
            delete clsLite.members_ids;
            return clsLite;
        });

        return { responseData: classesLite, status: 200 };
    } catch (error) {
        return { responseData: { error: `Erro ao buscar turmas. ${error}` }, status: 400 };
    }
}

function getUserClasses(user_id) {
    try {
        const userClasses = classes.filter(cls => cls.creator_id === user_id || cls.members_ids.includes(user_id));
        const userClassesLite = userClasses.map(cls => {
            const clsLite = { ...cls };
            delete clsLite.members_ids;
            return clsLite;
        });
        return { responseData: userClassesLite, status: 200 };
    } catch (error) {
        return { responseData: { error: `Erro ao buscar turma. ${error}` }, status: 400 };
    }
    
}

function updateClass(classData, user_id) {
    try {
        const index = classes.findIndex(cls => cls.id === classData.id);
        delete classData.token;
        
        if (index !== -1 && classes[index].creator_id === user_id) {
            classes[index] = { ...classes[index], ...classData };
            return { responseData: classes[index], status: 200 };
        } else {
            return { responseData: { error: `Turma não encontrada, ou você não é o criador da turma.` }, status: 404 };
        }
    } catch (error) {
        return { responseData: { error: `Erro ao atualizar turma. ${error}` }, status: 400 };
    }
}

function deleteClass(classData, user_id) {
    try {
        const index = classes.findIndex(cls => cls.id === classData.id);
        
        if (index !== -1 && classes[index].creator_id === user_id) {
            classes.splice(index, 1);
            return { responseData: { message: 'Turma deletada com sucesso' }, status: 200 };
        } else {
            return { responseData: { error: `Turma não encontrada, ou você não é o criador da turma.` }, status: 404 };
        }
    } catch (error) {
        return { responseData: { error: `Erro ao deletar turma. ${error}` }, status: 400 };
    }
}

function joinClass(classData, user_id) {
    try {
        const index = classes.findIndex(cls => cls.id === classData.id);
        
        if (index !== -1) {
            if (!classes[index].members_ids) {
                classes[index].members_ids = [];
            }
            
            if (!classes[index].members_ids.includes(user_id) && classes[index].creator_id !== user_id) {
                classes[index].members_ids.push(user_id);
                return { responseData: classes[index], status: 200 };
            } else {
                return { responseData: { error: `Usuário já está na turma ou é o criador.` }, status: 400 };
            }
        } else {
            return { responseData: { error: `Turma não encontrada.` }, status: 404 };
        }
    } catch (error) {
        return { responseData: { error: `Erro ao entrar na turma. ${error}` }, status: 400 };
    }
}

function leaveClass(classData, user_id) {
    try {
        const index = classes.findIndex(cls => cls.id === classData.id);

        if (index !== -1) {
            if (classes[index].creator_id === user_id) {
                return { responseData: { error: `O criador não pode sair da turma.` }, status: 400 };
            }

            const memberIndex = classes[index].members_ids.indexOf(user_id);

            if (memberIndex !== -1) {
                classes[index].members_ids.splice(memberIndex, 1);
                return { responseData: classes[index], status: 200 };
            } else {
                return { responseData: { error: `Usuário não encontrado na turma.` }, status: 404 };
            }
        } else {
            return { responseData: { error: `Turma não encontrada.` }, status: 404 };
        }
    } catch (error) {
        return { responseData: { error: `Erro ao remover membro da turma. ${error}` }, status: 400 };
    }
}

module.exports = {
    createClass,
    getClass,
    searchClasses,
    getUserClasses,
    updateClass,
    deleteClass,
    joinClass,
    leaveClass,
};