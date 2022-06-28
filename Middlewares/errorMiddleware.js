module.exports = (err, req, res, next) =>{
    let {status , message , fails} = err

    if(!status)
        status = 400

    let result = {
        success : false,
        message : message || "Error",
        fails : fails || undefined
    }

    console.log(err)
    res.status(status).json(result)
}