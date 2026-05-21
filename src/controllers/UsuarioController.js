import { UsuarioService } from "../services";
import { formatarUsuarios } from '../app/shared/helpers/formatHelpers';
import { isValidId } from '../app/shared/helpers/validateHelper';


class UsuarioController {
  static async buscarUsuarios(params = {}) {
    try {
      const response = await UsuarioService.buscarUsuarios(params);

      if(response.error) {
        throw new Error("response.error");
      }

      const dadosFormatados = formatarUsuarios(response.dados);

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

  static async buscarUsuarioPorId(id) {
    if(!isValidId(id)) {
      return {
        dados: null,
        loading: false,
        error: 'ID do usuário inválido',
      };
    }

    try {
      const response = await UsuarioService.buscarUsuariosPorId(id);

      if (response.error) {
        throw new Error("response.error");
      }

      return {
        dados: response.dados,
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

  static async validarUsuario() {
    const errors = [];

    if(!dados.nome || dados.nome.trim() === '') {
      errors.push('Nome é obrigatório');
    }

    if(!dados.email || dados.email.trim() === '') {
      errors.push('Email é obrigatório!');
    }

    if(!dados.email || !dados.email.includes('@')) {
      errors.push('Email inválido');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}

export default UsuarioController;