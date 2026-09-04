const Categoria = require('./Categoria')
const Entrega = require('./Entrega')
const Estoque = require('./Estoque')
const ItemPedido = require('./ItemPedidos')
const Pedido = require('./Pedidos')
const Produto = require('./Produto')
const Usuario = require('./Usuario')

// 1. Categoria <-> Produto (1:N)
Categoria.hasMany(Produto, {
    foreignKey: 'idCategoria',
    as: 'produtosCategoria',
    onDelete: 'CASCADE'
})

Produto.belongsTo(Categoria, {
    foreignKey: 'idCategoria',
    as: 'categoriaProduto',
    allowNull: false
})

// 2. Produto <-> Estoque (1:1)
Produto.hasOne(Estoque, {
    foreignKey: 'idProduto',
    as: 'estoqueProduto',
    onDelete: 'CASCADE'
})

Estoque.belongsTo(Produto, {
    foreignKey: 'idProduto',
    as: 'produtoEstoque',
    allowNull: false
})

// 3. Usuario <-> Pedido (1:N)
Usuario.hasMany(Pedido, {
    foreignKey: 'idUsuario',
    as: 'pedidosUsuario',
    onDelete: 'CASCADE'
})

Pedido.belongsTo(Usuario, {
    foreignKey: 'idUsuario',
    as: 'usuarioPedido',
    allowNull: false
})

// 4. Pedido <-> ItemPedido (1:N)
Pedido.hasMany(ItemPedido, {
    foreignKey: 'idPedido',
    as: 'itensPedido',
    onDelete: 'CASCADE'
})

ItemPedido.belongsTo(Pedido, {
    foreignKey: 'idPedido',
    as: 'pedidoItem',
    allowNull: false
})

// 5. Produto <-> ItemPedido (1:N)
Produto.hasMany(ItemPedido, {
    foreignKey: 'idProduto',
    as: 'itensProduto',
    onDelete: 'CASCADE'
})

ItemPedido.belongsTo(Produto, {
    foreignKey: 'idProduto',
    as: 'produtoItem',
    allowNull: false
})

// 6. Pedido <-> Entrega (1:1)
Pedido.hasOne(Entrega, {
    foreignKey: 'idPedido',
    as: 'entregaPedido',
    onDelete: 'CASCADE'
})

Entrega.belongsTo(Pedido, {
    foreignKey: 'idPedido',
    as: 'pedidoEntrega',
    allowNull: false
})

module.exports = { Categoria, Entrega, Estoque, ItemPedido, Pedido, Produto, Usuario }