# PRODUCT ENDPOINTS
This document includes usage of **[Add Product][product]**, **[Update Product][update]**, **[Bulk Add Product][bulk]**, **[Delete Product][delete]**, **[Get All Products][get]**,

***
## Add Product
### Sample Request Format for Add Product
```json
POST https://retwho.herokuapp.com/product HTTP/1.1
content-type: multipart/form-data

{
  "productName": "Your Product Name",
  // new field added, tax percentage
  "tax": 20,
  // department is the id of department object
  "department": "68dbtd47n804r39",
  "uniqueCode": "bfhj-7833-jdfn",
  "quantity": 10,
  "status": "product-status", 
  "prices": {
    "basic": 50,
    "standard": 45,
    "premium": 40
  },
  "productOffer": {
    "basic": [
      {
        "quantity": 2,
        "price": 10
      },
      {
        "quantity": 6,
        "price": 20
      }
    ],
    "standard": [],
    "premium": []
  },
  // FILES (OPTIONAL) (accecpted: [jpg, jpeg, png])
  "image": "FILE",
  // OPTIONAL
  "tags": [
    "hello",
    "hello again"
  ],
  "sku": "onf3y9w78tyn9f5t7"
}
```

### Sample Response to Success
```json
HTTP/1.1 201 CREATED
X-Powered-By: Express
Content-Type: application/json; charset=utf-8

{
  "product": {
    "uniqueCode": "bfhj-7833-jdfn",
    "prices": {
      "basic": 5,
      "standard": 7,
      "premium": 8
    },
    "productOffer": {
      "basic": [
        {
          "quantity": 2,
          "price": 10,
          "_id": "62d8e2a3c22786677a0b128e"
        },
        {
          "quantity": 6,
          "price": 20,
          "_id": "62d8e2a3c22786677a0b128f"
        }
      ],
      "standard": [],
      "premium": []
    },
    "_id": "62d8e293c22786677a0b1289",
    "productName": "Hello Fresh",
    "department": {
      "_id": "62c5123a9f570cc0d10f8872",
      "dept_name": "manager",
      "active": true,
      "tax_stage": "3rd",
      "shop": {
        "_id": "62c50c2a2f9edf419eeee4c2",
        "name": "okay shop"
      },
      "email": "mail@mail.com",
      "createdAt": "2022-07-06T04:40:26.976Z",
      "updatedAt": "2022-07-20T06:30:45.054Z",
      "__v": 0
    },
    "tags": [
      "hello",
      "hello again"
    ],
    "quantity": 10,
    "status": "INACTIVE",
    "email": "test@rest.com",
    "image": "http://res.cloudinary.com/retwho/image/upload/v1658380965/jajulnc8ihwyyopem5z4.png",
    "createdAt": "2022-07-21T05:22:29.274Z",
    "updatedAt": "2022-07-21T05:22:45.464Z",
    "__v": 1
  }
}
```

### Sample Response to Error
#### Department Does Not Exist
```json

HTTP/1.1 404 NOT FOUND
X-Powered-By: Express
Content-Type: application/json; charset=utf-8

{
  "error": "Department does not exists"
}
```
#### Failed validation
```json
// Response object will contain a **error** message with HTTP Response Code

HTTP/1.1 500 INTERNAL SERVER ERROR
X-Powered-By: Express
Content-Type: application/json; charset=utf-8

{
  "error": "Product validation failed: quantity: Path `quantity` is required., uniqueCode.barCode: Path `uniqueCode.barCode` is required."
}
```

***
## Update Product
### Sample Request Format for Update Product
```json
// required query param: ?prodId

PUT https://retwho.herokuapp.com/product?prodId=62d8e293c22786677a0b1289 HTTP/1.1
content-type: multipart/form-data

{
  "productName": "Your Product Name",
  // department is the id of department object
  "department": "68dbtd47n804r39",
  "uniqueCode": "bfhj-7833-jdfn",
  "quantity": 10,
  "status": "product-status", 
  "prices": {
    "basic": 50,
    "standard": 45,
    "premium": 40
  },
  "productOffer": {
    "basic": [
      {
        "quantity": 2,
        "price": 10
      },
      {
        "quantity": 6,
        "price": 20
      }
    ],
    "standard": [],
    "premium": []
  },
  // FILES (OPTIONAL) (accecpted: [jpg, jpeg, png])
  "image": "FILE",
  // OPTIONAL FILES
  "tags": [
    "hello",
    "hello again"
  ],
  "sku": "onf3y9w78tyn9f5t7"
}
```

### Sample Response to Success
```json
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8

{
  "product": {
    "uniqueCode": "bfhj-7833-jdfn",
    "prices": {
      "basic": 5,
      "standard": 7,
      "premium": 8
    },
    "productOffer": {
      "basic": [
        {
          "quantity": 2,
          "price": 10,
          "_id": "62d8e2a3c22786677a0b128e"
        },
        {
          "quantity": 6,
          "price": 20,
          "_id": "62d8e2a3c22786677a0b128f"
        }
      ],
      "standard": [],
      "premium": []
    },
    "_id": "62d8e293c22786677a0b1289",
    "productName": "Hello Fresh",
    "department": {
      "_id": "62c5123a9f570cc0d10f8872",
      "dept_name": "manager",
      "active": true,
      "tax_stage": "3rd",
      "shop": {
        "_id": "62c50c2a2f9edf419eeee4c2",
        "name": "okay shop"
      },
      "email": "mail@mail.com",
      "createdAt": "2022-07-06T04:40:26.976Z",
      "updatedAt": "2022-07-20T06:30:45.054Z",
      "__v": 0
    },
    "tags": [
      "hello",
      "hello again"
    ],
    "quantity": 10,
    "status": "INACTIVE",
    "email": "test@rest.com",
    "image": "http://res.cloudinary.com/retwho/image/upload/v1658380965/jajulnc8ihwyyopem5z4.png",
    "createdAt": "2022-07-21T05:22:29.274Z",
    "updatedAt": "2022-07-21T05:22:45.464Z",
    "__v": 1
  }
}
```

### Sample Response to Error
#### Department Does Not Exist
```json

HTTP/1.1 404 NOT FOUND
X-Powered-By: Express
Content-Type: application/json; charset=utf-8

{
  "error": "Department does not exists"
}
```
#### Failed validation
```json
// Response object will contain a **error** message with HTTP Response Code

HTTP/1.1 500 INTERNAL SERVER ERROR
X-Powered-By: Express
Content-Type: application/json; charset=utf-8

{
  "error": "Product validation failed: quantity: Path `quantity` is required., uniqueCode.barCode: Path `uniqueCode.barCode` is required."
}
```
***
## Bulk Add Product
### Sample Request Format for Bulk Add Product
```json
// accecpted file type: text/csv

POST https://retwho.herokuapp.com/product HTTP/1.1
content-type: multipart/form-data

{
  "products_csv": "FILE"
}
```
### Sample Response for Bulk Add Product
```json
{
  "products": [
    {
      "productName": "Hello Fresh Bulk 1 valid",
      "department": "62d8ec4b5a6a9796df29a8c8",
      "uniqueCode": "bfhj-7833-jdfn",
      "tags": [
        "hello",
        "hello again"
      ],
      "quantity": 10,
      "status": "INACTIVE",
      "prices": {
        "basic": 5,
        "standard": 7,
        "premium": 8
      },
      "productOffer": {
        "basic": [
          {
            "quantity": 2,
            "price": 10,
            "_id": "62dce53f09b5af2f566eb854"
          },
          {
            "quantity": 6,
            "price": 20,
            "_id": "62dce53f09b5af2f566eb855"
          }
        ],
        "standard": [
          {
            "quantity": 3,
            "price": 10,
            "_id": "62dce53f09b5af2f566eb856"
          }
        ],
        "premium": [
          {
            "quantity": 3,
            "price": 40,
            "_id": "62dce53f09b5af2f566eb857"
          }
        ]
      },
      "email": "test@rest.com",
      "_id": "62dce53f09b5af2f566eb853",
      "__v": 0,
      "createdAt": "2022-07-24T06:22:55.984Z",
      "updatedAt": "2022-07-24T06:22:55.984Z"
    },
    {
      "productName": "Hello Fresh Bulk 3 valid",
      "department": "62da718a035e3861be8e4a5e",
      "uniqueCode": "bfhj-7833-jdfn",
      "tags": [
        "hello",
        "hello again"
      ],
      "quantity": 10,
      "status": "INACTIVE",
      "prices": {
        "basic": 5,
        "standard": 7,
        "premium": 8
      },
      "productOffer": {
        "basic": [
          {
            "quantity": 2,
            "price": 10,
            "_id": "62dce53f09b5af2f566eb859"
          },
          {
            "quantity": 6,
            "price": 20,
            "_id": "62dce53f09b5af2f566eb85a"
          }
        ],
        "standard": [
          {
            "quantity": 3,
            "price": 10,
            "_id": "62dce53f09b5af2f566eb85b"
          }
        ],
        "premium": [
          {
            "quantity": 3,
            "price": 40,
            "_id": "62dce53f09b5af2f566eb85c"
          }
        ]
      },
      "email": "test@rest.com",
      "_id": "62dce53f09b5af2f566eb858",
      "__v": 0,
      "createdAt": "2022-07-24T06:22:55.986Z",
      "updatedAt": "2022-07-24T06:22:55.986Z"
    }
  ],
  "errors": [
    "Depatrment: 62d8ec4b5a6a9796df29a8c9 does not exists"
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
  "error": "Product validation failed: quantity: Path `quantity` is required., uniqueCode.barCode: Path `uniqueCode.barCode` is required."
}
```
### Sample CSV Format
|department              |email        |prices.basic|prices.premium|prices.standard|productName               |productOffer.basic.0.quantity|productOffer.basic.0.price|productOffer.basic.1.quantity|productOffer.basic.1.price|productOffer.premium.0.quantity|productOffer.premium.0.price|productOffer.standard.0.quantity|productOffer.standard.0.price|quantity|status  |tags.0|tags.1     |uniqueCode.barCode|uniqueCode.upc|
|------------------------|-------------|------------|--------------|---------------|--------------------------|-----------------------------|--------------------------|-----------------------------|--------------------------|-------------------------------|----------------------------|--------------------------------|-----------------------------|--------|--------|------|-----------|------------------|--------------|
|62d8ec4b5a6a9796df29a8c8|test@rest.com|5           |8             |7              |Hello Fresh Bulk 1 valid  |2                            |10                        |6                            |20                        |3                              |40                          |3                               |10                           |10      |INACTIVE|hello |hello again|poiuytre          |lkjhgfdsa     |
|62d8ec4b5a6a9796df29a8c9|test@rest.com|5           |8             |7              |Hello Fresh Bulk 2 invalid|2                            |10                        |6                            |20                        |3                              |40                          |3                               |10                           |10      |INACTIVE|hello |hello again|poiuytre          |lkjhgfdsa     |
|62da718a035e3861be8e4a5e|test@rest.com|5           |8             |7              |Hello Fresh Bulk 3 valid  |2                            |10                        |6                            |20                        |3                              |40                          |3                               |10                           |10      |INACTIVE|hello |hello again|poiuytre          |lkjhgfdsa     |

***
## Delete Product
### Sample Request Format for Delete Product
```json
DELETE https://retwho.herokuapp.com/product HTTP/1.1
```
### Sample Response for Delete Product
```json
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8

{
  "deleted": {
    "acknowledged": true,
    "deletedCount": 1
  }
}
```

***
## Get All Products
### Sample Request for Get All Products
```json
// REQUIRED PARAMS ?sort=-1/1 (-1 for DESC and 1 for ASC), ?page=0 (0,1,2...)
GET https://retwho.herokuapp.com/product?sort=-1&page=0 HTTP/1.1
```
### Sample Response for Success
```json
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8

{
    "products": [
      {
        "prices": {
          "basic": 54,
          "standard": 45,
          "premium": 45
        },
        "productOffer": {
          "basic": [
            {
              "quantity": 456,
              "price": 456,
              "_id": "62e554c4cbc56a1b1d4deb53"
            }
          ],
          "standard": [
            {
              "quantity": 456,
              "price": 652,
              "_id": "62e554c4cbc56a1b1d4deb52"
            }
          ],
          "premium": [
            {
              "quantity": 24,
              "price": 456,
              "_id": "62e554c4cbc56a1b1d4deb51"
            }
          ]
        },
        "tax": 0,
        "_id": "62e52c5d7874d601c65dda12",
        "productName": "update name",
        "department": {
          "_id": "62e2b707f3540d7e0ffaa498",
          "dept_name": "Test",
          "active": true,
          "tax_stage": "test",
          "shop": {
            "_id": "62e27027382d7865742d0c0d",
            "city": "test",
            "companyEmail": "test@mail.com",
            "companyName": "test",
            "companyPhone": "0654521564",
            "country": "Bangladesh",
            "email": "test@mail.com",
            "name": "test update",
            "postalCode": "6541",
            "state_province_region": "test",
            "streetAddress": "test",
            "createdAt": "2022-07-28T11:16:55.733Z",
            "updatedAt": "2022-07-30T15:49:57.278Z",
            "__v": 0
        },
        "createdAt": "2022-07-28T16:19:19.627Z",
        "updatedAt": "2022-07-28T18:06:29.472Z",
        "__v": 0
      },
      "sku": "test",
      "tags": [
        ""
      ],
      "quantity": 456,
      "status": "test",
      "email": "admin@example.com",
      "createdAt": "2022-07-30T13:04:29.822Z",
      "updatedAt": "2022-07-30T15:56:52.967Z",
      "__v": 0
    }
  ]
}
```


<!-- INTERNAL LINKS -->
[product]: /docs/product.md#add-product
[update]: /docs/product.md#update-product
[bulk]: /docs/product.md#bulk-add-product
[delete]: /docs/product.md#delete-product
[get]: /docs/product.md#get-all-products