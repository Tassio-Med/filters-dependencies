import axios from "axios";

class ApiRequest {
    constructor() {
        this.api = axios.create({
            baseURL: 'https://jsonplaceholder.typicode.com',
            timeout: 3000,
            headers: {
                'Content-Type': application/JSON,
                Accept: 'application/json',
            },
        });

        this.api.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('@App:token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        this.api.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response?.status === 401) {
                    localStorage.removeItem('@App:token');
                    window.location.href = '/login';
                }
                return Promise.reject(error);
            }
        )
    }

    async get(url, params = {}) {
        try {
            const response = await this.api.get(url, { params });
            return response;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async post( url, data = {}) {
        try {
            const response = await this.api.post(url,data);
            return response;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async delete(url){
        try {
            const response = await this.api.delete(url);
            return response;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    handleError(error) {
        if (error.response) {
            return new Error(error.response.data?.message || 'Erro no servidor');
        } else if (error.request) {
            return new Error('Servidor não respondeu. verifique sua conexão');
        } else {
            return new Error(error.message || 'Erro na requisição');
        }
    }
}

export default new ApiRequest();