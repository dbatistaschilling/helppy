import { adaptRoute } from './../adapters/express-route-adapter'
import { Router } from 'express'
import { makeSignUpFactory } from './../factories/auth/SignUpFactory'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpFactory()))
}
