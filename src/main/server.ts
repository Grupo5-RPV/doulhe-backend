import App from './app'

import '../infra/typeorm/connect'

(async () => {
  const app = new App(3333)
  await app.run()
})()
