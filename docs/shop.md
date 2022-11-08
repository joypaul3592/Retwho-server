# SHOP ENDPOINTS
This document includes usage of **[Add Shop][shop]**, **[Update Shop][update]**, **[Get All Shops][all]**, **[Get Filtered Shops][filter]**, **[Delete Shop][delete]**

***
## Add Shop
### Sample Request Format for Add Shop
```json
POST https://retwho.herokuapp.com/shop HTTP/1.1
content-type: multipart/form-data

{
  "city": "Dhaka",
  "companyEmail": "mail2@mail.com",
  "companyName": "toto",
  "companyPhone": "1234567",
  "country": "Bangladesh",
  "email": "mail2@mail.com",
  "name": "Rofl Lol",
  "postalCode": "bangladesh",
  "state_province_region": "KJDDJKL",
  "streetAddress": "21/1 H Block, Mirpur-2, Dhaka"
}
```

### Sample Response to Success
```json
HTTP/1.1 201 CREATED
X-Powered-By: Express
Content-Type: application/json; charset=utf-8

{
  "shop": {
    "city": "Dhaka",
    "companyEmail": "mail2@mail.com",
    "companyName": "toto",
    "companyPhone": "1234567",
    "country": "Bangladesh",
    "email": "mail2@mail.com",
    "name": "Rofl Lol",
    "postalCode": "bangladesh",
    "state_province_region": "KJDDJKL",
    "streetAddress": "21/1 H Block, Mirpur-2, Dhaka",
    "_id": "62e0fc391c207142b2f3e4c3",
    "createdAt": "2022-07-27T08:50:01.972Z",
    "updatedAt": "2022-07-27T08:50:01.972Z",
    "__v": 0
  }
}
```

### Sample Response to Error
#### Shop Does Not Exist
```json

HTTP/1.1 404 NOT FOUND
X-Powered-By: Express
Content-Type: application/json; charset=utf-8

{
    "error": "Shop does not exists"
}
```
#### Failed validation
```json
// Response object will contain a **error** message with HTTP Response Code

HTTP/1.1 500 INTERNAL SERVER ERROR
X-Powered-By: Express
Content-Type: application/json; charset=utf-8

{
  "error": "shop validation failed: companyEmail: Path `companyEmail` is required."
}
```

***
## Update Shop
### Sample Request Format for Update Shop
```json
POST https://retwho.herokuapp.com/shop?shopId=62e0fbb01c207142b2f3e4bd HTTP/1.1
content-type: multipart/form-data

{
  "companyEmail": "updatedmail@mail.com",
  "companyName": "AizafLab"
}
```

### Sample Response to Success
```json
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8

{
  "shop": {
    "_id": "62e0fbb01c207142b2f3e4bd",
      "city": "Dhaka",
      "companyEmail": "updatedmail@mail.com",
      "companyName": "AizafLab",
      "companyPhone": "1234567",
      "country": "Bangladesh",
      "email": "mail@mail.com",
      "name": "Rofl Lol",
      "postalCode": "bangladesh",
      "state_province_region": "KJDDJKL",
      "streetAddress": "21/1 H Block, Mirpur-2, Dhaka",
      "createdAt": "2022-07-27T08:47:44.523Z",
      "updatedAt": "2022-07-27T08:49:15.760Z",
      "__v": 0
  }
}
```

### Sample Response to Error
#### Shop Does Not Exist
```json

HTTP/1.1 404 NOT FOUND
X-Powered-By: Express
Content-Type: application/json; charset=utf-8

{
    "error": "Shop does not exists"
}
```
***
## Get All Shops
### Sample Request for Get All Shops
```json
GET https://retwho.herokuapp.com/shop HTTP/1.1
```
### Sample Response for Success
```json
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8

{
  "shops": [
    {
      "_id": "62e0fbb01c207142b2f3e4bd",
      "city": "Dhaka",
      "companyEmail": "updatedmail@mail.com",
      "companyName": "AizafLab",
      "companyPhone": "1234567",
      "country": "Bangladesh",
      "email": "mail@mail.com",
      "name": "Rofl Lol",
      "postalCode": "bangladesh",
      "state_province_region": "KJDDJKL",
      "streetAddress": "21/1 H Block, Mirpur-2, Dhaka",
      "createdAt": "2022-07-27T08:47:44.523Z",
      "updatedAt": "2022-07-27T08:49:15.760Z",
      "__v": 0
    },
    {
      "_id": "62e0fc391c207142b2f3e4c3",
      "city": "Dhaka",
      "companyEmail": "mail2@mail.com",
      "companyName": "toto",
      "companyPhone": "1234567",
      "country": "Bangladesh",
      "email": "mail2@mail.com",
      "name": "Rofl Lol",
      "postalCode": "bangladesh",
      "state_province_region": "KJDDJKL",
      "streetAddress": "21/1 H Block, Mirpur-2, Dhaka",
      "createdAt": "2022-07-27T08:50:01.972Z",
      "updatedAt": "2022-07-27T08:50:01.972Z",
      "__v": 0
    }
  ]
}
```

***
## Get Filtered Shop
### Sample Request for Get Filtered Shops
```json
// accpeted parameteres: ?_id=, ?city=, ?companyEmail=, ?companyName=, ?companyPhone=, ?country=, ?email=, ?name=, ?postalCode=, ?state_province_region=, ?streetAddress=, ?streetAddress=
// parameteres can be chained
GET https://retwho.herokuapp.com/shop?streetAddress=21/1 H Block, Mirpur-2, Dhaka&city=Dhaka HTTP/1.1
```
### Sample Response for Success
```json
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8

{
  "shops": [
    {
      "_id": "62e0fbb01c207142b2f3e4bd",
      "city": "Dhaka",
      "companyEmail": "updatedmail@mail.com",
      "companyName": "AizafLab",
      "companyPhone": "1234567",
      "country": "Bangladesh",
      "email": "mail@mail.com",
      "name": "Rofl Lol",
      "postalCode": "bangladesh",
      "state_province_region": "KJDDJKL",
      "streetAddress": "21/1 H Block, Mirpur-2, Dhaka",
      "createdAt": "2022-07-27T08:47:44.523Z",
      "updatedAt": "2022-07-27T08:49:15.760Z",
      "__v": 0
    },
    {
      "_id": "62e0fc391c207142b2f3e4c3",
      "city": "Dhaka",
      "companyEmail": "mail2@mail.com",
      "companyName": "toto",
      "companyPhone": "1234567",
      "country": "Bangladesh",
      "email": "mail2@mail.com",
      "name": "Rofl Lol",
      "postalCode": "bangladesh",
      "state_province_region": "KJDDJKL",
      "streetAddress": "21/1 H Block, Mirpur-2, Dhaka",
      "createdAt": "2022-07-27T08:50:01.972Z",
      "updatedAt": "2022-07-27T08:50:01.972Z",
      "__v": 0
    }
  ]
}
```
***
## Delete Shop
### Sample Request Format for Delete Shop
```json
DELETE https://retwho.herokuapp.com/shop?shopId=62e0fc391c207142b2f3e4c3 HTTP/1.1
```
### Sample Response for Delete Shop
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

<!-- INTERNAL LINKS -->
[shop]: /docs/shop.md#add-shop
[update]: /docs/shop.md#update-shop
[all]: /docs/shop.md#get-all-shops
[filter]: /docs/shop.md#get-filtered-shop
[delete]: /docs//shop.md#delete-shop