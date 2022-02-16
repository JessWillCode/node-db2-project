
const cars = [
    {
        vin: '1111111111111',
        make: 'toyota',
        model: 'prius',
        mileage: 25,
        title: 'clean',
        transmission: 'manual'
    },
    {
        vin: '1111111111112',
        make: 'toyota',
        model: 'corolla',
        mileage: 20,
        title: 'salvage',
    },
    {
        vin: '1111111111113',
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