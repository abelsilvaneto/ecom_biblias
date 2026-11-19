const Usuario = require('../models/Usuario')
const bcrypt = require('bcrypt')

const cadastrar = async (req, res) => {
    const valores = req.body

    if (!valores.nome || !valores.email || !valores.senha || !valores.cpf) {
        return res.status(400).json({ message: 'Campos Obrigatórios' })
    }

    try {
        const emailExistente = await Usuario.findOne({ where: { email: valores.email } })
        if (emailExistente) {
            return res.status(400).json({ message: 'E-mail já cadastrado!' })
        }

        const cpfExistente = await Usuario.findOne({ where: { cpf: valores.cpf } })
        if (cpfExistente) {
            return res.status(400).json({ message: 'CPF já cadastrado!' })
        }

        valores.senha = await bcrypt.hash(valores.senha, 10)

        const dados = await Usuario.create(valores)
        const { senha, ...usuarioSemSenha } = dados.toJSON()

        return res.status(201).json({ message: 'Usuário cadastrado com sucesso!', dados: usuarioSemSenha })
    } catch (err) {
        console.log('Erro ao cadastrar usuário!', err)
        return res.status(500).json({ message: 'Erro ao cadastrar usuário!' })
    }
}

const listar = async (req, res) => {
    try {
        const dados = await Usuario.findAll({
            attributes: { exclude: ['senha'] }
        })
        return res.status(200).json(dados)
    } catch (err) {
        console.log('Erro ao listar usuários!', err)
        return res.status(500).json({ message: 'Erro ao listar usuários!' })
    }
}

const consultar = async (req, res) => {
    const id = req.params.id

    try {
        const dados = await Usuario.findByPk(id, {
            attributes: { exclude: ['senha'] }
        })
        if (!dados) {
            return res.status(404).json({ message: 'Usuário não encontrado!' })
        }
        return res.status(200).json(dados)
    } catch (err) {
        console.log('Erro ao consultar usuário!', err)
        return res.status(500).json({ message: 'Erro ao consultar usuário!' })
    }
}

const atualizar = async (req, res) => {
    const id = req.params.id
    const valores = req.body

    if (!valores.nome || !valores.email) {
        return res.status(400).json({ message: 'Campos Obrigatórios' })
    }

    try {
        let dados = await Usuario.findByPk(id)

        if (!dados) {
            return res.status(404).json({ message: 'Usuário não encontrado' })
        }

        if (valores.senha) {
            valores.senha = await bcrypt.hash(valores.senha, 10)
        }

        await Usuario.update(valores, { where: { codUsuario: id } })
        dados = await Usuario.findByPk(id, {
            attributes: { exclude: ['senha'] }
        })
        return res.status(200).json({ message: 'Usuário atualizado com sucesso!', dados })
    } catch (err) {
        console.log('Erro ao atualizar usuário!', err)
        return res.status(500).json({ message: 'Erro ao atualizar usuário!' })
    }
}

const apagar = async (req, res) => {
    const id = req.params.id

    try {
        const dados = await Usuario.findByPk(id)

        if (!dados) {
            return res.status(404).json({ message: 'Usuário não encontrado' })
        }

        await Usuario.destroy({ where: { codUsuario: id } })
        return res.status(200).json({ message: 'Usuário excluído com sucesso!' })
    } catch (err) {
        console.log('Erro ao excluir usuário!', err)
        return res.status(500).json({ message: 'Erro ao excluir usuário!' })
    }
}

module.exports = { cadastrar, listar, consultar, atualizar, apagar }