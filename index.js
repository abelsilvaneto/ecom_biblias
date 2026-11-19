const express = require('express')
const app = express()
const cors = require('cors')

const PORT =  3000
const HOST = 'localhost'

const conn = require('./db/conn')
require('./models/rel')

// Controllers
const usuarioController = require('./controller/Usuario.controller')
const categoriaController = require('./controller/Categoria.controller')
const produtoController = require('./controller/Produto.controller')
const estoqueController = require('./controller/estoque.controller')
const pedidoController = require('./controller/Pedido.controller')
const itemPedidoController = require('./controller/ItemPedido.controller')
const entregaController = require('./controller/Entrega.controller')
const authController = require('./controller/auth.controller')
const authMiddleware = require('./middleware/auth.middleware')

// Middlewares
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())

// Rotas Públicas
app.get('/', (req, res) => {
    res.status(200).json({ message: 'API rodando localmente!' })
})
app.post('/usuario', usuarioController.cadastrar)
app.post('/login', authController.login)
app.get('/categorias', categoriaController.listar)
app.get('/produtos', produtoController.listar)

// Middleware de Autenticação
app.use(authMiddleware)

// Rotas Protegidas - Usuário
app.get('/usuarios', usuarioController.listar)
app.get('/usuario/:id', usuarioController.consultar)
app.put('/usuario/:id', usuarioController.atualizar)
app.delete('/usuario/:id', usuarioController.apagar)

// Rotas Protegidas - Categoria
app.post('/categoria', categoriaController.cadastrar)
app.get('/categoria/:id', categoriaController.consultar)
app.put('/categoria/:id', categoriaController.atualizar)
app.delete('/categoria/:id', categoriaController.apagar)

// Rotas Protegidas - Produto
app.post('/produto', produtoController.cadastrar)
app.get('/produto/:id', produtoController.consultar)
app.put('/produto/:id', produtoController.atualizar)
app.delete('/produto/:id', produtoController.apagar)

// Rotas Protegidas - Estoque
app.post('/estoque', estoqueController.cadastrar)
app.get('/estoques', estoqueController.listar)
app.get('/estoque/:id', estoqueController.consultar)
app.put('/estoque/:id', estoqueController.atualizar)
app.delete('/estoque/:id', estoqueController.apagar)

// Rotas Protegidas - Pedido
app.post('/pedido', pedidoController.cadastrar)
app.get('/pedidos', pedidoController.listar)
app.get('/pedido/:id', pedidoController.consultar)
app.put('/pedido/:id', pedidoController.atualizar)
app.delete('/pedido/:id', pedidoController.apagar)

// Rotas Protegidas - ItemPedido
app.post('/itemPedido', itemPedidoController.cadastrar)
app.get('/itensPedido', itemPedidoController.listar)
app.get('/itemPedido/:id', itemPedidoController.consultar)
app.put('/itemPedido/:id', itemPedidoController.atualizar)
app.delete('/itemPedido/:id', itemPedidoController.apagar)

// Rotas Protegidas - Entrega
app.post('/entrega', entregaController.cadastrar)
app.get('/entregas', entregaController.listar)
app.get('/entrega/:id', entregaController.consultar)
app.put('/entrega/:id', entregaController.atualizar)
app.delete('/entrega/:id', entregaController.apagar)

// Servidor Local
conn.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor rodando localmente em http://${HOST}:${PORT}`)
        })
    })
    .catch((err) => {
        console.error('Erro de conexão com o banco de dados:', err.message || err)
    })