# SALE ENDPOINTS
This document includes usage of **[Create POS Sale][pos-sale]**, **[Create Cart Sale][cart-sell]**, **[Sale Report][report]**,

***
## Create POS Sale
### Sample Request Format for Create Sale
```json
POST https://retwho.herokuapp.com/sale/pos?pid=630ddbc3fcb3cfb7e8f320ed HTTP/1.1
content-type: application/json
```

### Sample Response to Success
```json
HTTP/1.1 201 CREATED
X-Powered-By: Express
Content-Type: application/json; charset=utf-8

{
    "saleReport": {
        "items": [
            {
                "product": {
                    "_id": "6309b266d9abd53257ffae40"
                },
                "uniqueCode": "1737",
                "productName": "Hello Fresh Bulk 3318 valid",
                "quantity": 6,
                "price": 10,
                "total": 55,
                "_id": "630ddbc3fcb3cfb7e8f320ee"
            },
            {
                "product": {
                    "_id": "6309b266d9abd53257ffae45"
                },
                "uniqueCode": "1738",
                "productName": "Hello Fresh Bulk 3319 valid",
                "quantity": 6,
                "price": 10,
                "total": 55,
                "_id": "630ddbc3fcb3cfb7e8f320ef"
            }
        ],
        "shop": {
            "_id": "630c88ad4c84bd767c3bde1c",
            "name": "Wholesaler Shop"
        },
        "user": {
            "_id": "630c69f7b80b6611514f8c8b",
            "name": "Customer 1"
        },
        "net_total": 550,
        "paid_amount": 600,
        "due_amount": -50,
        "shipping_status": "pending",
        "shipping_address": "Fly me to the moon!",
        "payment_status": "pending",
        "payment_method": "cash",
        "_id": "630df2bb92a2df3b9070943d",
        "createdAt": "2022-08-30T11:21:31.825Z",
        "updatedAt": "2022-08-30T11:21:31.825Z",
        "__v": 0
    }
}
```

***
## Create Cart Sale
### Sample Request Format for Create Sale
```json
POST https://retwho.herokuapp.com/sale?cid=630c8925c9d233febec5b80f HTTP/1.1
content-type: application/json

{
    "paid_amount": 15,
    "shipping_address": "Fly me to the moon!",
    "payment_method": "cash"
}
```

### Sample Response to Success
```json
HTTP/1.1 201 CREATED
X-Powered-By: Express
Content-Type: application/json; charset=utf-8

{
    "saleReport": {
        "items": [
            {
                "product": {
                    "_id": "630c88b44c84bd767c3bdebf"
                },
                "uniqueCode": "1738-wholesaler",
                "productName": "Wholesaler 3319 valid",
                "quantity": 0,
                "price": 5,
                "total": 10,
                "_id": "630c88b44c84bd767c3bdebf"
            },
            {
                "product": {
                    "_id": "630c88b44c84bd767c3bdea6"
                },
                "uniqueCode": "1738-wholesaler",
                "productName": "Wholesaler 3319 valid",
                "quantity": 0,
                "price": 5,
                "total": 25,
                "_id": "630c88b44c84bd767c3bdebf"
            }
        ],
        "shop": {
            "_id": "630c88ad4c84bd767c3bde1c",
            "name": "Wholesaler Shop"
        },
        "user": {
            "_id": "630c69f7b80b6611514f8c8b",
            "name": "Aizaf Wholesaler"
        },
        "net_total": 35,
        "paid_amount": 15,
        "due_amount": 20,
        "shipping_status": "pending",
        "shipping_address": "Fly me to the moon!",
        "payment_status": "pending",
        "payment_method": "cash",
        "_id": "630df374b13df97d26fc7c3f",
        "createdAt": "2022-08-30T11:24:36.058Z",
        "updatedAt": "2022-08-30T11:24:36.058Z",
        "__v": 0
    }
}
```

### Sample Response to Error
#### Invalid User Type
```json
HTTP/1.1 400 BAD REQUEST
X-Powered-By: Express
Content-Type: application/json; charset=utf-8

{
  "error": "User: Invalid User Type."
}
```
#### Failed validation
```json
HTTP/1.1 500 INTERNAL SERVER ERROR
X-Powered-By: Express
Content-Type: application/json; charset=utf-8

{
  "error": "User validation failed: product: Path `product` is required., quantity: Path `quantity` is required."
}
```
***
## Sale Report
### Sample Request Format for Sale Report
```json
// optional parameters: ?sort=, ?days=, ?startDate=
// expected data for parameters: sort=ASC||DESC, days=int, startDate=ISO Date

GET https://retwho.herokuapp.com/sale?sort=DESC&days=1&startDate=2022-07-25 HTTP/1.1
```
### Sample Response for Sale Report
```json
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8

{
    "saleReport": [
        {
            "_id": "630c88ad4c84bd767c3bde1c",
            "reports": [
                {
                    "user": {
                        "_id": "630c69f7b80b6611514f8c8b",
                        "name": "Aizaf Wholesaler"
                    },
                    "items": [
                        {
                            "product": "630c88b44c84bd767c3bdebf",
                            "uniqueCode": "1738-wholesaler",
                            "productName": "Wholesaler 3319 valid",
                            "quantity": 0,
                            "price": 5,
                            "total": 10,
                            "_id": "630c88b44c84bd767c3bdebf"
                        },
                        {
                            "product": "630c88b44c84bd767c3bdea6",
                            "uniqueCode": "1738-wholesaler",
                            "productName": "Wholesaler 3319 valid",
                            "quantity": 0,
                            "price": 5,
                            "total": 25,
                            "_id": "630c88b44c84bd767c3bdebf"
                        }
                    ],
                    "shipping_status": "pending",
                    "payment_status": "pending",
                    "net_total": 35,
                    "paid_amount": 15,
                    "due_amount": 20,
                    "_id": "630df374b13df97d26fc7c3f"
                },
                {
                    "user": {
                        "_id": "630c69f7b80b6611514f8c8b",
                        "name": "Customer 1"
                    },
                    "items": [
                        {
                            "product": "6309b266d9abd53257ffae40",
                            "uniqueCode": "1737",
                            "productName": "Hello Fresh Bulk 3318 valid",
                            "quantity": 6,
                            "price": 10,
                            "total": 55,
                            "_id": "630ddbc3fcb3cfb7e8f320ee"
                        },
                        {
                            "product": "6309b266d9abd53257ffae45",
                            "uniqueCode": "1738",
                            "productName": "Hello Fresh Bulk 3319 valid",
                            "quantity": 6,
                            "price": 10,
                            "total": 55,
                            "_id": "630ddbc3fcb3cfb7e8f320ef"
                        }
                    ],
                    "shipping_status": "pending",
                    "payment_status": "pending",
                    "net_total": 550,
                    "paid_amount": 600,
                    "due_amount": -50,
                    "_id": "630df31a92a2df3b90709447"
                },
                {
                    "user": {
                        "_id": "630c69f7b80b6611514f8c8b",
                        "name": "Customer 1"
                    },
                    "items": [
                        {
                            "product": "6309b266d9abd53257ffae40",
                            "uniqueCode": "1737",
                            "productName": "Hello Fresh Bulk 3318 valid",
                            "quantity": 6,
                            "price": 10,
                            "total": 55,
                            "_id": "630ddbc3fcb3cfb7e8f320ee"
                        },
                        {
                            "product": "6309b266d9abd53257ffae45",
                            "uniqueCode": "1738",
                            "productName": "Hello Fresh Bulk 3319 valid",
                            "quantity": 6,
                            "price": 10,
                            "total": 55,
                            "_id": "630ddbc3fcb3cfb7e8f320ef"
                        }
                    ],
                    "shipping_status": "pending",
                    "payment_status": "pending",
                    "net_total": 550,
                    "paid_amount": 600,
                    "due_amount": -50,
                    "_id": "630df2bb92a2df3b9070943d"
                },
                {
                    "user": {
                        "_id": "630c69f7b80b6611514f8c8b",
                        "name": "Customer 1"
                    },
                    "items": [
                        {
                            "product": "6309b266d9abd53257ffae40",
                            "uniqueCode": "1737",
                            "productName": "Hello Fresh Bulk 3318 valid",
                            "quantity": 6,
                            "price": 10,
                            "total": 55,
                            "_id": "630ddbc3fcb3cfb7e8f320ee"
                        },
                        {
                            "product": "6309b266d9abd53257ffae45",
                            "uniqueCode": "1738",
                            "productName": "Hello Fresh Bulk 3319 valid",
                            "quantity": 6,
                            "price": 10,
                            "total": 55,
                            "_id": "630ddbc3fcb3cfb7e8f320ef"
                        }
                    ],
                    "shipping_status": "pending",
                    "payment_status": "pending",
                    "net_total": 550,
                    "paid_amount": 600,
                    "due_amount": -50,
                    "_id": "630ddca93d36b6c17a93c06a"
                },
                {
                    "user": {
                        "_id": "630c69f7b80b6611514f8c8b",
                        "name": "Aizaf Wholesaler"
                    },
                    "items": [
                        {
                            "product": "630c88b44c84bd767c3bdebf",
                            "uniqueCode": "1738-wholesaler",
                            "productName": "Wholesaler 3319 valid",
                            "quantity": 0,
                            "price": 5,
                            "total": 10,
                            "_id": "630c88b44c84bd767c3bdebf"
                        },
                        {
                            "product": "630c88b44c84bd767c3bdea6",
                            "uniqueCode": "1738-wholesaler",
                            "productName": "Wholesaler 3319 valid",
                            "quantity": 0,
                            "price": 5,
                            "total": 25,
                            "_id": "630c88b44c84bd767c3bdebf"
                        }
                    ],
                    "shipping_status": "pending",
                    "payment_status": "pending",
                    "net_total": 35,
                    "paid_amount": 15,
                    "due_amount": 20,
                    "_id": "630dab92817df55286d45f97"
                },
                {
                    "user": {
                        "_id": "630c69f7b80b6611514f8c8b",
                        "name": "Aizaf Wholesaler"
                    },
                    "items": [
                        {
                            "product": "630c88b44c84bd767c3bdebf",
                            "uniqueCode": "1738-wholesaler",
                            "productName": "Wholesaler 3319 valid",
                            "quantity": 0,
                            "price": 5,
                            "total": 10,
                            "_id": "630c88b44c84bd767c3bdebf"
                        },
                        {
                            "product": "630c88b44c84bd767c3bdea6",
                            "uniqueCode": "1738-wholesaler",
                            "productName": "Wholesaler 3319 valid",
                            "quantity": 0,
                            "price": 5,
                            "total": 25,
                            "_id": "630c88b44c84bd767c3bdebf"
                        }
                    ],
                    "shipping_status": "pending",
                    "payment_status": "pending",
                    "net_total": 35,
                    "paid_amount": 15,
                    "due_amount": 20,
                    "_id": "630daa6883bad181678779d5"
                },
                {
                    "user": {
                        "_id": "630c69f7b80b6611514f8c8b",
                        "name": "Aizaf Wholesaler"
                    },
                    "items": [
                        {
                            "product": "630c88b44c84bd767c3bdebf",
                            "uniqueCode": "1738-wholesaler",
                            "productName": "Wholesaler 3319 valid",
                            "quantity": 0,
                            "price": 5,
                            "total": 10,
                            "_id": "630c88b44c84bd767c3bdebf"
                        },
                        {
                            "product": "630c88b44c84bd767c3bdea6",
                            "uniqueCode": "1738-wholesaler",
                            "productName": "Wholesaler 3319 valid",
                            "quantity": 0,
                            "price": 5,
                            "total": 25,
                            "_id": "630c88b44c84bd767c3bdebf"
                        }
                    ],
                    "shipping_status": "pending",
                    "payment_status": "paid",
                    "net_total": 35,
                    "paid_amount": 35,
                    "due_amount": 0,
                    "_id": "630da91dc9becdb3d35406f3"
                },
                {
                    "user": {
                        "_id": "630c69f7b80b6611514f8c8b",
                        "name": "Aizaf Wholesaler"
                    },
                    "items": [
                        {
                            "product": "630c88b44c84bd767c3bdebf",
                            "uniqueCode": "1738-wholesaler",
                            "productName": "Wholesaler 3319 valid",
                            "quantity": 0,
                            "price": 5,
                            "total": 10,
                            "_id": "630c88b44c84bd767c3bdebf"
                        },
                        {
                            "product": "630c88b44c84bd767c3bdea6",
                            "uniqueCode": "1738-wholesaler",
                            "productName": "Wholesaler 3319 valid",
                            "quantity": 0,
                            "price": 5,
                            "total": 25,
                            "_id": "630c88b44c84bd767c3bdebf"
                        }
                    ],
                    "shipping_status": "pending",
                    "payment_status": "pending",
                    "net_total": 35,
                    "paid_amount": 20,
                    "due_amount": 15,
                    "_id": "630da7e8f55e2169f521d425"
                },
                {
                    "user": {
                        "_id": "630c69f7b80b6611514f8c8b",
                        "name": "Aizaf Wholesaler"
                    },
                    "items": [
                        {
                            "product": "630c88b44c84bd767c3bdebf",
                            "uniqueCode": "1738-wholesaler",
                            "productName": "Wholesaler 3319 valid",
                            "quantity": 100,
                            "price": 5,
                            "total": 10,
                            "_id": "630c88b44c84bd767c3bdebf"
                        },
                        {
                            "product": "630c88b44c84bd767c3bdea6",
                            "uniqueCode": "1738-wholesaler",
                            "productName": "Wholesaler 3319 valid",
                            "quantity": 100,
                            "price": 5,
                            "total": 25,
                            "_id": "630c88b44c84bd767c3bdebf"
                        }
                    ],
                    "shipping_status": "pending",
                    "payment_status": "pending",
                    "net_total": 35,
                    "paid_amount": 0,
                    "due_amount": 35,
                    "_id": "630da7b1ff9be645c9791c52"
                }
            ],
            "total_sale": 1860,
            "total_paid_amount": 1900,
            "total_due_amount": -40,
            "shop": {
                "_id": "630c88ad4c84bd767c3bde1c",
                "name": "Wholesaler Shop"
            }
        }
    ]
}
```


<!-- INTERNAL LINKS -->
[pos-sell]: /docs/sale.md#create-pos-sale
[cart-sell]: /docs/sale.md#create-cart-sale
[report]: /docs/sale.md#sale-report