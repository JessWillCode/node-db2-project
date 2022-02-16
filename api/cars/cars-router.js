const Car = require('./cars-model');
const router = require('express').Router()
const { checkCarId, checkCarPayload, checkVinNumberValid,
    checkVinNumberUnique } = require('./cars-middleware');

router.get('/', (req, res, next) => {
    Car.getAll()
    .then(cars => {
        res.status(200).json(cars);
    })
    .catch(next);

})
router.get('/:id', checkCarId, (req, res, next) => {
    res.json(req.car);
})
router.post('/:id', checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique, (req, res, next) => {
    Car.create(req.car)
    .then(car => {
        res.json(car);
    })
    .catch(next);
})

router.use('/', (err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message
    })
})

module.exports = router;
