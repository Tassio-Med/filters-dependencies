import { createSlice } from "@reduxjs/toolkit";
import UsuarioController from  "../../../controllers/UsuarioController";

const initialState = {
  lista: null,
  usuarioSelecionado: null,
};

const usuarioSlice = createSlice({
  name: 'usuarios',
  initialState,
  reducers: {
    setListaUsuarios: (state, action) => {
      state.lista = action.payload;
    },

    setUsuarioSelecionado: (state, action) => {
      state.usuarioSelecionado = action.payload;
    },

    limparUsuarios: (state) => {
      state.lista = null;
      state.usuarioSelecionado = null;
    },
  },
});

export const { setListaUsuarios, setUsuarioSelecionado, limparUsuarios } = usuarioSlice.actions;

export const buscarUsuarios = () => async(dispatch) => {
  try {
    dispatch(setListaUsuarios({ loading: true, dados: null, total: 0, error: null }));

    const resultado = await UsuarioController.buscarUsuarios();

    dispatch(setUsuarioSelecionado(resultado));

  } catch (error) {
    dispatch(setListaUsuarios({
      loading: false,
      dados: null,
      total: 0,
      error: error.message
    }));
  }
};

export default usuarioSlice.reducer;

