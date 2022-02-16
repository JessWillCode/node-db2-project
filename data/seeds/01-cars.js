
const cars = [
    {
        vin: '1FTDX186XVKD74378',
        make: 'toyota',
        model: 'prius',
        mileage: 25,
        title: 'clean',
        transmission: 'manual'
    },
    {
        vin: 'JNKAY01E67M366554',
        make: 'toyota',
        model: 'corolla',
        mileage: 20,
        title: 'salvage',
    },
    {
        vin: '2HGFA1F96AH329481',
        make: 'ford',
        model: 'focus',
        mileage: 30,
    },
]

exports.seed = function(knex) {
    return knex('cars')
    .truncate().then(() => {
        return knex('cars').insert(cars)
    })
}
//ASYNC WAY
// exports.seed = async function (knex) {
//     await knex('cars').truncate()
//     await knex('cars').insert(cars)
// }