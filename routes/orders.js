const Order = require('../models/Order');
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

    app.param('id', (req, res, next, id) => {
        const { idOrder } = req;
console.log('id'+id)
        return Order.findByIdOrEmail(id)
            .then((doc) => {
                if (!doc) {
                    return next(404);
                }
                Object.assign(req, { order: doc });
                next();
            })
            .catch(next);
    });

    app.get('/orders', requireAuth, (req, resp) => {
        Order.paginate({}, getPaginationParamsFromRequest(req), (err, results) => {
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

    app.get('/orders/:id', requireAuth, (req, resp) => resp.json(
                omitPrivateProps(req.user),
    ));

    app.post('/orders', requireAuth, (req, resp, next) => {
        const { cliente, pedido } = req.body;

        Order.create({ cliente, pedido })
            .then(doc => resp.json(omitPrivateProps(doc)))
            .catch(err => (
                console.log(err)
                    (/duplicate key/.test(err.message))
                    ? next(403)
                    : next(500)
            ));
    });

    app.delete('/orders/:id', requireAuth, (req, resp, next) => {
        req.order.remove()
            .then(doc => resp.json(omitPrivateProps(doc)))
            .catch(next);
    });

    return next();
};
