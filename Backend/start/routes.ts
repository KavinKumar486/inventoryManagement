/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import CustomerController from '../app/controllers/customers_controller.js'
import OrdersController from '../app/controllers/orders_controller.js'
import WarehouseController from '../app/controllers/warehouses_controller.js'
import Logincontroller from '../app/controllers/login_controller.js'
import {middleware}  from '#start/kernel'

router.post('/login', [Logincontroller, 'verify'])
router.group(()=>{
  router.get('/get/:id?',[CustomerController,'get'])
  router.post('/add',[CustomerController,'add'])
  router.delete('/delete/:id',[CustomerController,'delete'])
  router.patch('/patch',[CustomerController,'patch'])
  router.put('/update',[CustomerController,'update'])
}).prefix('/customers')

router.group(()=>{
  router.get('/get/:id?',[OrdersController,'get']),
  router.post('/add',[OrdersController,'add']),
  router.delete('/delete',[OrdersController,'delete']),
  router.patch('/patch',[OrdersController,'patch']),
  router.put('/update',[OrdersController,'update'])
}).prefix('/orders').use(middleware.jwt)

router.group(()=>{
  router.get('/get/:id?',[WarehouseController,'get']),
  router.post('/add',[WarehouseController,'add']),
  router.delete('/delete',[WarehouseController,'delete']),
  router.patch('/patch',[WarehouseController,'patch']),
  router.put('/update',[WarehouseController,'update'])
}).prefix('/warehouse')