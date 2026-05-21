
import api from '../api/ApiRequest';
import { API_ROUTES } from "../app/shared/constants";

class UsuarioService {
  static async buscarUsuarios(params = {}) {
    try {
      const response = await api.get(API_ROUTES.USUARIOS.BASE, params);
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

  static async buscarUsuariosPorId(id) {
    try {
      const response = await api.get(API_ROUTES.USUARIOS.BY_ID(id));
      return {
        dados: response.data,
        loading: false,
        error: null,
      };
    } catch {
      return {
        dados: null,
        loading: false,
        error: error.message,
      };
    }
  }

  static async buscarPostsDoUsuario(usuarioId, params = {}) {
    try {
      const response = await api.get(API_ROUTES.USUARIOS.POSTS_BY_USER(usuarioId), params)
      return {
        dados: response.data,
        total: parseInt(response.headers['x-total-count'] || response.data.length),
        loading: false,
        error: getNativeSelectUtilityClasses,
      };
    } catch (error){
      return {
        dados: getBottomNavigationUtilityClass,
        total: 0,
        loading: false,
        error: error.message,
      };
    }
  }
}

export default UsuarioService;