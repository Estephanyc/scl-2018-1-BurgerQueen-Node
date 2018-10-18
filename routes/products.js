const Product = require('../models/Product');
const {
    requireAuth,
} = require('../middleware/auth');
const {
    createPrivatePropsFilter,
    getPaginationParamsFromRequest,
    buildLinkHeader,
} = require('../lib/util');

const omitPrivateProps = createPrivatePropsFilter(['password']);

module.exports = (app, next) => {
    app.param('productId', (req, res, next, id) => {
        console.log('buscar' + id)
        return Product.findById(id)
            .then((doc) => {
                console.log(doc)
                if (!doc) {
                    return next(404);
                }
                Object.assign(req, { product: doc });
                return next();
            })
            .catch(next);
    });
    app.get('/products/:productId', requireAuth, (req, resp) => {
        return resp.json(
            omitPrivateProps(req.product),
        )
    });
    app.get('/products', requireAuth, (req, resp) => {
        Product.paginate({}, getPaginationParamsFromRequest(req), (err, results) => {
            if (err) {
                return next(err);
            }
            const linkHeader = buildLinkHeader(req, results);
            if (linkHeader) {
                resp.header({ Link: linkHeader });
            }
            resp.json(results.docs.map(omitPrivateProps));
        });
    });

    app.post('/products', requireAuth,  (req, resp, next) => {
        const { nombre, precio } = req.body;

        Product.create({ nombre, precio })
            .then(doc => resp.json(omitPrivateProps(doc)))
            .catch(err => (
                console.log(err)
                (/duplicate key/.test(err.message))
                    ? next(403)
                    : next(500)
            ));
    });
    app.delete('/products/:productId', requireAuth, (req, resp, next) => {
        req.product.remove()
            .then(doc => resp.json(omitPrivateProps(doc)))
            .catch(next);
    });
    app.put('/products/:productId', requireAuth, (req, resp, next) => {

        Object.assign(req.product, req.body);

        req.product.save()
            .then(doc => resp.json(omitPrivateProps(doc)))
            .catch(next);
    });
    return next();
};
