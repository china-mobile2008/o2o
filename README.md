# o2o
This repo is for making pages of O2O app in React Native. 

This repo is made using below boilerplate
https://github.com/facebook/react-native/tree/master/react-native-cli

For running native apps made with React Native, there are somethings which are prerequisite, please go to the below link or more details.
https://facebook.github.io/react-native/docs/getting-started.html

Steps to install and run this repo

1. git clone git@github.com:haani104/o2o.git
2. If you have `yarn` installed globally do `yarn install`. If not install yarn first.
3. To run app in Android emulator or device, run command `react-native run-android` or
4. To run app in iOS emulator or device, run command `react-native run-ios`.


# Functionalities

## Overview
O2O (Online to Offline) is a some kind of POS (Point of Sales) application. Basic idea is:

 1. We will have booth on merchant shop (offline, at mall). The booth will have android device with O2O app installed.
 2. Merchant sales officer will login to O2O app
 3. Potential buyer will come to merchant shop (offline, at mall)
 3. Potential buyer will browse products on O2O App like he browse on tokopedia.com. However, products displayed will only come from current shop
 4. Potential buyer will add to cart, checkout and pay
 5. Payment can be done using online (credit card entry), swiping credit card on device (offline experience), or cicilan (loan)

 
## PRD
PRD URL : [Here](https://docs.google.com/document/d/1WA8FeZ2A-mKKqtxzyKOtoWFuawTVkhdRskB5LFg6tUY/edit?ts=59700ab5#)

## Scope & Limitation
### As for Q3 2017
**Scope**
Refer to [Jira Breakdown](https://jira.tokopedia.net/browse/OS-550)

**Limitation**
Refer to [PRD](https://docs.google.com/document/d/1WA8FeZ2A-mKKqtxzyKOtoWFuawTVkhdRskB5LFg6tUY/edit?ts=59700ab5#)

---

# Technical

## Task Breakdown
For task breakdown & PIC, please refer to [Jira](https://jira.tokopedia.net/browse/OS-550)

## Tech Stack  
Front end : Mixed between Android Native & React Native. Some components taht can be reused from current Tokopedia Android native app can be reuser
Backend : Golang  

## Tech Architecture - Validation
![O2O Gateway Server](https://drive.google.com/uc?id=0B7_GwsrwKwMFeWtVM3Y4S3NYYzg)

### O2O App & OAUTH Scope
Not all shop can access O2O apps), although O2O merchant is always Tokopedia Merchant. 
Example : both merchant X and Y can login and maintain store on tokopedia.com, but only merchant Y has access to O2O.
Thus, during login we will need to add scope to OAUTH. The flow will be :

 1. Register username/password into O2O scope on OAUTH (ex: *o2o_delegate* for merchant Y)
 2. On O2O app : login using username/password During login, check whether username/password combination is valid AND has *o2o_delegate* on OAUTH scope 
 3. Possibilities:
     - username / password combination correct **AND** has *o2o_delegate* scope on OAUTH => VALID login and return access token
     - username / password combination incorrect => INVALID login
     - username / password combination correct but no *o2o_delegate* scope on OAUTH for that combination => INVALID login

On Android App, there will be auto refresh access token, so it will never expires except user logout. See 
  

### O2O Gateway Server
This will act as validation server to validate API call against access token / OAUTH scope. See diagram above. 


### Tech Requirement
#### Tribe - User
 - [New] OAUTH scope (see tech diagram above) 

#### Tribe - Order
 - [New] Get Payment API. Refer to [this Jira task](https://jira.tokopedia.net/browse/OS-687). 
 - [New] API to create order from local cart. Refer to [this Jira task](https://jira.tokopedia.net/browse/OS-644). 
 - [New] API for wrapper auto Finish Transaction. Refer to [this Jira task](https://jira.tokopedia.net/browse/OS-669).
 - [Change] API for transaction per address. Refer to [this Jira task](https://jira.tokopedia.net/browse/OS-643).

#### Tribe - Payment
  - [Change to JSON] create payment : need transaction id & trans amount
  - [New] check valid loan tenure for each bank
  - [New] verify payment
  - [New] validate cc during scan. Check whether this is card number is really from bank X (bank that user select on checkout)
  - [New] void transaction
  - [Question] Void transaction button should be valid for how many hours?

#### Tribe - Official Store
  - Add additional information during payment succeed : about the 14 days bill period full amount (if different bank)… show only outside 5 big banks
  - Email template : receipt (invoice)
  - Email template : void (invoice)
  - API for email dispatcher : hit Order API to get transaction detail based on invoice id, and send it
  - to void trans, you must enter password again

#### Tribe - Apps
  - [New] Hit new endpoint for login, based on OAUTH
  - [New] Auto refresh token periodically
  
  
### Payment Flow
    1. Add item to local cart
    2. Checkout from local cart. During this time, call Order's API to get payment id / transaction id
    3. Scan card, validate credit card during scan (call Payment's validate cc API)
    4. Use payment ID to do payment (call Payment's create payment API)
    5. If the payment succeed, show thank you page. At the same time (asynchronously), call these 2 APIS in sequence : Order's create order API and then Order's auto finish API
    6. Clear the cart
    
Need to create handler on O2O App in case payment can be created (point 4 return succeed), but app crashes so point 5 not happens. The handler should be on app restart, if there's local order with payment succeed (point 4 succeed), but order not created (point 5 failed), then it will retry point 5. So we might need status on local cart, like *local_order_id, payment_id, payment_status, and order_status*. Transaction should be marked complete only if *payment_status* and *order_status* are both complete.
