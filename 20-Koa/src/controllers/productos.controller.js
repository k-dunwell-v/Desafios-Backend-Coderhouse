const ProductosDaos = require('../DAO/ProductosDaos')
const { logger } = require('../../logs/logger')

const db = new ProductosDaos()

const getProducts = async ( ) => {
    return db.get().then((products) => {
        return products

    }).catch((err) => {
        logger.error(err) ; throw err
    })
    
}

const getProductById = async ( id ) => {

    return db.get(id).then((product) => {
        return product

    }).catch((err) => {
        logger.error(err) ; throw err
    })
}

const postProduct = async ({title, price, thumbnail, detail, stock}) => {
    const product = {
        title:
        title,
        price:
        price,
        thumbnail:
        thumbnail,
        detail:
        detail,
        stock:
        stock
    }

    return db.add(product).then((id) => {
        return id
    }).catch((err) => {
        return err
    })
}

const putProduct = async ({_id, title, price, thumbnail, detail, stock}) => {

    const product = {title: title, price: price, thumbnail: thumbnail, detail: detail, stock: stock}

    return db.update(_id, product).then(() => {
        return product
    }).catch((err) => {
        logger.error(err) ; throw err
    })
}

const deleteProduct = async (id) => {

    return db.delete(id).then((result) => {
        console.log(result)
        return result
    }).catch((err) => {
        logger.error(err) ; throw err
    })
}

module.exports = {
    getProducts,
    getProductById,
    postProduct,
    putProduct,
    deleteProduct
}