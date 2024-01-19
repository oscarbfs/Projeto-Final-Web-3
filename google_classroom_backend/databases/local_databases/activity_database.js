let activityes = [];
let activityIdCounter = 1;

function createActivity(activityData, user_id) {
    try {
        const activity = {
            id: (activityIdCounter++).toString(),
            class_id: activityData.class_id,
            user_id: user_id,
            title: activityData.title,
            questions: activityData.questions,
            responses: []
        };

        activityes.push(activity);
        return { responseData: activity, status: 201 };
    } catch (error) {
        return { responseData: { error: `Falha ao criar aviso. ${error}` }, status: 400 };
    }
}

function addResponseToActivity(activityData, user_id) {
    // a mesma pessoa n pode responder mais que uma vez
    try {
        const index = activityes.findIndex(activity => activity.id === activityData.activity_id);

        if (index !== -1) {
            const userResponse = {
                user_id: user_id,
                response: activityData.response
            };

            activityes[index].responses.push(userResponse);
            return { responseData: activityes[index], status: 200 };
        } else {
            return { responseData: { error: `Atividade não encontrada.` }, status: 404 };
        }
    } catch (error) {
        return { responseData: { error: `Erro ao adicionar resposta à atividade. ${error}` }, status: 400 };
    }
}

function getClassActivityes(class_id) {
    try {
        const classActivityes = activityes.filter((activity) => activity.class_id === class_id);
        return { responseData: classActivityes, status: 200 };
    } catch (error) {
        return { responseData: { error: `Erro ao buscar atividades. ${error}` }, status: 400 };
    }
}

function updateActivity(updatedActivity, user_id) {
    try {
        const index = activityes.findIndex(
            (activity) => activity.id === updatedActivity.id && activity.user_id === user_id
        );

        if (index !== -1) {
            activityes[index].message = updatedActivity.message;
            return { responseData: activityes[index], status: 200 };
        } else {
            return { responseData: { error: `Atividade não encontrada ou você não tem permissão.` }, status: 404 };
        }
    } catch (error) {
        return { responseData: { error: `Erro ao atualizar atividade. ${error}` }, status: 400 };
    }
}

function deleteActivity(activityData, user_id) {
    try {
        const index = activityes.findIndex(
            (activity) => activity.id === activityData.id && activity.user_id === user_id
        );

        if (index !== -1) {
            activityes.splice(index, 1);
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
    addResponseToActivity,
    getClassActivityes,
    updateActivity,
    deleteActivity,
};
