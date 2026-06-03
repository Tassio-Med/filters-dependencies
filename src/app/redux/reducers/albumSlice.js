import { createSlice } from "@reduxjs/toolkit";
import AlbumController from "../../../controllers/AlbumController";


const initialState = {
  lista: null,
  albumSelecionado: null,
}

const albumSlice = createSlice({
  name: 'albuns',
  initialState,
  reducers: {
    setListaAlbuns: (state, action) => {
      state.lista = action.payload;
    },

    setAlbumSelecionado: (state, action) => {
      state.albumSelecionado = action.payload;
    },

    limparAlbuns: (state) => {
      state.lista = null;
      state.albumSelecionado = null;
    },
  },
});

export const { setListaAlbuns, setAlbumSelecionado, limparAlbuns } = usuarioSlice.actions;

export const buscarAlbuns = (usuarioId) = async (dispatch) => {
  try {
    dispatch(setListaAlbuns({ loading: true, dados: null, error: null }));

    const resultado = await AlbumController.buscaAlbunsPorUsuario(usuarioId);

    dispatch(setAlbumSelecionado(resultado));

  } catch (error) {
    dispatch(setListaAlbuns({
      loading: false,
      dados: null,
      error: error.message
    }));
  }
};

export default albumSlice.reducer;


