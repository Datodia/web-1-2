
module.exports = (req, res, next) => {
    const email = req.headers['email']
    if(!email){
        return res.status(400).json({error: 'email is required'})
    }
    next()
}