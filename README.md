# securens

# Table of Contents

- [Description](#description)
- [Dependencies](#dependencies)
- [Deployment](#deployment)
- [Usage](#usage)

### description
A nodejs based REST api as a solution for problem statement by heady.

### dependencies
  - nodejs == 4.2.6
  - npm == 3.5.2
  - mongodb server == 3.2.18


#### required node packages
  - body-parser == ^1.18.2
  - express == ^4.16.2
  - mongoose == ^5.0.2


## deployment
make sure that nodejs and npm are installed as per the version mentioned,
and mongodb server is either installed locally or remote and database uri is
set in environment.

  - clone the repository on the local machine.
  - install required node packages while inside project directory like below.

```sh
npm install

```

  - add PORT and MONGODB_URL path in your environment like below or go ahead with
  default 3000 port hardcoded in application along with default database url.
  Below command can also be added in .bashrc to avoid repeating these commands.

```sh
export PORT=<PORT>
export MONGODB_URL = <MONGODB DATABASE URL>
```


## usage
Go inside the project directory and run below command.

```sh
node server.js
```
server should be up and running, the REST API takes data in form of
x-www-form-urlencoded, please follow the below curl commands to test
the api.
  - to get all categories with child_categories run below curl command.

```sh
curl -X GET http://<SERVER>:<PORT>/api/category/
```
  - to get a category with specific id, run below curl command.

```sh
curl -X GET http://<SERVER>:<PORT>/api/category/<CATEGORY ID>
```
  - to create a category with specific child categories, run below command,
  make sure that child category ids are surrounded with double quotes instead
  of single

```sh
curl -X POST -H "Content-Type: application/x-www-form-urlencoded" \
-d 'name=<Category Name>&child_categories=["<CATEGORY ID 1>",...]'\
 http://<SERVER>:<PORT>/api/category/
```

  - if you want to modify existing category, for example, may be you want to put a newly
  created category as child category into some existing category, follow the below curl command.
  Again the child categories id has to be enclosed by double quotes. Also specify the fields you
  want to change only.

```sh
curl -X PUT -H "Content-Type: application/x-www-form-urlencoded" \
-d 'name=<new name>&child_categories=["<CHILD CATEGORY ID>",...]'\
 http://<SERVER>:<PORT>/api/category/<CATEGORY ID>
```

  - to get all products.
```sh
curl -X GET http://<SERVER>:<PORT>/api/product/
```
  - to get a product with specific id.
```sh
curl -X GET http://<SERVER>:<PORT>/api/product/<PRODUCT ID>
```
  - to get a product with specific category id.

```sh
curl -X GET http://<SERVER>:<PORT>/api/product_by_category/<CATEGORY ID>
```

  - to create a new product.

```sh
curl -X POST -H "Content-Type: application/x-www-form-urlencoded" \
-d 'title=<TITLE>&description=<DESCRIPTION>&price=<PRICE>&categories=["<CATEGORY_ID>",...]'\
 http://<SERVER>:<PRODUCT>/api/product/
```

  - if you need to modify the product fields, for example lets update the price
  of a product with specific id.

```sh
curl -X PUT -H "Content-Type: application/x-www-form-urlencoded" \
-d 'title=<NEW TITLE>' http://<SERVER>:<PORT>/api/product/<PRODUCT ID>
```
