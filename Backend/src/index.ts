import app from './app'
import { PORT } from './config'
import { connectDB } from './db'


 async function main() {
    try {
        await connectDB()
        app.listen(PORT)
        console.log(`Servidor arrancado en el puerto ${PORT}`)
    } catch (error) {
        console.log("Error al conectarse")
    }
}
main()