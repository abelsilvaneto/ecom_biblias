const conn = require('./db/conn')
const { Categoria, Entrega, Estoque, ItemPedido, Pedido, Produto, Usuario } = require('./models/rel')

async function dataBaseSync(){
    try {
        await conn.sync({force: true})
        console.log('sincronizadas as tabelas!')
    } catch (err) {
        console.error('Erro de sincronização!', err)
    }finally{
        await conn.close()
        console.log('fechando o banco de dados')
    }
}

dataBaseSync()