const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const url = process.env.MONGO_URL || 'mongodb+srv://keith:yAk4wvBuSoPI5zO4@cluster0.ijmkqg9.mongodb.net/ecommerce'
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    connectDB
}