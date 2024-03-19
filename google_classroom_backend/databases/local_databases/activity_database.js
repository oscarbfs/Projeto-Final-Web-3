let activitys = [];
let activityIdCounter = 1;

function createActivity(activityData, user_id) {
    try {
        if (!activityData.class_id) {
            return { responseData: { error: "O id da classe (class_id) é obrigatório." }, status: 400 };
        } else if (!activityData.title) {
            return { responseData: { error: "O título (title) da atividade é obrigatório." }, status: 400 };
        } else if (!activityData.body) {
            return { responseData: { error: "O corpo (body) da atividade é obrigatório." }, status: 400 };
        } 

        const activity = {
            id: (activityIdCounter++).toString(),
            class_id: activityData.class_id,
            user_id: user_id,
            title: activityData.title,
            body: activityData.body,
            responses: [],
            created_at: new Date().toISOString(),
            updated_at: null,
        };

        activitys.push(activity);
        return { responseData: activity, status: 201 };
    } catch (error) {
        return { responseData: { error: `Falha ao criar aviso. ${error}` }, status: 400 };
    }
}

function editResponseInActivity(activityData, user_id) {
    try {
        if (!activityData.activity_id || !activityData.response_id) {
            return { responseData: { error: "Os IDs da atividade (activity_id) e resposta (response_id) são obrigatórios." }, status: 400 };
        }

        const activityIndex = activitys.findIndex(activity => activity.id === activityData.activity_id);

        if (activityIndex !== -1) {
            const responseIndex = activitys[activityIndex].responses.findIndex(response => response.user_id === user_id && response.id === activityData.response_id);

            if (responseIndex !== -1) {
                activitys[activityIndex].responses[responseIndex].response = activityData.response;
                activitys[activityIndex].responses[responseIndex].updated_at = new Date().toISOString();
                return { responseData: activitys[activityIndex], status: 200 };
            } else {
                return { responseData: { error: `Resposta não encontrada para este usuário nesta atividade.` }, status: 404 };
            }
        } else {
            return { responseData: { error: `Atividade não encontrada.` }, status: 404 };
        }
    } catch (error) {
        return { responseData: { error: `Erro ao editar resposta na atividade. ${error}` }, status: 400 };
    }
}

function addResponseToActivity(activityData, user_id) {
    try {
        if (!activityData.activity_id) {
            return { responseData: { error: "O ID da atividade (activity_id) é obrigatório." }, status: 400 };
        }

        const index = activitys.findIndex(activity => activity.id === activityData.activity_id);

        if (index !== -1) {
            const existingResponseIndex = activitys[index].responses.findIndex(response => response.user_id === user_id);

            if (existingResponseIndex === -1) {
                const userResponse = {
                    id: (activitys[index].responses.length + 1).toString(),
                    user_id: user_id,
                    response: activityData.response,
                    created_at: new Date().toISOString(),
                    updated_at: null,
                };

                activitys[index].responses.push(userResponse);
                return { responseData: activitys[index], status: 200 };
            } else {
                return { responseData: { error: `Usuário já respondeu a esta atividade.` }, status: 400 };
            }
        } else {
            return { responseData: { error: `Atividade não encontrada.` }, status: 404 };
        }
    } catch (error) {
        return { responseData: { error: `Erro ao adicionar resposta à atividade. ${error}` }, status: 400 };
    }
}

function getClassActivitys(class_id, user_id) {
    try {
        const classActivitys = activitys.filter((activity) => activity.class_id === class_id);

        const modifiedActivitys = classActivitys.map(activity => {
            const modifiedActivity = { ...activity };
            if (user_id !== activity.user_id) {
                modifiedActivity.response = modifiedActivity.responses.find(
                    response => response.user_id === user_id
                );
                delete modifiedActivity.responses;
            }
            return modifiedActivity;
        });

        return { responseData: modifiedActivitys, status: 200 };
    } catch (error) {
        return { responseData: { error: `Erro ao buscar atividades. ${error}` }, status: 400 };
    }
}


function updateActivity(activityData, user_id) {
    try {
        if (!activityData.id) {
            return { responseData: { error: "O ID da atividade (id) é obrigatório." }, status: 400 };
        }

        const index = activitys.findIndex(
            (activity) => activity.id === activityData.id && activity.user_id === user_id
        );

        if (index !== -1) {
            activitys[index] = {
                id: activitys[index].id,
                class_id: activitys[index].class_id,
                user_id: activitys[index].user_id,
                title: activityData.title ?? activitys[index].title,
                body: activityData.body ?? activitys[index].body,
                responses: activitys[index].responses,
                created_at: activitys[index].created_at,
                updated_at: new Date().toISOString(),
            }

            return { responseData: activitys[index], status: 200 };
        } else {
            return { responseData: { error: `Atividade não encontrada ou você não tem permissão.` }, status: 404 };
        }
    } catch (error) {
        return { responseData: { error: `Erro ao atualizar atividade. ${error}` }, status: 400 };
    }
}

function deleteActivity(activityData, user_id) {
    try {
        if (!activityData.id) {
            return { responseData: { error: "O ID da atividade (id) é obrigatório." }, status: 400 };
        }

        const index = activitys.findIndex(
            (activity) => activity.id === activityData.id && activity.user_id === user_id
        );

        if (index !== -1) {
            activitys.splice(index, 1);
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
    updateActivity,
    deleteActivity,
};
