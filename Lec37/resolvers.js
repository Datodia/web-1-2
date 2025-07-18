import { posts, users } from "./data.js"

export const resolvers = {
    Query: {
        users: () => {
            return users
        },
        posts: () => {
            return posts
        },
        user: (_, args) => {
            const id = Number(args.id)
            return users.find(el => el.id === id)
        }
    },
    Post: {
        author(parent){
            return users.find(el => el.id === parent.userId)
        }
    },
    User: {
        posts(parent){
            return posts.filter(el => el.userId === parent.id)
        }
    },
    Mutation: {
        createUser(_, {createUserDto: {name, age, isSmoker}}){
            const lastId = users[users.length - 1]?.id || 0
            const newUser = {
                id: lastId + 1,
                name,
                age,
                isSmoker,
            }
            posts.push(newUser)
            return newUser
        },
        deleteUser(_, args){
            const id = Number(args.id)
            const index = users.findIndex(el => el.id === id)
            if(index === -1) return 'user not found'

            users.splice(index, 1)
            return 'user deleted successfully'
        }
    }
} 