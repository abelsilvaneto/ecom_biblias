const Estoque = require('../models/Estoque')
const Produto = require('../models/Produto')

const cadastrar = async (req, res) => {
    const valores = req.body

    if (!valores.idProduto || valores.quantidadeDisponivel === undefined) {
        return res.status(400).json({ message: 'Campos Obrigatórios' })
    }

    try {
        const produto = await Produto.findByPk(valores.idProduto)
        if (!produto) {
            return res.status(404).json({ message: 'Produto não encontrado' })
        }

        let dados = await Estoque.create(valores)
        res.status(201).json({ message: 'Estoque cadastrado com sucesso!', dados })
    } catch (err) {
        console.log('Erro ao cadastrar estoque!', err)
        res.status(500).json({ message: 'Erro ao cadastrar estoque!' })
    }
}

const listar = async (req, res) => {
    try {
        let dados = await Estoque.findAll()
        res.status(200).json(dados)
    } catch (err) {
        console.log('Erro ao listar estoque!', err)
        res.status(500).json({ message: 'Erro ao listar estoque!' })
    }
}

const consultar = async (req, res) => {
    const id = req.params.id

    try {
        let dados = await Estoque.findByPk(id)
        if (!dados) {
            return res.status(404).json({ message: 'Estoque não encontrado!' })
        } else {
            res.status(200).json(dados)
        }
    } catch (err) {
        console.log('Erro ao consultar estoque!', err)
        res.status(500).json({ message: 'Erro ao consultar estoque!' })
    }
}

const atualizar = async (req, res) => {
    const id = req.params.id
    const valores = req.body

    if (valores.quantidadeDisponivel === undefined) {
        return res.status(400).json({ message: 'Campos Obrigatórios' })
    }

    try {
        let dados = await Estoque.findByPk(id)

        if (!dados) {
            return res.status(404).json({ message: 'Estoque não encontrado' })
        } else {
            await Estoque.update(valores, { where: { codEstoque: id } })
            dados = await Estoque.findByPk(id)
            res.status(200).json({ message: 'Estoque atualizado com sucesso!', dados })
        }
    } catch (err) {
        console.log('Erro ao atualizar estoque!', err)
        res.status(500).json({ message: 'Erro ao atualizar estoque!' })
    }
}

const apagar = async (req, res) => {
    const id = req.params.id

    try {
        const dados = await Estoque.findByPk(id)

        if (!dados) {
            return res.status(404).json({ message: 'Estoque não encontrado' })
        } else {
            await Estoque.destroy({ where: { codEstoque: id } })
            res.status(200).json({ message: 'Estoque excluído com sucesso!' })
        }
    } catch (err) {
        console.log('Erro ao excluir estoque!', err)
        res.status(500).json({ message: 'Erro ao excluir estoque!' })
    }
}

module.exports = { cadastrar, listar, consultar, atualizar, apagar }