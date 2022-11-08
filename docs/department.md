# DEPARTMENT ENDPOINTS
This document includes usage of **[Add Department][department]**, **[Update Department][update]**, **[Get All Departments][all]**, **[Get Filtered Departments][filter]**, **[Delete Department][delete]**

***
## Add Department
### Sample Request Format for Add Department
```json
POST https://retwho.herokuapp.com/department HTTP/1.1
content-type: multipart/form-data

{
  "dept_name": "Manager",
  "active": true,
  "tax_stage": "3rd",
  "shop": "62c50c2a2f9edf419eeee4c2",
}
```

### Sample Response to Success
```json
HTTP/1.1 201 CREATED
X-Powered-By: Express
Content-Type: application/json; charset=utf-8

{
  "department": {
    "dept_name": "Manager",
    "active": true,
    "tax_stage": "3rd",
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
    "_id": "62d8ec4b5a6a9796df29a8c8",
    "createdAt": "2022-07-21T06:03:55.424Z",
    "updatedAt": "2022-07-21T06:03:55.424Z",
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
  "error": "department validation failed: dept_name: Path `dept_name` is required."
}
```

***
## Update department
### Sample Request Format for Update department
```json
POST https://retwho.herokuapp.com/department?deptId=62d8ec4b5a6a9796df29a8c8 HTTP/1.1
content-type: multipart/form-data

{
  "dept_name": "manager",
  "tax_stage": "2nd"
}
```

### Sample Response to Success
```json
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8

{
  "department": {
    "_id": "62d8ec4b5a6a9796df29a8c8",
    "dept_name": "manager",
    "active": true,
    "tax_stage": "2nd",
    "shop": "62c50c2a2f9edf419eeee4c2",
    "createdAt": "2022-07-21T06:03:55.424Z",
    "updatedAt": "2022-07-21T06:04:59.116Z",
    "__v": 0
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
  "error": "department validation failed: dept_name: Path `dept_name` is required."
}
```

***
## Get All Departments
### Sample Request for Get All Departments
```json
GET https://retwho.herokuapp.com/department HTTP/1.1
```
### Sample Response for Success
```json
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8

{
  "departments": [
    {
      "_id": "62c5123a9f570cc0d10f8872",
      "dept_name": "manager",
      "active": true,
      "tax_stage": "3rd",
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
      "createdAt": "2022-07-06T04:40:26.976Z",
      "updatedAt": "2022-07-20T06:30:45.054Z",
      "__v": 0
    },
    {
      "_id": "62d8ec4b5a6a9796df29a8c8",
      "dept_name": "manager",
      "active": true,
      "tax_stage": "2nd",
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
      "createdAt": "2022-07-21T06:03:55.424Z",
      "updatedAt": "2022-07-21T08:38:40.836Z",
      "__v": 0
    }
  ]
}
```

***
## Get Filtered Department
### Sample Request for Get Filtered Departments #1
```json
// accpeted parameteres: ?_id=, ?dept_name=, ?active=, ?tax_stage=, ?shop=, ?createdAt=
// parameteres can be chained
GET https://retwho.herokuapp.com/department?_id=62d8ec4b5a6a9796df29a8c8 HTTP/1.1
```
### Sample Response for Success #1
```json
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8

{
  "departments": [
    {
      "_id": "62d8ec4b5a6a9796df29a8c8",
      "dept_name": "manager",
      "active": true,
      "tax_stage": "2nd",
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
      "createdAt": "2022-07-21T06:03:55.424Z",
      "updatedAt": "2022-07-21T08:38:40.836Z",
      "__v": 0
    }
  ]
}
```
### Sample Request for Get Filtered Departments #2
```json
// accpeted parameteres: ?_id=, ?dept_name=, ?active=, ?tax_stage=, ?shop=, ?createdAt=
// parameteres can be chained
GET https://retwho.herokuapp.com/department?shop=62d91ec42a7257d528126ed7 HTTP/1.1
```
### Sample Response for Success #2
```json
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8

{
  "departments": [
    {
      "_id": "62da711084146cb9623f55e0",
      "dept_name": "admin",
      "active": true,
      "tax_stage": "1st",
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
      "createdAt": "2022-07-22T09:42:40.142Z",
      "updatedAt": "2022-07-22T09:54:55.981Z",
      "__v": 0
    },
    {
      "_id": "62da718a035e3861be8e4a5e",
      "dept_name": "manager",
      "active": false,
      "tax_stage": "1st",
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
      "createdAt": "2022-07-22T09:44:42.386Z",
      "updatedAt": "2022-07-22T09:44:42.386Z",
      "__v": 0
    }
  ]
}
```
### Sample Request for Get Filtered Departments #3
```json
// accpeted parameteres: ?_id=, ?dept_name=, ?active=, ?tax_stage=, ?shop=, ?createdAt=
// parameteres can be chained
GET https://retwho.herokuapp.com/department?tax_stage=1st&active=true HTTP/1.1
```
### Sample Response for Success #3
```json
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8

{
  "departments": [
    {
      "_id": "62da711084146cb9623f55e0",
      "dept_name": "admin",
      "active": true,
      "tax_stage": "1st",
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
      "createdAt": "2022-07-22T09:42:40.142Z",
      "updatedAt": "2022-07-22T09:54:55.981Z",
      "__v": 0
    },
    {
      "_id": "62da718a035e3861be8e4a5e",
      "dept_name": "manager",
      "active": true,
      "tax_stage": "1st",
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
      "createdAt": "2022-07-22T09:44:42.386Z",
      "updatedAt": "2022-07-22T18:15:22.486Z",
      "__v": 0
    }
  ]
}
```
***
## Delete Department
### Sample Request Format for Delete Department
```json
DELETE https://retwho.herokuapp.com/department?deptId=62d8ec4b5a6a9796df29a8c8 HTTP/1.1
```
### Sample Response for Delete Department
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
[department]: /docs/department.md#add-department
[update]: /docs/department.md#update-department
[all]: /docs/department.md#get-all-departments
[filter]: /docs/department.md#get-filtered-department
[delete]: /docs//department.md#delete-department