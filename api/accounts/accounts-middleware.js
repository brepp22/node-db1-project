const db = require('./accounts-model')

function checkAccountPayload (req, res, next) {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
  const error = {status: 400}
  const { name , budget } = req.body
  if(name === undefined || budget === undefined){
    error.message = "name and budget are required"
    next(error)
  } else if (typeof budget !== 'number') {
    error.message = "budget of account must be a number"
    next(error)
  } else if ( name.trim().length < 3 || name.trim().length > 100){
    error.message = "name of account must be between 3 and 100"
    next(error)
  } else if (budget < 1 || budget > 100000000){
    error.message = "budget of account is too large or too small" 
    next(error)
  }
  if(error.message){
    next(error)
  } else{
    next()
  }
}

 async function checkAccountNameUnique(req, res, next) {
  // DO YOUR MAGIC
  try{
    const exisiting = await db('accounts')
    .where('name' , req.body.name.trim())
    .first()

    if(exisiting){
      next({status: 400 , message: "that name is taken" })
    } else{
      next()
    }
  }
  catch (err) {
    next(err)
  }
}

async function checkAccountId(req, res, next) {
  // DO YOUR MAGIC
  try {
    const accounts = await db.getById(req.params.id)
    if(accounts){
      req.account = accounts
      next ()
    } else {
      next({ status : 404 , message: "account not found" })
    }

  } catch (err) {
    next(err)
  }
}

module.exports = {
  checkAccountId,
  checkAccountNameUnique,
  checkAccountPayload,
}

