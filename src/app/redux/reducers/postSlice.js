import { createSlice } from "@reduxjs/toolkit";
import PostController from "../../../controllers/PostController";


const initialState = {
  lista: null,
  postSelecionado: null,
}

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers : {
    setListaPosts: (state, action) => {
      state.lista = action.payload;
    },

    setPostSelecionado: (state, action) => {
      state.postSelecionado = action.payload;
    },

    limparPosts: (state, action) => {
      state.lista = null;
      state.postSelecionado = null;
    },
  },
});

export const { setListaPosts, setPostSelecionado, limparPosts } = postSlice.actions;

export const buscarPosts = ({usuarioId, page = 1, limit = 10, search = ''}) = async (dispatch) => {
  try {
    dispatch(setListaPosts({ loading: true, dados: null, totoal: 0, error: null }));

    const resultado = await PostController.buscarPosts({usuarioId, page, limit, search});

    dispatch(setListaPosts(resultado));
  } catch (error) {
    dispatch(setListaPosts({
      loading: false,
      dados: null,
      total: 0,
      error: error.message
    }));
  }
};

export const buscaComentarios = (postId) = async (dispatch, getState) => {
  const { comentarios } = getState().posts;
  if(comentarios[postId]){
    console.log(`Comentário do post ${postId} já carregados em cache`);
    return;
  }

  try {
    dispatch(setComentarios({
      postId,
      dados: { loading: true, dados: null, error: null }
    }));

    const resultado = await PostController.buscarComentarios(postId);

    dispatch(setComentarios({postId, dados: resultado}));
  } catch (error) {
    dispatch(setComentarios({
      postId,
      dados: { loading: false, dados: null, error: error.message }
    }));
  }
};

export default postSlice.reducer;

