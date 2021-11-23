module.exports = (capability)=>{
    return (req,res,next)=>{
        try {
            if (req.user.capabilties.includes(capability)) {
              next();
            }
            else {
              next('Access Denied');
            }
          } catch (e) {
            next('Invalid Login');
          }
      
    }
}