# CONTACT MESSAGE ENDPOINTS
This document includes usage of **[Add Contact Message][contact]**, **[Get Contact Messages][contact-all]**, **[Delete Contact Message][contact-delete]**
***
## Add Contact Message
### Sample Request Format for Add Contact Message
```json
// THIS ENDPOINT IS PUBLIC
POST https://retwho.herokuapp.com/public/contact HTTP/1.1
content-type: application/json

{
    "email": "retwho@gmail.com",
    "name": "retwho user",
    "company": "retwho",
    "query": "Does this actually works?"
}
```

### Sample Response to Success
```json
HTTP/1.1 201 CREATED
X-Powered-By: Express
Content-Type: application/json; charset=utf-8

{
    "contact": {
        "email": "retwho@gmail.com",
        "name": "retwho user",
        "company": "retwho",
        "query": "Does this actually works?",
        "_id": "63073324b4faf8e703ccfd8b",
        "createdAt": "2022-08-25T08:30:28.132Z",
        "updatedAt": "2022-08-25T08:30:28.132Z",
        "__v": 0
    }
}
```
***
## Get Contact Messages
### Sample Request Format for Get Contact Messages
```json
// USER MUST BE ADMIN
GET https://retwho.herokuapp.com/public/contact HTTP/1.1
```

### Sample Response to Success
```json
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8

{
    "contact": [
        {
            "_id": "63073324b4faf8e703ccfd8b",
            "email": "retwho@gmail.com",
            "name": "retwho user",
            "company": "retwho",
            "query": "Does this actually works?",
            "createdAt": "2022-08-25T08:30:28.132Z",
            "updatedAt": "2022-08-25T08:30:28.132Z",
            "__v": 0
        }
    ]
}
```
***
## Delete Contact Messages
### Sample Request Format for Delete Contact Messages
```json
// USER MUST BE ADMIN
DELETE https://retwho.herokuapp.com/public/contact?cid=62f8ecf93b639cd0589be7e8 HTTP/1.1
```

### Sample Response to Success
```json
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8

{
    "contact": {
        "acknowledged": true,
        "deletedCount": 1
    }
}
```


<!-- INTERNAL LINKS -->
[contact]: /docs/public/contact.md#add-contact-message
[contact-all]: /docs/public/contact.md#get-contact-messages
[contact-delete]: /docs/public/contact.md#delete-contact-messages