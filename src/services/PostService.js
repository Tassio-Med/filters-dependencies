import api from '../api/ApiRequest';
import { API_ROUTES } from "../app/shared/constants";
import { prepararParams, extrairTotal } from '../app/shared/helpers/requestHelpers';


class PostService {
  static async buscarPosts(params={}){
    try{
      if (!params.usuarioId || params.usuarioId === -1){
        return {
          dados: [],
          total: 0,
          loading: false,
          error: null,
        };
      }

      const paramsPreparados = prepararParams(params);
      const response = await api.get(API_ROUTES.POSTS.BASE, paramsPreparados);

      return {
        dados: response.data,
        total: extrairTotal(response),
        loading: false,
        error: null,
      };
    } catch(error) {
      return {
        dados: null,
        total: 0,
        loading: false,
        error: error.message,
      };
    }
  }

  static async buscarComentarios(id) {
    try {
      const response = await api.get(API_ROUTES.POSTS.COMMENTS_BY_POST(id));

      return {
        dados: response.data,
        total: parseInt(response.headers['x-total-count'] || response.data.length),
        loading: false,
        error: null,
      };
    } catch(error) {
      return {
        dados: null,
        total: 0,
        loading: false,
        error: error.message,
      };
    }
  }

  static async buscarPostPorId(id) {
    try {
      const response = await api.get(API_ROUTES.POSTS.BY_ID(id));

      return {
        dados: response.data,
        loading: false,
        error: null,
      };
    } catch(error) {
      return {
        dados: null,
        loading: false,
        error: error.message,
      };
    }
  }

  static async criarPost(dados) {
    try {
      const response = await api.get(API_ROUTES.POSTS.BASE, dados);
      
      return {
        dados: response.data,
        loading: false,
        error: null,
      }
    } catch(error) {
      return {
        dados: null,
        loading: false,
        error: error.message,
      };
    }
  }
}

export default PostService;