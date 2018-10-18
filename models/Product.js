const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');


const ProductSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    precio: {
        type: Number,
        required: true,
    },
});
ProductSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Product', ProductSchema);
