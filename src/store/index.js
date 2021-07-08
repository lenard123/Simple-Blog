import { createStore } from 'vuex'
import { db, auth } from '@/firebase/index.js'

const store = createStore({
    state: () => ({
        user: null,
        posts: [],
    }),

    mutations: {
        SET_USER: (state, user) => {
            state.user = user
        },

        CHANGE_POSTS: (state, { newIndex, oldIndex, doc, type }) => {

            const post = { id: doc.id, ...doc.data() }

            if (type === 'added') {

                state.posts.splice(newIndex, 0, post)

            } else if (type === 'modified') {

                state.posts.splice(oldIndex, 1)
                state.posts.splice(newIndex, 0, post)

            } else if (type === 'removed' ) {

                state.posts.splice(oldIndex, 1)

            }
        },

    },

    getters: {
        post: (state) => {
            return (id) => {
                return state.posts.find(post => post.id === id)
            }
        }        
    },

    actions: {

        bindAuth: ({ commit }) =>{
            auth.onAuthStateChanged(user => {
                commit('SET_USER', user)
            })
        },

        bindPosts: ({ commit }) => {
            db.collection('posts').select('title').onSnapshot( ref => {
                ref.docChanges().forEach(change => {
                    commit('CHANGE_POSTS', change)
                })
            })
        },

        createPost: (context, postData) => {
            return db.collection('posts').add(postData)
        },

        getPost: async (context, id) => {
            const post = await db.collection('posts').doc(id).get()
            return post.data()
        },

        login: async (context, { email, password}) => {
            await auth.signInWithEmailAndPassword(email, password)
        },

        logout: () => {
            auth.signOut()
        }
    }
})

export default store