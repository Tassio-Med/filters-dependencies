export const API_ROUTES = {
    USUARIOS: {
        BASE: '/users',
        BY_ID: (id) => `/users/${id}`,
        POSTS_BY_USER: (userId) => `/users/${userId}/posts`,
        ALBUMS_BY_USER: (userId) => `/users/${userId}/albums`,
    },

    POSTS: {
        BASE: '/posts',
        BY_ID: (id) => `/posts/${id}`,
        COMMENTS_BY_POST: (postId) => `/posts/${postId}/comments`,

    },

    ALBUMS: {
        BASE: '/albums',
        BY_ID: (id) => `/albums/${id}`,
        PHOTOS_BY_ALBUM:  (postId) => `/albums/${almbumId}/photos`,
    }
}

export default API_ROUTES;