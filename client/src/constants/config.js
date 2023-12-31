

export const API_IDENTIFICATION_MESSAGE = {
    laoding:{
        title:'Loading...',
        message: 'Data is being loaded, Plz wait'
    },
    success:{
        title: 'Success',
        message: "Data successfully loaded"
    },
    responseFailure:{
        titleL:'Error',
        message: 'An Error accured while fetching response from the server, plz try again'
    },
    requestFailure:{
        titleL:'Error',
        message: 'An Error accured while parsing request data , plz try again'
    },
    networkFailure:{
        titleL:'Error',
        message: 'An Error accured while connecting to the  server, plz try again'
    },

}

export const SERVICE_URLS = {
    userSignup: { url: '/signup', method: 'POST' },
    userLogin: { url: '/login', method: 'POST' },
    uploadFile: {url: 'file/upload', method: 'POST'},
    createPost: {url: 'create', method: "POST" },
    getAllPosts: {url: '/posts', method: "GET", params: true},
    getPostById: {url: 'post', method: "GET", query: true},
    updatePost: {url: 'update', method: 'PUT', query: true},
    deletePost: {url: 'delete', method: 'DELETE', query:true},
    newComment: {url: '/comment/new', method:'POST'},
    getAllComments: {url: 'comments', method:'GET', query:true},
    deleteComment: {url: 'comment/delete', method: 'DELETE', query: true}

}