

const users = []


// user joins

export const joinUser =(id, username, room) => {
    const user = { id, username, room}


users.push(user)

return user
}

export const getUser = ( id ) => {
    return users.find(user => user.id === id)
}


