const Car = require('./cars-model');
const db = require('../../data/db-config');
const vin = require('vin-validator');

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
    req.car = req.body;
    next();
  }
}

const checkVinNumberValid = (req, res, next) => {
    if(vin.validate(req.body.vin)) {
      next();
    } else {
      res.status(400).json({
        message: `vin ${req.body.vin} is invalid`
      })
    }
  }


const checkVinNumberUnique = async (req, res, next) => {
Car.getByVin(req.body.vin)
.then(vin => {
  if(vin) {
    res.status(400).json({
      message: `vin ${req.body.vin} already exists`
    })
  } else {
    next();
  }
})
.catch(next);
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}