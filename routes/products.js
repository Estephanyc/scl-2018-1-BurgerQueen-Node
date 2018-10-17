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
                (/duplicate key/.test(err.message))
                    ? next(403)
                    : next(500)
            ));
    });
/*
    app.get('/products/:id', requireAuth, (req, resp) => resp.json(
        omitPrivateProps(req.user),
    ));

    app.delete('/products/:id', requireAuth, (req, resp, next) => {
        req.user.remove()
            .then(doc => resp.json(omitPrivateProps(doc)))
            .catch(next);
    }); */

    return next();
};
