const Entrega = require('../models/Entrega')
const Pedido = require('../models/Pedidos')

const cadastrar = async (req, res) => {
    const valores = req.body

    if (!valores.IdPedido || !valores.cep || !valores.rua || !valores.numero || !valores.bairro || !valores.cidade || !valores.estado) {
        return res.status(400).json({ message: 'Campos Obrigatórios' })
    }

    try {
        const pedido = await Pedido.findByPk(valores.IdPedido)
        if (!pedido) {
            return res.status(404).json({ message: 'Pedido não encontrado' })
        }

        let dados = await Entrega.create(valores)
        res.status(201).json({ message: 'Entrega cadastrada com sucesso!', dados })
    } catch (err) {
        console.log('Erro ao cadastrar entrega!', err)
        res.status(500).json({ message: 'Erro ao cadastrar entrega!' })
    }
}

const listar = async (req, res) => {
    try {
        let dados = await Entrega.findAll()
        res.status(200).json(dados)
    } catch (err) {
        console.log('Erro ao listar entregas!', err)
        res.status(500).json({ message: 'Erro ao listar entregas!' })
    }
}

const consultar = async (req, res) => {
    const id = req.params.id

    try {
        let dados = await Entrega.findByPk(id)
        if (!dados) {
            return res.status(404).json({ message: 'Entrega não encontrada!' })
        } else {
            res.status(200).json(dados)
        }
    } catch (err) {
        console.log('Erro ao consultar entrega!', err)
        res.status(500).json({ message: 'Erro ao consultar entrega!' })
    }
}

const atualizar = async (req, res) => {
    const id = req.params.id
    const valores = req.body

    if (!valores.cep || !valores.rua || !valores.numero || !valores.bairro || !valores.cidade || !valores.estado) {
        return res.status(400).json({ message: 'Campos Obrigatórios' })
    }

    try {
        let dados = await Entrega.findByPk(id)

        if (!dados) {
            return res.status(404).json({ message: 'Entrega não encontrada' })
        } else {
            await Entrega.update(valores, { where: { codEntrega: id } })
            dados = await Entrega.findByPk(id)
            res.status(200).json({ message: 'Entrega atualizada com sucesso!', dados })
        }
    } catch (err) {
        console.log('Erro ao atualizar entrega!', err)
        res.status(500).json({ message: 'Erro ao atualizar entrega!' })
    }
}

const apagar = async (req, res) => {
    const id = req.params.id

    try {
        const dados = await Entrega.findByPk(id)

        if (!dados) {
            return res.status(404).json({ message: 'Entrega não encontrada' })
        } else {
            await Entrega.destroy({ where: { codEntrega: id } })
            res.status(200).json({ message: 'Entrega excluída com sucesso!' })
        }
    } catch (err) {
        console.log('Erro ao excluir entrega!', err)
        res.status(500).json({ message: 'Erro ao excluir entrega!' })
    }
}

module.exports = { cadastrar, listar, consultar, atualizar, apagar }