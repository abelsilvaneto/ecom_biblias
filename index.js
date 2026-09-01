const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

const PORT = process.env.PORT || 3000

const conn = require('./db/conn')
require('./models/rel')

// Controllers
const usuarioController = require('./controllers/UsuarioController')
const categoriaController = require('./controllers/CategoriaController')
const produtoController = require('./controllers/ProdutoController')
const estoqueController = require('./controllers/EstoqueController')
const pedidoController = require('./controllers/PedidoController')
const itemPedidoController = require('./controllers/ItemPedidoController')
const entregaController = require('./controllers/EntregaController')
const authController = require('./controllers/auth.controller')
const authMiddleware = require('./middleware/authMiddleware')

// Middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

// Rotas Públicas
app.get('/', (req, res) => {
    res.status(200).json({ message: 'API rodando no Railway!' })
})
app.post('/usuario', usuarioController.cadastrar)
app.post('/login', authController.login)
app.get('/categorias', categoriaController.listar)
app.get('/produtos', produtoController.listar)

// Middleware de Autenticação
app.use(authMiddleware)

// Rotas Protegidas
app.get('/usuarios', usuarioController.listar)
app.get('/usuario/:id', usuarioController.consultar)
app.put('/usuario/:id', usuarioController.atualizar)
app.delete('/usuario/:id', usuarioController.apagar)

app.post('/categoria', categoriaController.cadastrar)
app.put('/categoria/:id', categoriaController.atualizar)
app.delete('/categoria/:id', categoriaController.apagar)

app.post('/produto', produtoController.cadastrar)
app.get('/produto/:id', produtoController.consultar)
app.put('/produto/:id', produtoController.atualizar)
app.delete('/produto/:id', produtoController.apagar)

app.post('/estoque', estoqueController.cadastrar)
app.get('/estoques', estoqueController.listar)

app.post('/pedido', pedidoController.cadastrar)
app.get('/pedidos', pedidoController.listar)

// Servidor
conn.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`)
        })
    })
    .catch((err) => {
        console.error('Erro de conexão com o banco de dados:', err.message || err)
    })