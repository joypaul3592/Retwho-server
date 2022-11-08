# CART ENDPOINTS
This document includes usage of **[Add to Cart][Cart]**, **[Get Cart Items][all]**, **[Delete Cart][delete]**, **[Update Product Quantity][update]**
***
## Add to Cart
### Sample Request Format for Add to Cart
```json
PUT https://retwho.herokuapp.com/cart HTTP/1.1
content-type: application/json

{
  "items": [
    {
      "product": "62e64eac10a402fe17380a54",
      "quantity": 2
    },
    {
      "product": "62d8e293c22786677a0b1289",
      "quantity": 15
    },
    {
      "product": "62e64ec210a402fe17380a5a",
      "quantity": 2
    },
    {
      "product": "62dbfe0c3ab65157879fe60d",
      "quantity": 2
    }
  ]
}
```

### Sample Response to Success
```json
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8

{
  "cart": {
    "_id": "62e7657469be529f5bfc0eab",
    "user": "62e26fa52ea93e7bff5cd4f8",
    "__v": 0,
    "items": [
      {
        "product": "62e64eac10a402fe17380a54",
        "quantity": 2,
        "price": 5,
        "total": 10,
        "_id": "62e76574fbc2b1a157d6926e"
      },
      {
        "product": "62e64ec210a402fe17380a5a",
        "quantity": 2,
        "price": 5,
        "total": 10,
        "_id": "62e76574fbc2b1a157d6926f"
      }
    ],
    "net_total": 20
  },
  "errors": [
    "Product: 62d8e293c22786677a0b1289 is avaiable of quantity 10.",
    "Product: 62dbfe0c3ab65157879fe60d is avaiable of quantity 0."
  ]
}
```

### Sample Response to Error
#### Failed validation
```json
// Response object will contain a **error** message with HTTP Response Code

HTTP/1.1 500 INTERNAL SERVER ERROR
X-Powered-By: Express
Content-Type: application/json; charset=utf-8

{
  "error": "Cart validation failed: items: Path `items` is required."
}
```

***
## Get Cart Items
### Sample Request Format for Get Cart Items
```json
GET https://retwho.herokuapp.com/cart HTTP/1.1
```

### Sample Response to Success
```json
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8

{
  "cart": {
    "_id": "62e7657469be529f5bfc0eab",
    "user": "62e26fa52ea93e7bff5cd4f8",
    "__v": 0,
    "items": [
      {
        "product": {
          "prices": {
            "basic": 5,
            "standard": 7,
            "premium": 8
          },
          "productOffer": {
            "basic": [],
            "standard": [],
            "premium": []
          },
          "_id": "62e64eac10a402fe17380a54",
          "user": "62e26fa52ea93e7bff5cd4f8",
          "productName": "Hello Fresh",
          "department": "62da711084146cb9623f55e0",
          "uniqueCode": "poiuytre",
          "tags": [],
          "quantity": 10,
          "status": "ACTIVE",
          "email": "hello@test.com",
          "createdAt": "2022-07-31T09:43:08.818Z",
          "updatedAt": "2022-07-31T09:43:08.818Z",
          "__v": 0
        },
        "quantity": 2,
        "price": 5,
        "total": 10,
        "_id": "62e766239cca0ff00a3c44ac"
      },
      {
        "product": {
          "prices": {
            "basic": 5,
            "standard": 7,
            "premium": 8
          },
          "productOffer": {
            "basic": [],
            "standard": [],
            "premium": []
          },
          "_id": "62e64ec210a402fe17380a5a",
          "user": "62e26fa52ea93e7bff5cd4f8",
          "productName": "Hello Fresh 2",
          "department": "62da711084146cb9623f55e0",
          "uniqueCode": "poiuytre",
          "tags": [],
          "quantity": 10,
          "status": "ACTIVE",
          "email": "hello@test.com",
          "createdAt": "2022-07-31T09:43:30.320Z",
          "updatedAt": "2022-07-31T09:43:30.320Z",
          "__v": 0
        },
        "quantity": 2,
        "price": 5,
        "total": 10,
        "_id": "62e766239cca0ff00a3c44ad"
      }
    ],
    "net_total": 20
  }
}
```

***
## Delete Cart
### Sample Request Format for Delete Cart
```json
// prodId is the _id of the item
DELETE https://retwho.herokuapp.com/cart?prodId=62e955be1b2ec15131c0fbb4 HTTP/1.1
```

### Sample Response to Success
```json
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8

{
  "cart": {
    "_id": "62e7657469be529f5bfc0eab",
    "user": "62e26fa52ea93e7bff5cd4f8",
    "__v": 0,
    "items": [
      {
        "product": "62e64eac10a402fe17380a54",
        "quantity": 2,
        "price": 5,
        "total": 10,
        "_id": "62e76574fbc2b1a157d6926e"
      },
      {
        "product": "62e64ec210a402fe17380a5a",
        "quantity": 2,
        "price": 5,
        "total": 10,
        "_id": "62e76574fbc2b1a157d6926f"
      }
    ],
    "net_total": 20
  },
  "errors": []
}
```

## Update Product Quantity
### Sample Request Format for Update Product Quantity
```json
PATCH https://retwho.herokuapp.com/cart HTTP/1.1

{
  "items": [
    {   
      "_id": "62e96933f9cf840744615de5",
      "product": "62e64eac10a402fe17380a54",
      "quantity": 5
    }
  ]
}
```

### Sample Response to Success
```json
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8

{
  "cart": {
    "_id": "62e7657469be529f5bfc0eab",
    "user": "62e26fa52ea93e7bff5cd4f8",
    "__v": 0,
    "items": [
      {
        "product": "62e64eac10a402fe17380a54",
        "quantity": 2,
        "price": 5,
        "total": 10,
        "_id": "62e76574fbc2b1a157d6926e"
      },
      {
        "product": "62e64ec210a402fe17380a5a",
        "quantity": 2,
        "price": 5,
        "total": 10,
        "_id": "62e76574fbc2b1a157d6926f"
      }
    ],
    "net_total": 20
  },
  "errors": []
}
```

<!-- INTERNAL LINKS -->
[cart]: /docs/cart.md#add-to-cart
[all]: /docs/cart.md#get-cart-items
[delete]: /docs/cart.md#delete-cart
[update]: /docs/cart.md#update-product-quantity