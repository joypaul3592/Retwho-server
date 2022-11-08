# USER ENDPOINTS
This document includes usage of **[User Registration][Registration]**, **[Add User][add-user]**, **[Get Auth User][get-auth-user]**, **[Get All User][get-all-user]**, **[Update User][update-user]**, **[Delete User][delete-user]**

***
## User Registration
### Sample Request Format for User Registration
```json
// required query param: ?type
// accepted query params: ?type=wholeseller or ?type=retailer

POST https://retwho.herokuapp.com/register?type=wholeseller HTTP/1.1
content-type: multipart/form-data

{
  "agree":true,
  "city": "Dhaka",
  "companyEmail": "mail@mail.com",
  "companyName": "toto",
  "companyPhone": "1234567",
  "country": "Bangladesh",
  "email": "mail@mail.com",
  "feinCode": "12345", 
  "name": "Rofl Lol",
  "password": "qwerty",
  "postalCode": "bangladesh",
  "state_province_region": "KJDDJKL",
  "streetAddress": "21/1 H Block, Mirpur-2, Dhaka",
  // FILES (accecpted: [jpg, jpeg, png, pdf])
  "feinCopy": "FILE",
  "resalecert": "FILE",
  // OPTIONAL FILES
  "license": "FILE"
}
```

### Sample Response to Success
```json
HTTP/1.1 201 CREATED
X-Powered-By: Express
Content-Type: application/json; charset=utf-8

{
  "user": {
    "agree": false,
    "city": "Dhaka",
    "companyEmail": "mail@test.com",
    "companyName": "toto",
    "companyPhone": "1223345",
    "country": "Bangladesh",
    "email": "mail@test.com",
    "feinCode": "542346",
    "license": "http://res.cloudinary.com/retwho/image/upload/v1658120972/gnzzt339gskckqi9hdst.pdf",
    "name": "Rofl Lol",
    "postalCode": "bangladesh",
    "state_province_region": "KJDDJKL",
    "streetAddress": "21/1 H Block, Mirpur-2, Dhaka",
    "_id": "62d4eb09fd87445ca7e01350",
    "feinCopy": "http://res.cloudinary.com/retwho/image/upload/v1658120970/isbkz24t1sa0gwg1emsc.pdf",
    "resalecert": "http://res.cloudinary.com/retwho/image/upload/v1658120973/hwtv3ovsgrtkbjuvige4.pdf",
    "role": "retailer",
    "createdAt": "2022-07-18T05:09:34.295Z",
    "updatedAt": "2022-07-18T05:09:34.295Z",
    "__v": 0
  }
}
```

### Sample Response to Error
#### Unique key already exists
```json
// Response object will contain a **code** and a **error** message with HTTP Response Code

HTTP/1.1 500 INTERNAL SERVER ERROR
X-Powered-By: Express
Content-Type: application/json; charset=utf-8

{
  "code": 11000,
  "error": "E11000 duplicate key error collection: remote_work.users index: companyEmail_1 dup key: { companyEmail: \"mail@mail.com\" }"
}
```
#### Required fileds are not provided
```json
// Response object will contain a **error** message with HTTP Response Code

HTTP/1.1 400 BAD REQUEST
X-Powered-By: Express
Content-Type: application/json; charset=utf-8

{
  "error": "Invalid Request. \"felinCopy\" not provided or invalid file type."
}
```
#### Failed validation
```json
// Response object will contain a **error** message with HTTP Response Code

HTTP/1.1 500 INTERNAL SERVER ERROR
X-Powered-By: Express
Content-Type: application/json; charset=utf-8

{
  "error": "User validation failed: city: Path `city` is required., agree: Path `agree` is required."
}
```

***
## Add User
### Sample Request Format for Add User
```json
POST https://retwho.herokuapp.com/user HTTP/1.1
content-type: multipart/form-data

{
  "name": "Aizaf Salesman",
  "phone": "01928346",
  "role": "salesman",
  "email": "salesman@example.com"
}
```

### Sample Response to Success
```json
HTTP/1.1 201 CREATED
X-Powered-By: Express
Content-Type: application/json; charset=utf-8

{
  "employees": [
    {
      "_id": "62f8811864b7267015195f6b",
      "employer": "62e26fa52ea93e7bff5cd4f8",
      "name": "Aizaf Manager",
      "phone": "01928346",
      "role": "manager",
      "shop": "62e61ae396197d36547a617c",
      "email": "manager@example.com",
      "__v": 0
    }
  ]
}
```

***
## Get Auth User
### Sample Request Format for Get Auth User
```json
// required query param: ?email=
GET https://retwho.herokuapp.com/auth/user?email=salesman@example.com HTTP/1.1
```

### Sample Response to Success
```json
HTTP/1.1 201 CREATED
X-Powered-By: Express
Content-Type: application/json; charset=utf-8

{
  "user": {
    "uid": "0L6DS3eYYQQ4NnPrL5wu4ACUMYS2",
    "email": "salesman@example.com",
    "emailVerified": false,
    "disabled": false,
    "metadata": {
      "lastSignInTime": null,
      "creationTime": "Sat, 13 Aug 2022 15:56:10 GMT"
    },
    "customClaims": {
      "role": "salesman",
      "priceType": null
    },
    "tokensValidAfterTime": "Sat, 13 Aug 2022 15:56:10 GMT",
    "providerData": [
      {
        "uid": "salesman@example.com",
        "email": "salesman@example.com",
        "providerId": "password"
      }
    ]
  }
}
```

***
## Get All User
### Sample Request Format for Get All User
```json
// accepted query param: ?email=, ?name=, ?phone=, ?role=, ?email=
GET https://retwho.herokuapp.com/user HTTP/1.1
```

### Sample Response to Success
```json
HTTP/1.1 201 CREATED
X-Powered-By: Express
Content-Type: application/json; charset=utf-8

{
  "user": {
    "uid": "0L6DS3eYYQQ4NnPrL5wu4ACUMYS2",
    "email": "salesman@example.com",
    "emailVerified": false,
    "disabled": false,
    "metadata": {
      "lastSignInTime": null,
      "creationTime": "Sat, 13 Aug 2022 15:56:10 GMT"
    },
    "customClaims": {
      "role": "salesman",
      "priceType": null
    },
    "tokensValidAfterTime": "Sat, 13 Aug 2022 15:56:10 GMT",
    "providerData": [
      {
        "uid": "salesman@example.com",
        "email": "salesman@example.com",
        "providerId": "password"
      }
    ]
  }
}
```

***
## Update User
### Sample Request Format for Update User
```json
PUT https://retwho.herokuapp.com/user HTTP/1.1
content-type: multipart/form-data

{
  "priceType": "premium",
  "role": "salesman",
  "email": "salesman@example.com"
}
```

### Sample Response to Success
```json
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8

{
  "success": true
}
```

***
## Delete User
### Sample Request Format for Delete User
```json
// required query param: ?email=
DELETE https://retwho.herokuapp.com/user?email=salesman@example.com HTTP/1.1
```

### Sample Response to Success
```json
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8

{
  "user": {
    "acknowledged": true,
    "deletedCount": 1
  }
}
```

***
## Get Sellers
### Sample Request Format for Get Sellers
```json
// REQUIRED PARAMS ?sort=-1/1 (-1 for DESC and 1 for ASC), ?page=0 (0,1,2...)
GET https://retwho.herokuapp.com/user/all?sort=-1&page=0 HTTP/1.1
```

### Sample Response to Success
```json
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8

{
    "employees": [
        {
            "_id": "630c69f7b80b6611514f8c8b",
            "agree": true,
            "city": "Dhaka",
            "companyEmail": "wholesaler@example.com",
            "companyName": "toto",
            "companyPhone": "1223345",
            "country": "Bangladesh",
            "email": "wholesaler@example.com",
            "feinCode": "542346",
            "license": "http://res.cloudinary.com/retwho/image/upload/v1661757948/wefs1ordepxsid6m6t9p.png",
            "name": "Aizaf Wholesaler",
            "postalCode": "bangladesh",
            "state_province_region": "KJDDJKL",
            "streetAddress": "21/1 H Block, Mirpur-2, Dhaka",
            "feinCopy": "http://res.cloudinary.com/retwho/image/upload/v1661757945/fam5fr2llzbkjcrfwmsy.png",
            "resalecert": "http://res.cloudinary.com/retwho/image/upload/v1661757952/cpt803w5b5zkq5nwdjzn.png",
            "role": "retailer",
            "createdAt": "2022-08-29T07:25:52.985Z",
            "updatedAt": "2022-08-29T07:25:52.985Z",
            "__v": 0
        },
        {
            "_id": "62fdbc5f03cdc5384da4b93b",
            "agree": true,
            "city": "Dhaka",
            "companyEmail": "retailer@example.com",
            "companyName": "toto",
            "companyPhone": "1223345",
            "country": "Bangladesh",
            "email": "retailer@example.com",
            "feinCode": "542346",
            "license": "http://res.cloudinary.com/retwho/image/upload/v1660796003/yxna3mi8uk5lwrlnii4j.png",
            "name": "Aizaf Retailer",
            "postalCode": "bangladesh",
            "state_province_region": "KJDDJKL",
            "streetAddress": "21/1 H Block, Mirpur-2, Dhaka",
            "feinCopy": "http://res.cloudinary.com/retwho/image/upload/v1660796001/p30qnsdhaer4yqagy6gr.png",
            "resalecert": "http://res.cloudinary.com/retwho/image/upload/v1660796006/dzno1txbsvokgjf4yz5y.png",
            "role": "retailer",
            "createdAt": "2022-08-18T04:13:27.011Z",
            "updatedAt": "2022-08-18T04:13:27.011Z",
            "__v": 0
        },
        {
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
        {
            "_id": "62e78a91c4f434b984abb71e",
            "agree": false,
            "city": "Dhaka",
            "companyEmail": "nello@example.com",
            "companyName": "toto",
            "companyPhone": "1223345",
            "country": "Bangladesh",
            "email": "nello@example.com",
            "feinCode": "542346",
            "license": "http://res.cloudinary.com/retwho/image/upload/v1659341461/l7bgrs09oahmvajefpwo.png",
            "name": "Rofl Lol",
            "postalCode": "bangladesh",
            "state_province_region": "KJDDJKL",
            "streetAddress": "21/1 H Block, Mirpur-2, Dhaka",
            "feinCopy": "http://res.cloudinary.com/retwho/image/upload/v1659341459/zdhuum3nfaeyf7riypgc.png",
            "resalecert": "http://res.cloudinary.com/retwho/image/upload/v1659341464/j0olwatptvspc0ydr4d2.png",
            "role": "wholeseller",
            "createdAt": "2022-08-01T08:11:05.294Z",
            "updatedAt": "2022-08-01T08:11:05.294Z",
            "__v": 0
        },
        {
            "_id": "62e78a57eb933d9c80364043",
            "agree": false,
            "city": "Dhaka",
            "companyEmail": "jello@example.com",
            "companyName": "toto",
            "companyPhone": "1223345",
            "country": "Bangladesh",
            "email": "jello@example.com",
            "feinCode": "542346",
            "license": "http://res.cloudinary.com/retwho/image/upload/v1659341404/bctjlavvqyuizvl22flg.png",
            "name": "Rofl Lol",
            "postalCode": "bangladesh",
            "state_province_region": "KJDDJKL",
            "streetAddress": "21/1 H Block, Mirpur-2, Dhaka",
            "feinCopy": "http://res.cloudinary.com/retwho/image/upload/v1659341401/xibwypqkorzo8d8iwitc.png",
            "resalecert": "http://res.cloudinary.com/retwho/image/upload/v1659341406/qgjwoigkese3wkm6dcpz.png",
            "role": "wholeseller",
            "createdAt": "2022-08-01T08:10:07.585Z",
            "updatedAt": "2022-08-01T08:10:07.585Z",
            "__v": 0
        },
        {
            "_id": "62e787ae1832268c50c170a0",
            "agree": false,
            "city": "Dhaka",
            "companyEmail": "hello@example.com",
            "companyName": "toto",
            "companyPhone": "1223345",
            "country": "Bangladesh",
            "email": "hello@example.com",
            "feinCode": "542346",
            "license": "http://res.cloudinary.com/retwho/image/upload/v1659340722/laxwdws212mqhtbdaj1i.png",
            "name": "Rofl Lol",
            "postalCode": "bangladesh",
            "state_province_region": "KJDDJKL",
            "streetAddress": "21/1 H Block, Mirpur-2, Dhaka",
            "feinCopy": "http://res.cloudinary.com/retwho/image/upload/v1659340720/soole7nt1pm6ya2kz3up.png",
            "resalecert": "http://res.cloudinary.com/retwho/image/upload/v1659340725/is8xvsijksjuahohpain.png",
            "role": "wholeseller",
            "createdAt": "2022-08-01T07:58:46.155Z",
            "updatedAt": "2022-08-01T07:58:46.155Z",
            "__v": 0
        },
        {
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
        {
            "_id": "62d4eb09fd87445ca7e01350",
            "agree": false,
            "city": "Dhaka",
            "companyEmail": "mail@test.com",
            "companyName": "toto",
            "companyPhone": "1223345",
            "country": "Bangladesh",
            "email": "mail@test.com",
            "feinCode": "542346",
            "license": "http://res.cloudinary.com/retwho/image/upload/v1658120972/gnzzt339gskckqi9hdst.pdf",
            "name": "Rofl Lol",
            "postalCode": "bangladesh",
            "state_province_region": "KJDDJKL",
            "streetAddress": "21/1 H Block, Mirpur-2, Dhaka",
            "feinCopy": "http://res.cloudinary.com/retwho/image/upload/v1658120970/isbkz24t1sa0gwg1emsc.pdf",
            "resalecert": "http://res.cloudinary.com/retwho/image/upload/v1658120973/hwtv3ovsgrtkbjuvige4.pdf",
            "role": "retailer",
            "createdAt": "2022-07-18T05:09:34.295Z",
            "updatedAt": "2022-07-18T05:09:34.295Z",
            "__v": 0
        },
        {
            "_id": "62c3dbf34cca62b2250ce28e",
            "agree": false,
            "city": "Dhaka",
            "companyEmail": "mail@mail.com",
            "companyName": "toto",
            "companyPhone": "1223345",
            "country": "Bangladesh",
            "email": "mail@mail.com",
            "feinCode": "542346",
            "license": "http://res.cloudinary.com/retwho/image/upload/v1657002998/kwzwyclgghnyzokah7ul.pdf",
            "name": "Rofl Lol",
            "postalCode": "bangladesh",
            "state_province_region": "KJDDJKL",
            "streetAddress": "21/1 H Block, Mirpur-2, Dhaka",
            "feinCopy": "http://res.cloudinary.com/retwho/image/upload/v1657002996/ifdghjdydvzoomjhp2pf.pdf",
            "resalecert": "http://res.cloudinary.com/retwho/image/upload/v1657003000/vj5aajifwsxuakmabyta.pdf",
            "role": "retailer",
            "createdAt": "2022-07-05T06:36:40.618Z",
            "updatedAt": "2022-07-05T06:36:40.618Z",
            "__v": 0,
            "approved_shop": "62f4a4a22420d37865b7e949"
        }
    ]
}
```


<!-- INTERNAL LINKS -->
[Registration]: /docs/user.md#user-registration
[add-user]: /docs/user.md#add-user
[get-auth-user]: /docs/user.md#get-auth-user
[get-all-user]: /docs/user.md#get-all-user
[update-user]: /docs/user.md#update-user
[delete-user]: /docs/user.md#delete-user