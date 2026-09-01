const Pedido = require('../models/Pedidos')
const Usuario = require('../models/Usuario')

const cadastrar = async (req, res) => {
    const valores = req.body

    if (!valores.IdUsuario || !valores.valorTotal) {
        return res.status(400).json({ message: 'Campos Obrigatórios' })
    }

    try {
        const usuario = await Usuario.findByPk(valores.IdUsuario)
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado' })
        }

        let dados = await Pedido.create(valores)
        res.status(201).json({ message: 'Pedido cadastrado com sucesso!', dados })
    } catch (err) {
        console.log('Erro ao cadastrar pedido!', err)
        res.status(500).json({ message: 'Erro ao cadastrar pedido!' })
    }
}

const listar = async (req, res) => {
    try {
        let dados = await Pedido.findAll()
        res.status(200).json(dados)
    } catch (err) {
        console.log('Erro ao listar pedidos!', err)
        res.status(500).json({ message: 'Erro ao listar pedidos!' })
    }
}

const consultar = async (req, res) => {
    const id = req.params.id

    try {
        let dados = await Pedido.findByPk(id)
        if (!dados) {
            return res.status(404).json({ message: 'Pedido não encontrado!' })
        } else {
            res.status(200).json(dados)
        }
    } catch (err) {
        console.log('Erro ao consultar pedido!', err)
        res.status(500).json({ message: 'Erro ao consultar pedido!' })
    }
}

const atualizar = async (req, res) => {
    const id = req.params.id
    const valores = req.body

    if (!valores.valorTotal || !valores.status) {
        return res.status(400).json({ message: 'Campos Obrigatórios' })
    }

    try {
        let dados = await Pedido.findByPk(id)

        if (!dados) {
            return res.status(404).json({ message: 'Pedido não encontrado' })
        } else {
            await Pedido.update(valores, { where: { codPedido: id } })
            dados = await Pedido.findByPk(id)
            res.status(200).json({ message: 'Pedido atualizado com sucesso!', dados })
        }
    } catch (err) {
        console.log('Erro ao atualizar pedido!', err)
        res.status(500).json({ message: 'Erro ao atualizar pedido!' })
    }
}

const apagar = async (req, res) => {
    const id = req.params.id

    try {
        const dados = await Pedido.findByPk(id)

        if (!dados) {
            return res.status(404).json({ message: 'Pedido não encontrado' })
        } else {
            await Pedido.destroy({ where: { codPedido: id } })
            res.status(200).json({ message: 'Pedido excluído com sucesso!' })
        }
    } catch (err) {
        console.log('Erro ao excluir pedido!', err)
        res.status(500).json({ message: 'Erro ao excluir pedido!' })
    }
}

module.exports = { cadastrar, listar, consultar, atualizar, apagar }