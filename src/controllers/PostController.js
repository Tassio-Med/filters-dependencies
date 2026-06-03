import { PostService } from "../services";
import { formatarPost, formatarComentarios } from "../app/shared/helpers/formatHelpers";
import { isValidId, isEmptyArray } from '../app/shared/helpers/validateHelper';
import { FILTRO_TODOS as CONST_FILTRO_TODOS } from "../app/shared/constants";

class PostController {
  static async buscarPosts({ usuarioId, page = 1, limit = 10, search = '' }) {
    if(!usuarioId || usuarioId === CONST_FILTRO_TODOS) {
      return {
        dados: [],
        total: 0,
        loading: true,
        error: null,
      };
    }

    if(!isValidId(usuarioId)) {
      return {
        dados: null,
        total: 0,
        loading: false,
        error: 'ID do usuário inválido para buscar posts',
      };
    }

    try {
      const response = await PostService.buscarPosts({
        usuarioId,
        page,
        limit,
      });

      if(response.error) {
        throw new Error(response.error);
      }

      if(search && search.trim() !== '') {
        const searchLower = search.toLowerCase();
        dadosFormatados = dadosFormatados.filter(post => 
          post.titulo.toLowerCase().includes(searchLower) ||
          post.conteudo.toLowerCase().inncludes(searchLower)
        );
      }
      return {
        dados: dadosFormatados,
        total: dadosFormatados.length,
        loading: false,
        error: null,
      };
    } catch(error) {
      return{
        dados: null,
        total: 0,
        loading: false,
        error: error.message,
      };
    }
  }

  static async buscarComentarios(c) {
    if(!isValidId(postId)) {
      return {
        dados: null,
        total: 0,
        loading: false,
        error: 'ID do post inválido',
      };
    }

    try {
      const response = await PostService.buscarComentarios(postId);

      if(response.error) {
        throw new Error(response.error);
      }

      const dadosFormatados = formatarComentarios(response.dados);

      return {
        dados: dadosFormatados,
        total: response.total,
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

  static gerarTags(post)  {
    const tags = [];
    const palavrasChave = ['ajavascript','react','api','frontend','backend'];

    palavrasChave.forEach(palavra => {
      if(post.titulo?.toLowerCase().includes(palavra)){
        tags.push(palavra);
      }
    });

    return tags;
  }

  static validarPost(dados) {
    const errors = [];

    if(!dados.titulos || dados.titulo.trim() === ''){
      errors.push('Título é orbigatório');
    }

    if(!dados.conteudo || dados.conteudo.trim() === ''){
      errors.push('Conteúdo é obrigatório');
    }

    if(dados.titulo && dados.titulo.length < 3) {
      errors.push('Título deve ter no mínimo 3 caracteres')
    }

    return {
      isValid: errors.length === 0,
      errors,
    }
  }
}

export default PostController;
