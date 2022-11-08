# POS ENDPOINTS
This document includes usage of **[Save POS][pos]**, **[Get POS][all]**, **[Update POS][update]**, **[Delete POS][delete]**, **[Get POS PDF][pdf]**
***
## Save POS
### Sample Request Format for Save POS
```json
POST https://retwho.herokuapp.com/pos HTTP/1.1
content-type: application/json

{
    "items": [
        {
            "product": "6309b266d9abd53257ffae40",
            "productName": "Hello Fresh Bulk 3318 valid",
            "uniqueCode": "1737",
            "quantity": 6,
            "price": 10,
            "total": 55
        },
        {
        "product": "6309b266d9abd53257ffae45",
        "productName": "Hello Fresh Bulk 3319 valid",
        "uniqueCode": "1738",
        "quantity": 6,
        "price": 10,
        "total": 55
    }
    ],
    "net_total": 550,
    "tax": 0,
    "payment_method": "cash",
    "paid_amount": 600,
    "return_amount": 50,
    "name": "Customer 1",
    "shipping_address": "Fly me to the moon!"
}
```

### Sample Response to Success
```json
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8

{
    "pos": {
        "items": [
            {
                "product": "6309b266d9abd53257ffae40",
                "productName": "Hello Fresh Bulk 3318 valid",
                "uniqueCode": "1737",
                "quantity": 6,
                "price": 10,
                "total": 55,
                "_id": "630df1e892a2df3b90709435"
            },
            {
                "product": "6309b266d9abd53257ffae45",
                "productName": "Hello Fresh Bulk 3319 valid",
                "uniqueCode": "1738",
                "quantity": 6,
                "price": 10,
                "total": 55,
                "_id": "630df1e892a2df3b90709436"
            }
        ],
        "user": "630c69f7b80b6611514f8c8b",
        "shop": "630c88ad4c84bd767c3bde1c",
        "net_total": 550,
        "tax": 0,
        "payment_method": "cash",
        "payment_status": "pending",
        "paid_amount": 600,
        "due_amount": -50,
        "return_amount": 50,
        "name": "Customer 1",
        "shipping_address": "Fly me to the moon!",
        "_id": "630df1e892a2df3b90709434",
        "createdAt": "2022-08-30T11:18:00.100Z",
        "updatedAt": "2022-08-30T11:18:00.100Z",
        "__v": 0
    }
}
```

***
## Get POS
### Sample Request Format for Get POS
```json
GET https://retwho.herokuapp.com/pos?posId=62e7657469be529f5bfc0eab HTTP/1.1
```

### Sample Response to Success
```json
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8

{
    "pos": [
        {
            "_id": "630dda4b6df54cd9c85a347d",
            "items": [
                {
                    "product": "6309b266d9abd53257ffae40",
                    "uniqueCode": "1737",
                    "quantity": 6,
                    "price": 10,
                    "name": "Hello Fresh Bulk 3318 valid"
                },
                {
                    "product": "6309b266d9abd53257ffae45",
                    "uniqueCode": "1738",
                    "quantity": 6,
                    "price": 10,
                    "name": "Hello Fresh Bulk 3319 valid"
                }
            ],
            "user": {
                "name": "Aizaf Wholesaler",
                "email": "wholesaler@example.com",
                "companyEmail": "wholesaler@example.com"
            },
            "shop": {
                "name": "Wholesaler Shop",
                "email": "wholesaler@mail.com",
                "companyEmail": "wholesaler@mail.com"
            },
            "net_total": 550,
            "tax": 0,
            "payment_method": "cash",
            "paid_amount": 600,
            "return_amount": 50,
            "createdAt": "2022-08-30T09:37:15.350Z",
            "updatedAt": "2022-08-30T09:37:15.350Z",
            "__v": 0
        }
    ]
}
```

## Update POS
### Sample Request Format for Update POS
```json
PUT https://retwho.herokuapp.com/pos?posId=62ebb71920a179cb7206cc27 HTTP/1.1
content-type: application/json

{
    "items": [
        {
            "product": "6309b266d9abd53257ffae40",
            "productName": "Hello Fresh Bulk 3318 valid",
            "uniqueCode": "1737",
            "quantity": 6,
            "price": 10,
            "total": 55
        },
        {
        "product": "6309b266d9abd53257ffae45",
        "productName": "Hello Fresh Bulk 3319 valid",
        "uniqueCode": "1738",
        "quantity": 6,
        "price": 10,
        "total": 55
    }
    ],
    "net_total": 550,
    "tax": 0,
    "payment_method": "cash",
    "paid_amount": 600,
    "return_amount": 50,
    "name": "Customer 1",
    "shipping_address": "Fly me to the moon!"
}
```

### Sample Response to Success
```json
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8

{
    "pos": {
        "items": [
            {
                "product": "6309b266d9abd53257ffae40",
                "productName": "Hello Fresh Bulk 3318 valid",
                "uniqueCode": "1737",
                "quantity": 6,
                "price": 10,
                "total": 55,
                "_id": "630df1e892a2df3b90709435"
            },
            {
                "product": "6309b266d9abd53257ffae45",
                "productName": "Hello Fresh Bulk 3319 valid",
                "uniqueCode": "1738",
                "quantity": 6,
                "price": 10,
                "total": 55,
                "_id": "630df1e892a2df3b90709436"
            }
        ],
        "user": "630c69f7b80b6611514f8c8b",
        "shop": "630c88ad4c84bd767c3bde1c",
        "net_total": 550,
        "tax": 0,
        "payment_method": "cash",
        "payment_status": "pending",
        "paid_amount": 600,
        "due_amount": -50,
        "return_amount": 50,
        "name": "Customer 1",
        "shipping_address": "Fly me to the moon!",
        "_id": "630df1e892a2df3b90709434",
        "createdAt": "2022-08-30T11:18:00.100Z",
        "updatedAt": "2022-08-30T11:18:00.100Z",
        "__v": 0
    }
}
```

***
## Delete pos
### Sample Request Format for Delete pos
```json
DELETE https://retwho.herokuapp.com/pos?posId=62e955be1b2ec15131c0fbb4 HTTP/1.1
```

### Sample Response to Success
```json
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8

{
  "pos": {
    "acknowledged": true,
    "deletedCount": 1
  }
}
```


***
## Get POS PDF
### Sample Request Format for Get POS PDF
```json
GET https://retwho.herokuapp.com/pos/document?posId=6304c33eddde0a670e4c9a99 HTTP/1.1
```

### Sample Response to Success
```json
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
```



<!-- INTERNAL LINKS -->
[pos]: /docs/pos.md#save-pos
[all]: /docs/pos.md#get-pos
[delete]: /docs/pos.md#delete-pos
[update]: /docs/pos.md#update-pos
[pdf]: /docs/pos.md#get-pos-pdf