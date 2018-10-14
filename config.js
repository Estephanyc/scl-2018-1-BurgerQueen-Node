exports.port = process.argv[2] || process.env.PORT || 8080;
exports.mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/default';
exports.secret = process.env.JWT_SECRET || 'this is actually supposed to be a secret'; // JWT secret
exports.adminEmail = process.env.ADMIN_EMAIL || 'admin@localhost';
exports.adminPassword = process.env.ADMIN_PASSWORD || 'estephany';

//mongodb://admin:<PASSWORD>@cluster0-shard-00-00-oikjc.mongodb.net:27017,cluster0-shard-00-01-oikjc.mongodb.net:27017,cluster0-shard-00-02-oikjc.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true