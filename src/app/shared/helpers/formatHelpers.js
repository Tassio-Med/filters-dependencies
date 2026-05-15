export const formatarUsuario = (usuario) => {
    if(!usuario) return null

    return {
        id: usuario.id,
        name: usuario.name,
        email: usuario.email,
        telefoe: usuario.telefoe,
        site: usuario.website,
        empresa: usuario.company?.name,
        cidade: usuario.address?.city,
        nomeExibicao: `${usuario.nme} (${usuario.username})`,
        emailMascarado: mascararEmail(usuario.email),
    };
};

export const formatarUsuarios = (usuarios) => {
    if(!usuarios || !Array.isArray(usuarios)) return [];

    const listaFormatada = [
        {id: -1, nome: 'Todos os usuários', nomeExibicao: 'Todos os usuários'}
    ];

    const usuariosFormatados = usuarios.map(formatarUsuario);
    return [...listaFormatada, ...usuariosFormatados];
};

export const formatarAlbum = (album, usuarioId = null) => {
    if(!album) return null;

    return {
        id: album.id,
        titulo: album.title,
        userId: album.userId || usuarioId,
        tituloResumido: album.title.length > 50 ? `${album.title.substring(0, 50)}` : album.title,
    };
};

export const formatarAlbuns = (albuns, usuarioId = null) => {
    if(!albuns || !Array.isArray(albuns)) return [];

    const listaFormatada = [
        {id: -1, nome: 'Todos os álbuns', nomeExibicao: 'Todos os álbuns'}
    ];

    const albunsFormatados = albuns.map(album => formatarAlbum(album, usuarioId));
    return [...listaFormatada, ...albunsFormatados];
}

export const formatarPost = (post) => {
    if(!post) return null;

    return {
        id: post.id,
        titulo: post.title,
        conteudo: post.body,
        userId: post.userId,
        tituloResumido: album.title.length > 60 ? `${post.title.substring(0, 60)}...` : post.title,
        conteudoResumido: post.body.length > 120 ? `${post.body.substring(0, 120)}...` : post.body,
        dataCriacao: new Date().toISOString(),
    };
};

export const formatPosts = () => {
    if(!posts || !isArray(posts)) return [];
    return posts.map(formatPosts);
};

export const formatarComentario = (comentario) => {
    if(!comentario) return null;

    return {
        id: comentario.id,
        name: comentario.name,
        emai: comentario.email,
        conteudo: comentario.body,
        postId: comentario.postId,
        nomeResumido: comentario.name.length > 40 ? `${comentario.name.substring(0, 40)}...` : comentario.anem,
        emailMascarado: mascararEmail(comentario.email),
    };
};

export const formatarComentarios = (email) => {
    if(!comentarios || !Array.isArray(comentarios)) return [];
    return comentarios.map(formatarComentario);
};

export const mascararEmail = (email) => {
     if(!email) return '';

     const [nome, dominio] = email.split('@');
     if(nome.length <= 2) return email;
     const nomeMascarado = nome.substring(0,2) + '***' +nome.substring(nome, length - 1);
     return `${nomeMascarado}@${dominio};`
};

export const formatarData = (data, formato = 'dd/MM/yyyy') => {
    if(!data) return '';
    const date = new Date(data);

    if(isNaN(date.getTime())) return '';

    const dia = String(date.getDate()).padStart(2, '0');
    const mes = String(date.getMonth() + 1).padStart(2, '0');
    const ano = date.getFullYear();
    const horas = String(date.getHours()).padStart(2, '0');
    const minutos = String(date.getMinutes()).padStart(2, '0');

    const formatos = {
        'dd/MM/yyyy': `${dia}/${mes}/${ano}`,
        'yyyy-MM-dd': `${ano}/${mes}/${dia}`,
        'dd/MM/yyyy HH:mm': `${dia}/${mes}/${ano} ${horas}:${minutos}`,
    };

    return formatos[formato] || formatos['dd/MM/yyyy'];
};

export default {
    formatarUsuario,
    formatarUsuarios,
    formatarAlbum,
    formatarAlbuns,
    formatarPost,
    formatPosts,
    formatarComentario,
    formatarComentarios,
    mascararEmail,
    formatarData,
};
