import { AlbumService } from "../services"
import { formatarAlbuns } from "../app/shared/helpers/formatHelpers"
import { isValidId } from '../app/shared/helpers/validateHelper';
import { FILTRO_TODOS as CONST_FILTRO_TODOS } from "../app/shared/constants";

class AlbumController {
  static async buscaAlbunsPorUsuario(usuarioId, params={}) {
    if(!usuarioId || usuarioId === CONST_FILTRO_TODOS) {
      return {
        dados: [],
        total: 0,
        loading: false,
        error: null,
      };
    }

    if(!isValidId(usuarioId)) {
      return {
        dados: null,
        total: 0,
        loading: false,
        error: 'ID do usuário inválido para buscar álbuns'
      };
    }

    try {
      const response = await AlbumService.buscaAlbunsPorUsuario(usuarioId, params);

      if(response.error) {
        throw new Error(response.error);
      }

      const dadosFormatados = formatarAlbuns(response.dados, usuarioId);

      return {
        dados: dadosFormatados,
        total: response. total,
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

  static async buscaFotosDoAlbum(albumId, params={}) {
    if(!isValidId(albumId)) {
      return {
        dados: null,
        total: 0,
        loading: false,
        error: 'ID do ábum inválido',
      };
    }

    try {
      const response = await AlbumService.buscarFotosDoAlbum(albumId, params);

      if(response.error) {
        throw new Error(response.error);
      }

      return {
        dados: response.dados,
        total: response. total,
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
  
  static async usuarioTemAlbuns(usuarioId) {
    const result = await this.buscaAlbunsPorUsuario(usuarioId, {limit: 1});
    return result.dados && result.dados.length > 1;
  }
}

export default AlbumController;