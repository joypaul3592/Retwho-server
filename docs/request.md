# REQUEST ENDPOINTS
This document includes usage of **[Get All Requests][all-request]**, **[Request For Shop Prices][request]**, **[Update Request for Shop Price][update-request]**, **[Admin Connect Sellers][admin-connect]**

***
## Get All Requests
### Sample Request Format for Get All Requests
```json
GET https://retwho.herokuapp.com/request HTTP/1.1
```

### Sample Response to Success
```json
HTTP/1.1 201 CREATED
X-Powered-By: Express
Content-Type: application/json; charset=utf-8

{
    "requests": [
        {
            "_id": "62f4d123a4ab5aa4688c73d4",
            "user": {
                "_id": "62e26fa52ea93e7bff5cd4f8",
                "agree": false,
                "city": "Dhaka",
                "companyEmail": "admin@example.com",
                "companyName": "toto",
                "companyPhone": "1223345",
                "country": "Bangladesh",
                "email": "admin@example.com",
                "feinCode": "542346",
                "license": "http://res.cloudinary.com/retwho/image/upload/v1659006890/wc3cla112gbvs6mu2djq.png",
                "name": "Rofl Lol",
                "password": "$2b$10$VkJ5uSFnMhtsavklraeNO.rtFGHBvVjUFuLLIydJVTM8/ZO6kCADO",
                "postalCode": "bangladesh",
                "state_province_region": "KJDDJKL",
                "streetAddress": "21/1 H Block, Mirpur-2, Dhaka",
                "feinCopy": "http://res.cloudinary.com/retwho/image/upload/v1659006888/xkjuslibozhzjtb6grfp.png",
                "resalecert": "http://res.cloudinary.com/retwho/image/upload/v1659006893/io1voxdggxr4gktqs50x.png",
                "createdAt": "2022-07-28T11:14:54.034Z",
                "updatedAt": "2022-07-28T11:14:54.034Z",
                "__v": 0,
                "approved_shops": [
                    "62c50c2a2f9edf419eeee4c2"
                ]
            },
            "shop": {
                "_id": "62c50c2a2f9edf419eeee4c2",
                "name": "Rofl Lol",
                "city": "Dhaka",
                "companyEmail": "mail@mail.com",
                "companyName": "toto",
                "companyPhone": "1234567",
                "country": "Bangladesh",
                "email": "mail@mail.com",
                "postalCode": "bangladesh",
                "state_province_region": "KJDDJKL",
                "streetAddress": "21/1 H Block, Mirpur-2, Dhaka",
                "updatedAt": "2022-08-13T09:16:34.239Z",
                "approved": [
                    "62e26fa52ea93e7bff5cd4f8",
                    "62f7662b8adae9fa77e01e4c"
                ]
            },
            "approved": true,
            "createdAt": "2022-08-11T09:51:31.333Z",
            "updatedAt": "2022-08-11T09:51:31.333Z",
            "__v": 0
        },
        {
            "_id": "62f76a22aeb9e27c9262e950",
            "user": {
                "_id": "62f7662b8adae9fa77e01e4c",
                "agree": true,
                "city": "Dhaka",
                "companyEmail": "admin@gmail.com",
                "companyName": "toto",
                "companyPhone": "1223345",
                "country": "Bangladesh",
                "email": "admin@gmail.com",
                "feinCode": "542346",
                "license": "http://res.cloudinary.com/retwho/image/upload/v1660380719/glxbrpa4jamqhqunonqg.png",
                "name": "Aizaf Admin",
                "password": "$2b$10$UP9rm.M7icEXzeboHyut.urrfsk95qjFfUkTlcKpCFmOOU7WmDaBO",
                "postalCode": "bangladesh",
                "state_province_region": "KJDDJKL",
                "streetAddress": "21/1 H Block, Mirpur-2, Dhaka",
                "feinCopy": "http://res.cloudinary.com/retwho/image/upload/v1660380717/jfxy29tt7ce7k98vex2g.png",
                "resalecert": "http://res.cloudinary.com/retwho/image/upload/v1660380722/xkd8xmnsudswscyomcoi.png",
                "role": "admin",
                "createdAt": "2022-08-13T08:52:03.115Z",
                "updatedAt": "2022-08-13T08:52:03.115Z",
                "__v": 0
            },
            "shop": {
                "_id": "62c50c2a2f9edf419eeee4c2",
                "name": "Rofl Lol",
                "city": "Dhaka",
                "companyEmail": "mail@mail.com",
                "companyName": "toto",
                "companyPhone": "1234567",
                "country": "Bangladesh",
                "email": "mail@mail.com",
                "postalCode": "bangladesh",
                "state_province_region": "KJDDJKL",
                "streetAddress": "21/1 H Block, Mirpur-2, Dhaka",
                "updatedAt": "2022-08-13T09:16:34.239Z",
                "approved": [
                    "62e26fa52ea93e7bff5cd4f8",
                    "62f7662b8adae9fa77e01e4c"
                ]
            },
            "approved": true,
            "createdAt": "2022-08-13T09:08:50.971Z",
            "updatedAt": "2022-08-13T09:16:34.316Z",
            "__v": 0
        }
    ]
}
```

***
## Request For Shop Prices
### Sample Request Format for Request For Shop Prices
```json
// expected data for parameters: ?shopId=

POST https://retwho.herokuapp.com/request?shopId=62c50c2a2f9edf419eeee4c2 HTTP/1.1

{
    "subscription": "premium"
}
```
### Sample Response for Request For Shop Prices
```json
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8

{
    "request": {
        "user": "62f7662b8adae9fa77e01e4c",
        "shop": "62c50c2a2f9edf419eeee4c2",
        "approved": false,
        "_id": "62f76a22aeb9e27c9262e950",
        "createdAt": "2022-08-13T09:08:50.971Z",
        "updatedAt": "2022-08-13T09:08:50.971Z",
        "__v": 0
    }
}
```

***
## Update Request for Shop Price
### Sample Request Format for Update Request for Shop Price
```json
// ADMIN ONLY
// expected data for parameters: ?rid={{ request._id }}

POST https://retwho.herokuapp.com/request?rid=62f76a22aeb9e27c9262e950 HTTP/1.1

{
    "approved": true,
    "subscription": "premium"
}
```

### Sample Response for Update Request for Shop Price
```json
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8

{
    "requests": {
        "_id": "62f76a22aeb9e27c9262e950",
        "user": "62f7662b8adae9fa77e01e4c",
        "shop": "62c50c2a2f9edf419eeee4c2",
        "approved": true,
        "createdAt": "2022-08-13T09:08:50.971Z",
        "updatedAt": "2022-08-13T09:16:34.316Z",
        "__v": 0
    }
}
```

***
## Admin Connect Sellers
### Sample Request Format for Admin Connect Sellers
```json
POST localhost:5000/request/connect HTTP/1.1

{
    "approved": true,
    "retailer": "62f767e03d4c49e612ca21df",
    "shop": "62e0fbb01c207142b2f3e4bd",
    "subscription": "premium"
}
```
### Sample Response for Admin Connect Sellers
```json
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8

{
    "requests": {
        "_id": "62fdc38a36bc1005cd1524d6",
        "user": "62fdbc5f03cdc5384da4b93b",
        "shop": "62fdc240c5c62607c03eb181",
        "subscription": "premium",
        "approved": false,
        "createdAt": "2022-08-18T04:43:54.693Z",
        "updatedAt": "2022-08-25T09:09:41.710Z",
        "__v": 0
    }
}
```


<!-- INTERNAL LINKS -->
[all-request]: /docs/request.md#get-all-requests
[request]: /docs/request.md#request-for-shop-prices
[update-request]: /docs/request.md#update-request-for-shop-price
[admin-connect]: /docs/request.md#admin-connect-sellers