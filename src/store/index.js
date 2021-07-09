import { createStore } from 'vuex'
import { db, auth } from '@/firebase/index.js'

window.db = db

const store = createStore({
    state: () => ({
        user: null,
        posts: [],
        hasInitialized: false
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

        INITIALIZED: (state) => {
            state.hasInitialized = true
        }
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
            db.collection('posts').onSnapshot( ref => {
                ref.docChanges().forEach(change => {
                    commit('CHANGE_POSTS', change)
                })
                commit('INITIALIZED')
            })
        },

        createPost: (context, {title, description, content}) => {

            const batch = db.batch()
            const postsRef = db.collection('posts')
            const contentsRef = db.collection('contents')

            const postRef = postsRef.doc()
            const contentRef = contentsRef.doc()

            batch.set(postRef, {title, description, contentRef: `contents/${contentRef.id}` } )
            batch.set(contentRef, {content})

            batch.commit()
        },

        getPost: async (context, id) => {
            const post = context.state.posts.find(post => post.id === id) || (await db.collection('posts').doc(id).get()).data()
            post.content = (await db.doc(post.contentRef).get()).data().content
            return post
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