const ItemPedido = require('../models/ItemPedidos')
const Pedido = require('../models/Pedidos')
const Produto = require('../models/Produto')

const cadastrar = async (req, res) => {
    const valores = req.body

    if (!valores.Idpedido || !valores.Idproduto || !valores.quantidade || !valores.precoUnitario) {
        return res.status(400).json({ message: 'Campos Obrigatórios' })
    }

    try {
        const pedido = await Pedido.findByPk(valores.Idpedido)
        if (!pedido) {
            return res.status(404).json({ message: 'Pedido não encontrado' })
        }

        const produto = await Produto.findByPk(valores.Idproduto)
        if (!produto) {
            return res.status(404).json({ message: 'Produto não encontrado' })
        }

        let dados = await ItemPedido.create(valores)
        res.status(201).json({ message: 'Item do pedido cadastrado com sucesso!', dados })
    } catch (err) {
        console.log('Erro ao cadastrar item do pedido!', err)
        res.status(500).json({ message: 'Erro ao cadastrar item do pedido!' })
    }
}

const listar = async (req, res) => {
    try {
        let dados = await ItemPedido.findAll()
        res.status(200).json(dados)
    } catch (err) {
        console.log('Erro ao listar itens do pedido!', err)
        res.status(500).json({ message: 'Erro ao listar itens do pedido!' })
    }
}

const consultar = async (req, res) => {
    const id = req.params.id

    try {
        let dados = await ItemPedido.findByPk(id)
        if (!dados) {
            return res.status(404).json({ message: 'Item do pedido não encontrado!' })
        } else {
            res.status(200).json(dados)
        }
    } catch (err) {
        console.log('Erro ao consultar item do pedido!', err)
        res.status(500).json({ message: 'Erro ao consultar item do pedido!' })
    }
}

const atualizar = async (req, res) => {
    const id = req.params.id
    const valores = req.body

    if (!valores.quantidade || !valores.precoUnitario) {
        return res.status(400).json({ message: 'Campos Obrigatórios' })
    }

    try {
        let dados = await ItemPedido.findByPk(id)

        if (!dados) {
            return res.status(404).json({ message: 'Item do pedido não encontrado' })
        } else {
            await ItemPedido.update(valores, { where: { codItemPedido: id } })
            dados = await ItemPedido.findByPk(id)
            res.status(200).json({ message: 'Item do pedido atualizado com sucesso!', dados })
        }
    } catch (err) {
        console.log('Erro ao atualizar item do pedido!', err)
        res.status(500).json({ message: 'Erro ao atualizar item do pedido!' })
    }
}

const apagar = async (req, res) => {
    const id = req.params.id

    try {
        const dados = await ItemPedido.findByPk(id)

        if (!dados) {
            return res.status(404).json({ message: 'Item do pedido não encontrado' })
        } else {
            await ItemPedido.destroy({ where: { codItemPedido: id } })
            res.status(200).json({ message: 'Item do pedido excluído com sucesso!' })
        }
    } catch (err) {
        console.log('Erro ao excluir item do pedido!', err)
        res.status(500).json({ message: 'Erro ao excluir item do pedido!' })
    }
}

module.exports = { cadastrar, listar, consultar, atualizar, apagar }