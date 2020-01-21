const {Router} = require('express')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.get('/',auth,(req,res)=> {
  try{
      const test = {
          name: 'Eugenii',
          sName: 'Schurov',
          text1: "It's my first project with MERN stack",
          text2: "also i firstly used konva into this page :)",
          text3: "I like it"
      }
    res.json(test)
  }catch(e){
    res.status(500).json({message: "smth went wrong, try again"})
  }
})

module.exports = router