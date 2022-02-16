const Car = require('./cars-model');
const db = require('../../data/db-config');
const vinValidator = require('vin-validator');

const checkCarId = (req, res, next) => {
  Car.getById(req.params.id)
  .then(id => {
    if(!id) {
      res.status(404).json({
        message: `car with id ${id} is not found`
      })
    } else {
      req.car = id;
      next();
    }
  })
  .catch(next)
}

const checkCarPayload = (req, res, next) => {
  const { vin, make, model, mileage } = req.body;

  if(!vin) {
    res.status(400).json({
      message: 'vin is missing'
    })
  } else if(!make) {
    res.status(400).json({
      message: 'make is missing'
    })
  } else if(!model) {
    res.status(400).json({
      message: 'model is missing'
    })
  } else if(!mileage) {
    res.status(400).json({
      message: 'mileage is missing'
    })
  } else {
    next();
  }
}

const checkVinNumberValid = (req, res, next) => {
  Car.getById(req.params.id)
  .then(vin => {
    const isValidVin = vinValidator.validate(vin);
    if(isValidVin === true) {
      next();
    } else {
      res.status(400).json({
        message: `vin ${vin} is invalid`
      })
    }
  })
  .catch(next);
}

const checkVinNumberUnique = async (req, res, next) => {
  try {
    const existing = await db('cars').where('name', req.body.vin).trim().first();
    if(existing) {
      next({ status: 404, message: `vin ${req.body.vin} already exists`})
    }

  } catch(err) {
    next(err);
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}