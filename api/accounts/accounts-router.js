const router = require('express').Router()
const Accounts = require('./accounts-model')
const md = require('./accounts-middleware')

router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const accounts = await Accounts.getAll()
    res.json(accounts)
  }
  catch(err){
    next(err)
  }
  })

router.get('/:id', md.checkAccountId , async (req, res, next) => {
  // DO YOUR MAGIC
 try{
  const account = await Accounts.getById(req.params.id)
  res.json(account)
 }
  catch (err){
    next(err)
  }
})

router.post('/', md.checkAccountPayload, md.checkAccountNameUnique , 
  async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const newAccount = await Accounts.create(
      {name : req.body.name.trim(), 
        budget:req.body.budget})
    res.status(201).json(newAccount)
  }catch (err){
    next(err)
  }
})

router.put('/:id', (req, res, next) => {
  // DO YOUR MAGIC
});

router.delete('/:id', (req, res, next) => {
  // DO YOUR MAGIC
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(err.status || 500).json({
    message: err.message , 
    stack: err.stack,
  })
})

module.exports = router;
