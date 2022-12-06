const { faker } = require('@faker-js/faker')
faker.locale = 'es'

function newProduct() {
    return {
        _id: '123test',
        title: faker.commerce.productName(),
        thumbnail: faker.image.animals(600, 722, true),
        detail: faker.commerce.department(),
        price: faker.commerce.price(1, 100, 0),
        stock: faker.datatype.number(10)
    }
}

module.exports = newProduct
