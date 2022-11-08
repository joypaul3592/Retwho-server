# INFO ENDPOINTS
This document includes usage of **[Add/Update Info][info]**, **[Get Info][info-all]**
***
## Add to Info
### Sample Request Format for Add to Info
```json
// USER MUST BE ADMIN
PUT https://retwho.herokuapp.com/public/info HTTP/1.1
content-type: application/json

{
    "name": "RETWHO",
    "parent": "AIZAF GROUP LLC",
    "address": "4400 W SAMPLE RD. SUITE # 102 COCONUT CREEK FL-33073",
    "offices": [
        "Coconut Creek, FL"
    ],
    "workingHours": {
        "days": "Monday to Friday",
        "time": "9AM – 5PM EST"
    },
    "sales": "sales@retwho.com",
    "support": "support@retwho.com",
    "contact": "contact@retwho.com",
    "phone": "+1-305-981-6082"
}
```

### Sample Response to Success
```json
HTTP/1.1 201 CREATED
X-Powered-By: Express
Content-Type: application/json; charset=utf-8

{
    "info": {
        "workingHours": {
            "days": "Monday to Friday",
            "time": "9AM – 5PM EST"
        },
        "_id": "62f8f32632907b980e6c8f96",
        "user": "62f7662b8adae9fa77e01e4c",
        "name": "RETWHO",
        "parent": "AIZAF GROUP LLC",
        "address": "4400 W SAMPLE RD. SUITE # 102 COCONUT CREEK FL-33073",
        "offices": [
            "Coconut Creek, FL"
        ],
        "sales": "sales@retwho.com",
        "support": "support@retwho.com",
        "contact": "contact@retwho.com",
        "phone": "+1-305-981-6082",
        "role": "admin",
        "__v": 0,
        "updatedAt": "2022-08-25T08:23:50.491Z"
    }
}
```
***
## Get Info
### Sample Request Format for Get Info
```json
// THIS ENDPOINT IS PUBLIC
GET https://retwho.herokuapp.com/public/info HTTP/1.1
```

### Sample Response to Success
```json
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8

{
    "info": {
        "workingHours": {
            "days": "Monday to Friday",
            "time": "9AM – 5PM EST"
        },
        "_id": "62f8f32632907b980e6c8f96",
        "name": "RETWHO",
        "parent": "AIZAF GROUP LLC",
        "address": "4400 W SAMPLE RD. SUITE # 102 COCONUT CREEK FL-33073",
        "offices": [
            "Coconut Creek, FL"
        ],
        "sales": "sales@retwho.com",
        "support": "support@retwho.com",
        "contact": "contact@retwho.com",
        "phone": "+1-305-981-6082",
        "__v": 0,
        "updatedAt": "2022-08-25T08:23:50.491Z"
    }
}
```

<!-- INTERNAL LINKS -->
[info]: /docs/public/info.md#add-to-info
[info-all]: /docs/public/info.md#get-info