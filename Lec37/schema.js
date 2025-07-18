
export const typeDefs = `#graphql
    type User {
        id: ID,
        name: String,
        age: Int,
        isSmoker: Boolean
        posts: [Post]
    }

    type Post {
        id: ID,
        title: String,
        desc: String,
        author: User
    }

    type Query {
        users: [User]
        user(id: ID!): User
        posts: [Post]
    }

    input CraeteUserDto {
        name: String,
        age: Int,
        isSmoker: Boolean
    }

    type Mutation {
        createUser(createUserDto: CraeteUserDto!): User
        deleteUser(id: ID!): String
    }

`
