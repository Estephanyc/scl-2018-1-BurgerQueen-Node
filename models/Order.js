const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');


const OrderSchema = new mongoose.Schema({
    cliente: {
        type: String,
        unique: false,
        required: true,
    },
    pedido: [String],
});
OrderSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Order', OrderSchema);
