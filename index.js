const express = require('express')
const app = express()
const cors = require('cors')

const PORT = 3000
const hostname = 'localhost'

const conn = require('./db/conn')
require('./models/rel') // Importa os relacionamentos entre os models

// ---------- Importação dos Controllers -------------
const usuarioController = require('./controllers/UsuarioController')
const categoriaController = require('./controllers/CategoriaController')
const produtoController = require('./controllers/ProdutoController')
const estoqueController = require('./controllers/EstoqueController')
const pedidoController = require('./controllers/PedidoController')
const itemPedidoController = require('./controllers/ItemPedidoController')
const entregaController = require('./controllers/EntregaController')
const authController = require('./controller/auth.controller')
const authMiddleware = require('./middleware/authMiddleware')

// ---------- Middlewares Global -------------
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

// ---------- Rotas Públicas -------------
app.get('/', (req, res) => {
    res.status(200).json({ message: 'API do E-commerce rodando com sucesso!' })
})

app.use(authMiddleware)

// Usuário & Autenticação
app.post('/usuario', usuarioController.cadastrar)
app.post('/login', authController.login)

// Produtos e Categorias (Leitura pública para o e-commerce)
app.get('/categorias', categoriaController.listar)
app.get('/categoria/:id', categoriaController.consultar)
app.get('/produtos', produtoController.listar)
app.get('/produto/:id', produtoController.consultar)

// ---------- Rotas Gerenciadas (CRUD Completo) -------------

// --- Usuários
app.get('/usuarios', usuarioController.listar)
app.get('/usuario/:id', usuarioController.consultar)
app.put('/usuario/:id', usuarioController.atualizar)
app.delete('/usuario/:id', usuarioController.apagar)

// --- Categorias
app.post('/categoria', categoriaController.cadastrar)
app.put('/categoria/:id', categoriaController.atualizar)
app.delete('/categoria/:id', categoriaController.apagar)

// --- Produtos
app.post('/produto', produtoController.cadastrar)
app.put('/produto/:id', produtoController.atualizar)
app.delete('/produto/:id', produtoController.apagar)

// --- Estoque
app.post('/estoque', estoqueController.cadastrar)
app.get('/estoques', estoqueController.listar)
app.get('/estoque/:id', estoqueController.consultar)
app.put('/estoque/:id', estoqueController.atualizar)
app.delete('/estoque/:id', estoqueController.apagar)

// --- Pedidos
app.post('/pedido', pedidoController.cadastrar)
app.get('/pedidos', pedidoController.listar)
app.get('/pedido/:id', pedidoController.consultar)
app.put('/pedido/:id', pedidoController.atualizar)
app.delete('/pedido/:id', pedidoController.apagar)

// --- Itens do Pedido
app.post('/item-pedido', itemPedidoController.cadastrar)
app.get('/itens-pedido', itemPedidoController.listar)
app.get('/item-pedido/:id', itemPedidoController.consultar)
app.put('/item-pedido/:id', itemPedidoController.atualizar)
app.delete('/item-pedido/:id', itemPedidoController.apagar)

// --- Entregas
app.post('/entrega', entregaController.cadastrar)
app.get('/entregas', entregaController.listar)
app.get('/entrega/:id', entregaController.consultar)
app.put('/entrega/:id', entregaController.atualizar)
app.delete('/entrega/:id', entregaController.apagar)

// ---------- Inicialização do Servidor -------------
conn.sync()
    .then(() => {
        app.listen(PORT, hostname, () => {
            console.log(`Servidor rodando em http://${hostname}:${PORT}`)
        })
    })
    .catch((err) => {
        console.error('Erro de conexão com o banco de dados!', err.message || err)
    })