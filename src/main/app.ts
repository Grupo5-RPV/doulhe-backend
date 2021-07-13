import express, { Application } from 'express'
import { bodyParser, cors } from './middlewares'
import * as routes from './routes'
import connection from '../infra/typeorm/connect'

class App {
  private readonly server: Application

  constructor (private readonly port: number) {
    this.server = express()
    this.port = port
  }

  private setupMiddlewares (): void {
    this.server.use(bodyParser)
    this.server.use(cors)
  }

  private setupRoutes (): void {
    Object.values(routes).forEach(route => this.server.use(route))
  }

  private async connectToDatabase (): Promise<void> {
    await connection()
  }

  private async setupServer (): Promise<void> {
    await this.connectToDatabase()
    this.setupMiddlewares()
    this.setupRoutes()
  }

  public getServerInstance (): Application {
    return this.server
  }

  public async run (): Promise<void> {
    try {
      await this.setupServer()
      this.server.listen(this.port, () => {
        console.log(`Server Running at http://localhost:${this.port}`)
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export default App
