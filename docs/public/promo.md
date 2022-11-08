# PROMO ENDPOINTS
This document includes usage of **[Add/Update Promo][promo]**, **[Get Promo][promo-all]**
***
## Add to Promo
### Sample Request Format for Add to Promo
```json
// USER MUST BE ADMIN
PUT https://retwho.herokuapp.com/public/promo HTTP/1.1
content-type: application/json

{
  "title": "get amazing services again",
  "url": "youtube.com/hello-there"
}
```

### Sample Response to Success
```json
HTTP/1.1 201 CREATED
X-Powered-By: Express
Content-Type: application/json; charset=utf-8

{
    "promo": {
        "_id": "63072cbec9d233febef55ab3",
        "role": "admin",
        "__v": 0,
        "createdAt": "2022-08-25T08:03:10.069Z",
        "title": "get amazing services again",
        "updatedAt": "2022-08-25T08:14:14.868Z",
        "url": "youtube.com/hello-there",
        "user": "62f7662b8adae9fa77e01e4c"
    }
}
```
***
## Get Promo
### Sample Request Format for Get Promo
```json
// THIS ENDPOINT IS PUBLIC
GET https://retwho.herokuapp.com/public/promo HTTP/1.1
```

### Sample Response to Success
```json
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8

{
    "promo": {
        "_id": "63072cbec9d233febef55ab3",
        "__v": 0,
        "createdAt": "2022-08-25T08:03:10.069Z",
        "title": "get amazing services again",
        "updatedAt": "2022-08-25T08:14:14.868Z",
        "url": "youtube.com/hello-there"
    }
}
```

<!-- INTERNAL LINKS -->
[promo]: /docs/public/promo.md#add-to-promo
[promo-all]: /docs/public/promo.md#get-promo