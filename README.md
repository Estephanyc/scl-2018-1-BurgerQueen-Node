# Burger Queen - Backend con Node.js

Es una api diseñada para el proyecto https://github.com/Estephanyc/burger-queen, que permite consultar, agregar, editar y eliminar información correspondiente a pedidos, productos y usuarios de un restaurante.

####[API Docs](https://documenter.getpostman.com/view/1721181/RWgozeom)
####[API](https://bq-node-ybxlkxbnpf.now.sh/)

### HTTP API

#### `/auth`

* `POST /auth`

#### `/users`

* `GET /users`
* `GET /users/:uid`
* `POST /users`
* `PUT /users/:uid`
* `DELETE /users/:uid`

#### `/products`

* `GET /products`
* `GET /products/:productid`
* `POST /products`
* `PUT /products/:productid`
* `DELETE /products/:productid`

#### `/orders`

* `GET /orders`
* `GET /orders/:orderid`
* `POST /orders`
* `PUT /orders/:orderid`
* `DELETE /orders/:orderid`
