// locals
const Locals=(req,res,next)=>{

    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    next();
}

module.exports = Locals;