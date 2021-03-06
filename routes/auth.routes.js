const {Router} = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const {check,validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const router = Router()
//api/auth/register
router.post(
  '/register',
  [
    check('email','Incorrectly email').isEmail(),
    check('password','minimum password length must be 6 characters').isLength({min: 6})
  ],
  async (req,res)=>{
  try{

    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json({
        errors: errors.array(),
        message: 'Incorrect registration data'
      })
    }
    const {email, password} = req.body
    const candidate = await User.findOne({email})

    if (candidate){
      return res.status(400).json({message: 'This user already exists'})
    }
    const hashedPassword = await bcrypt.hash(password,12)
    const user = new User({email, password: hashedPassword})
    await user.save()
    res.status(201).json({message: "user has been created"})

  }catch(e){
    res.status(500).json({message: "smth went wrong, try again",error: e.message})
  }
})
//api/auth/login
router.post(
  '/login',
  [
    check('email','enter correct email').normalizeEmail().isEmail(),
    check('password','enter correct password').exists()
  ],
  async (req,res)=>{
    try{
      const errors = validationResult(req)
      if(!errors.isEmpty()){
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect logining data'
        })
      }

     const {email,password} = req.body

     const user = await User.findOne({email})

     if(!user){
       return res.status(400).json({message:'User not found'})
     }

const isMatch = await bcrypt.compare(password,user.password)
    if (!isMatch){
      return res.status(400).json({message: 'Incorrect password, try again'})
    }
     const token = jwt.sign(
       {userId: user.id},
       config.get('jwtSecret'),
       {expiresIn: '1h'}
     )

    res.json({token, userId: user.id})

    }catch(e){
      res.status(500).json({message: "smth went wrong, try again"})
    }
})
module.exports = router
