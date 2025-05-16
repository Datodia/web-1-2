
// const isViewer = (req, res, next) => {
//     const role = req.headers['role']
//     if(role !== 'viewer' && role !== 'editor' && role !== 'admin'){
//         return res.status(401).json({error: "permition denied"})
//     }
//     next()
// }

// const isEditor = (req, res, next) => {
//     const role = req.headers['role']
//     if(role !== 'editor' && role !== 'admin'){
//         return res.status(401).json({error: "permition denied"})
//     }
//     next()
// }

// const isAdmin = (req, res, next) => {
//     const role = req.headers['role']
//     if(role !== 'admin'){
//         return res.status(401).json({error: "permition denied"})
//     }
//     next()
// }

// module.exports = {isAdmin, isEditor, isViewer}


const aceessMiddleware = (...roles) => {
    return (req, res, next) => {
        const userRole = req.headers['role']
        if(!roles.includes(userRole)){
            return res.status(401).json({message: 'permition dineid'})
        }
        next()
    }
}

module.exports = aceessMiddleware