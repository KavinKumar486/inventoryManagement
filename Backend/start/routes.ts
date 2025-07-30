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
import AdminLoginsController from '../app/controllers/admin_logins_controller.js'
// import { Route } from '@adonisjs/core/http'
router.post('/add',[AdminLoginsController,'add'])
router.post('/login', [Logincontroller, 'verify'])
router.post('/admin/login', [AdminLoginsController, 'login'])
router.group(()=>{
  router.get('/get/:id?',[CustomerController,'get'])
  router.post('/add',[CustomerController,'add'])
  router.delete('/delete/:id',[CustomerController,'delete'])
  router.patch('/patch/:id',[CustomerController,'patch'])
  router.put('/update/:id',[CustomerController,'update'])
  
}).prefix('/customers')

router.group(()=>{
  router.get('/get/:id?',[OrdersController,'get']), 
  router.post('/add',[OrdersController,'add']),
  router.delete('/delete',[OrdersController,'delete']),
  router.patch('/patch/:id',[OrdersController,'patch']),
  router.put('/update/:id',[OrdersController,'update'])
}).prefix('/orders')

router.group(()=>{
  router.get('/get/:id?',[WarehouseController,'get']),
  router.post('/add',[WarehouseController,'add']),
  router.delete('/delete/:id',[WarehouseController,'delete']),
  router.patch('/patch/:id',[WarehouseController,'patch']),
  router.put('/update/:id',[WarehouseController,'update'])
}).prefix('/warehouse')

router.group(() => {
  
  router.get('/customers/get', 'CustomersController.get')
  router.post('/customers/add', 'CustomersController.add')
  router.put('/customers/update/:id', 'CustomersController.update')
  router.delete('/customers/delete/:id', 'CustomersController.delete')

  
  router.get('/warehouse/get', 'WarehouseController.get')
  router.post('/warehouse/add', 'WarehouseController.add')
  router.put('/warehouse/update/:id', 'WarehouseController.update')
  router.delete('/warehouse/delete/:id', 'WarehouseController.delete')

  
  router.get('/orders/get', 'OrdersController.get')
  router.post('/orders/add', 'OrdersController.add')
  router.put('/orders/update/:id', 'OrdersController.update')
  router.delete('/orders/delete/:id', 'OrdersController.delete')
}).prefix('/admin')
