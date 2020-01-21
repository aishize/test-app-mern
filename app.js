const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const PORT = config.get('port') || 5000
const app = express()

app.use(express.json({extended: true}))

app.use('/api/auth',require('./routes/auth.routes'))
app.use('/api/link',require('./routes/link.routes'))
app.use('/api/test',require('./routes/test.routes'))
async function start(){
try{
  await mongoose.connect(config.get('mongoUri'),{
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useCreateIndex: true
  })
  app.listen(PORT,()=> console.log(`app has been started on port ${PORT}`))
}catch(e){
  console.error(`server error: "${e.message}"`)
  process.exit(1)
}

}
start()