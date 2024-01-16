let classes = [];
let classIdCounter = 1;

function createClass(classData, creator_id) {
    try {
        classData.id = classIdCounter++;
        classData.creator_id = creator_id;
        classes.push(classData);
        return { responseData: classData, status: 201 };
    } catch (error) {
        return { responseData: { error: "Falha ao criar turma"}, status: 400 };
    }
}

function getClass(id) {
    try {
        const foundClass = classes.find(cls => cls.id === id);
        return foundClass 
            ? { responseData: foundClass, status: 200 } 
            : { responseData: { error: 'Turma não encontrada' }, status: 404 };
    } catch (error) {
        return { responseData: { error: 'Falha ao buscar turma' }, status: 400 };
        
    }
}

function searchClasses(name, discipline) {
    try {
        const foundClasses = classes.filter(user =>
            (!name || user.name === name) &&
            (!discipline || user.discipline === discipline)
        );

        return { responseData: foundClasses, status: 200 };
    } catch (error) {
        return { responseData: { error: 'Erro ao buscar turmas' }, status: 400 };
    }
}

function getUserClasses(user_id) {
    try {
        const userClasses = classes.filter(cls => cls.creator_id === user_id || cls.membersIds.includes(user_id));
        return { responseData: userClasses, status: 200 };
    } catch (error) {
        return { responseData: { error: 'Erro ao buscar turma' }, status: 400 };
    }
    
}

function updateClass(classData, user_id) {
    try {
        const index = classes.findIndex(cls => cls.id === classData.id);
        
        if (index !== -1 && classes[index].creator_id === user_id) {
            classes[index] = { ...classes[index], ...classData };
            return { responseData: classes[index], status: 200 };
        } else {
            return { responseData: { error: 'Turma não encontrada' }, status: 404 };
        }
    } catch (error) {
        return { responseData: { error: 'Erro ao atualizar turma' }, status: 400 };
    }
}

function deleteClass(classData, user_id) {
    try {
        const index = classes.findIndex(cls => cls.id === classData.id);
        
        if (index !== -1 && classes[index].creator_id === user_id) {
            classes.splice(index, 1);
            return { responseData: { message: 'Turma deletada com sucesso' }, status: 200 };
        } else {
            return { responseData: { error: 'Turma não encontrada' }, status: 404 };
        }
    } catch (error) {
        return { responseData: { error: 'Erro ao deletar turma' }, status: 400 };
    }
}

function joinClass(classData, user_id) {
    const index = classes.findIndex(cls => cls.id === classData.id);

    if (index !== -1) {
        if (!classes[index].membersIds) {
            classes[index].membersIds = [];
        }

        if (!classes[index].membersIds.includes(user_id) && classes[index].creator_id !== user_id) {
            classes[index].membersIds.push(user_id);
            return { responseData: classes[index], status: 200 };
        } else {
            return { responseData: { error: 'Usuário já está na turma ou é o criador' }, status: 400 };
        }
    } else {
        return { responseData: { error: 'Turma não encontrada' }, status: 404 };
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
};
