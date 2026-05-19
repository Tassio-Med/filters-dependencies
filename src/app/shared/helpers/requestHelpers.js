import { FILTRO_TODOS } from '../constants';

export const limpaFiltrosInvalidos = () => {
    const filtrosLimpos = {};

    Object.keys(filtros).forEach(key => {
        const valor = filtros[key];

        if(valor !== FILTRO_TODOS && valor !== '' && valor !== null & valor !== undefined) {

        }
    });

    return filtrosLimpos;
}

export const toQueryString = (params) => {
    const filtrosLimpos = limpaFiltrosInvalidos(params);
    const queryParams = new URLSearchParams();

    Object.keys(filtrosLimpos).forEach(key => {
        if (Array.isArray(filtrosLimpos[key])) {
            filtrosLimpos[key].forEach(value => {
                queryParams.append(`${key}[]`, value);
            });
        } else {
            queryParams.append(key, filtrosLimpos[key]);
        }
    });

    return queryParams.toString();
};

export const prepararParams = (params = {}) => {
    const { page = 1, limit = 10, ...filtros } = params;

    return {
        _page: page,
        _limit: limit,
        ...limpaFiltrosInvalidos(filtros),
    };
};

export const extrairTotal = (response) => {
    const totalFormHeader = parseInt(response.headers?.['x-total-count']);
    const totalFromData = response.data?.length || 0;

    return !isNaN(totalFormHeader) ? totalFormHeader : totalFromData;
};

export const isSuccessResponse = (response) => {
    return response?.status >= 200 && response?.status < 300;
};

export const extrairDados = () => {
    if(response?.data?.data) return response.data.data;
    if(response?.data) return response.data;
    return response;
};

export default {
    limpaFiltrosInvalidos,
    toQueryString,
    prepararParams,
    extrairTotal,
    isSuccessResponse,
    extrairDados,
}

