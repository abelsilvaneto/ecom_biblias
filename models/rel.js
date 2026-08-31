
const Categoria = require('./Categoria');
const Entrega = require('./Entrega');
const Estoque = require('./Estoque');
const ItemPedido = require('./itemPedidos');
const Pedido = require('./Pedidos');
const Produto = require('./Produto');
const Usuario = require('./Usuario');

// 1. Categoria <-> Produto (1:N)
Categoria.hasMany(Produto, { 
  foreignKey: 'IdCategoria', 
  sourceKey: 'codCategoria',
  as: 'produtos' 
});
Produto.belongsTo(Categoria, { 
  foreignKey: 'IdCategoria', 
  targetKey: 'codCategoria',
  as: 'categoria' 
});

// 2. Produto <-> Estoque (1:1)
Produto.hasOne(Estoque, { 
  foreignKey: 'idProduto', 
  sourceKey: 'codProduto',
  as: 'estoque' 
});
Estoque.belongsTo(Produto, { 
  foreignKey: 'idProduto', 
  targetKey: 'codProduto',
  as: 'produto' 
});

// 3. Usuario <-> Pedido (1:N)
Usuario.hasMany(Pedido, { 
  foreignKey: 'IdUsuario', 
  sourceKey: 'codUsuario',
  as: 'pedidos' 
});
Pedido.belongsTo(Usuario, { 
  foreignKey: 'IdUsuario', 
  targetKey: 'codUsuario',
  as: 'usuario' 
});

// 4. Pedido <-> ItemPedido (1:N)
Pedido.hasMany(ItemPedido, { 
  foreignKey: 'Idpedido', 
  sourceKey: 'codPedido',
  as: 'itens' 
});
ItemPedido.belongsTo(Pedido, { 
  foreignKey: 'Idpedido', 
  targetKey: 'codPedido',
  as: 'pedido' 
});

// 5. Produto <-> ItemPedido (1:N)
Produto.hasMany(ItemPedido, { 
  foreignKey: 'Idproduto', 
  sourceKey: 'codProduto',
  as: 'itensPedido' 
});
ItemPedido.belongsTo(Produto, { 
  foreignKey: 'Idproduto', 
  targetKey: 'codProduto',
  as: 'produto' 
});

// 6. Pedido <-> Entrega (1:1)
Pedido.hasOne(Entrega, { 
  foreignKey: 'IdPedido', 
  sourceKey: 'codPedido',
  as: 'entrega' 
});
Entrega.belongsTo(Pedido, { 
  foreignKey: 'IdPedido', 
  targetKey: 'codPedido',
  as: 'pedido' 
});

module.exports = {Categoria, Entrega, Estoque, ItemPedido, Pedido, Produto, Usuario };