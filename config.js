module.exports = {
    db: 'mongodb://localhost/healthy_product',

    port: 4000,
    secretKey: process.env.SECRET_KEY || 'test'
}