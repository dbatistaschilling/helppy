import { adaptRoute } from './../adapters/express-route-adapter'
import { Router } from 'express'
import { makeLoginFactory } from './../factories/auth/LoginFactory'

export default (router: Router): void => {
  router.post('/login', adaptRoute(makeLoginFactory()))
}
