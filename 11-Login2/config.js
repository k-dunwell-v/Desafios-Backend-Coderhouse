const admin = require("firebase-admin");

const connectFirebase = async () => {
    try {
        const serviceAccount = {
            "type": "service_account",
            "project_id": "ecommerce-a3f0b",
            "private_key_id": "01b795e0046633d70d1fbd774f58da6a3d47227f",
            "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCidndQGZNLAqkN\n43ruy77YcKCDMlrQsO9QZmd3SHFwbI0n1SRBENyATjFchJ3MKcIaczXpRpieMAp7\ngF89VYYKSzhpkbEzfOVpYDPbdwFY41IeSqVjd54q3NTBMXyFDvS6lgZ1e/Sznven\nWEJGkOlB3Rk6Uj9tf+We03M5AqCVLAEqo9Y1N2BN3hzsl0uW+uHdgSrI0ZZtYwG7\n8DEb+Qd5o8/s6OMKKGPvhV9gr5A/g5cFaLZma3YwPzwPHHWH3E8TXSeZMqr/JSfn\nFEAlRhv0NxCJDW+drgTAkN8/KgryzRzZUTG1juEaij5rG2TMyQVjAHv53mXssYK0\nXEzIAQ09AgMBAAECggEAKRBShg+A2GPawSTvbK5ZFbIaEC9JHxip1KOdoVvROH5n\ni1rnZ/7QDSo2ddEbZYBkjHT0ensalllEPQUsjX8xeyaaIqztojr+bY0gbmd9Eq+a\nkQeDGEoi02iv6gkNFUC7gPHsvgNPzZrvs/+t+NIl8zzkZIZne9DpBCUkKZPNbQak\nQjJsClgQi4noYeJKS7QbiB/ykYIffPrXnjq8OxV4PdIioU5sg2BG7cTp1DAFJl8m\nLvvjNOFA3B1ADgn61is21C9+l4kDZynKS7TLd1BkatZ4LAymbBB4q6/GQTcBGiV2\n59Wdc+oe6vlsPStL9XESr2vAGfbyynY8jOlFjyZtbQKBgQDQby8WE7UPwNpfndiQ\ngbrYRB95cFHbLspzkHBaPhJEUnoks+9y8qA46QUe076amgWIiUny/4smLuOzcuwq\nN9QyfrNwKvYVRDVLdVz5zrrHOvTOc6hoGWLXiHyQWTdzhNFyhAnimyuhYh6X+ZR5\npEGDMolGWU1DHoxLo8JkB/XxDwKBgQDHiZsC+WdRWFrbPujTUL4r71ioIL6lVCo7\nyDc2bGEEGlB/mpE3kDO8lqU5mDWx54IoqY38F3sDiCnYdTZilZ8Zk4+KWZx+u0Yi\nnUe1LKZhTMWGzPqKyi306q1uFcpAP++gLM+sTLKrxnKd41rbQonTIZOTUL6u+Bpx\nes5Cz6cE8wKBgQCRjFJRFEnnSkAzbMIBhtW2lztzTZ+bcr0kncQXACk5VG6+mnem\nyQ5hLzbIJAyBYPRkN5pP+Wptq2iNsr5/bKTc7eTXeuiESTD+FGJsfpOm8+BnGhSL\nPM7suv5gviwemqy3TsSoXLrG4wGCFmI73xtwRiXd3hY5vGczmpLvzy9KuQKBgQCi\n5e0d5Xx6hVZPTTGIao+GkLThNTJPCMId4htpG9usHMuBES/im6ARIy8qMOANKEIz\nbhDTMFwmCwCWjUJkA2BK4hO6T+QZ9kuQsLQ87YG7R5CutyMHMX2JSBlkGPfvsgKv\n0kWMlWT8JVunGFgxTkX0jqHLD41MjJIR+L7w/lONDwKBgCiXq7dc8dlte/LfAE2L\nfzz48nP3Y4Z4a6hVvQeYk/vsO++LnfRmuIwgCRiQKTLLNlnS97U1PuM066Ogxh5A\nlTxycMBM8nzS5JdKkrCYn+BUk1x2VzN2jFP9XmGP1kvHPn0eOtlqRdw8vsoHCqLx\nFIb82xKl2aLX5Dgto8lnGUQd\n-----END PRIVATE KEY-----\n",
            "client_email": "firebase-adminsdk-m7add@ecommerce-a3f0b.iam.gserviceaccount.com",
            "client_id": "103645811309311146804",
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-m7add%40ecommerce-a3f0b.iam.gserviceaccount.com"
          }

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