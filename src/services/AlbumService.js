import api from '../api/ApiRequest';
import { API_ROUTES } from "../app/shared/constants";

class AlbumService {
  static async buscaAlbunsPorUsuario(usuarioId, params = {}) {
    try {
      const response = await api.get(API_ROUTES.USUARIOS.ALBUMS_BY_USER(usuarioId), params);

      return {
        dados: response.data,
        total: parseInt(response.headers['x-total-count'] || response.data.length),
        loading: false,
        error: null,
      };
    } catch (error) {
      return {
        dados: null,
        total: 0,
        loading: false,
        error: error.message,
      };
    }
  }

  static async buscarFotosDoAlbum(albumId, params = {}) {
    try {
      const response = await api.get(API_ROUTES.ALBUMS.PHOTOS_BY_ALBUM(albumId), params);

      return {
        dados: response.data,
        total: parseInt(response.headers['x-total-count'] || response.data.length),
        loading: false,
        error: null,
      };

    } catch (error) {
      return {
        dados: null,
        total: 0,
        loading: false,
        error: error.message,
      };
    }
  }

  static async buscaAlbumPorId(id) {
    try {
      const response = await api.get(API_ROUTES.ALBUMS.BY_ID(id));

      return {
        dados: response.data,
        loading: false,
        error: null,
      };

    } catch (error) {
      return {
        dados: null,
        loading: false,
        error: error.message,
      };
    }
  }
}

export default AlbumService;
