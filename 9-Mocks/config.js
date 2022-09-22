const admin = require("firebase-admin");

const connectFirebase = async () => {
    try {
        const serviceAccount = require("./ecommerce-a3f0b-firebase-adminsdk-m7add-01b795e004.json");

        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
          databaseURL: "https://ecommerce-a3f0b-default-rtdb.firebaseio.com"
        });

    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    connectFirebase
}