const Usuario = require('../models/Usuario')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const CHAVE_SEGREDO = process.env.JWT_SECRET || 'CHAVE_BAIXA'

const login = async (req, res) => {
    const valores = req.body

    if (!valores.email || !valores.senha) {
        return res.status(400).json({ message: 'Coloque todos os valores' })
    }

    try {
        const usuario = await Usuario.findOne({ where: { email: valores.email } })

        if (!usuario) {
            return res.status(401).json({ message: 'Cliente não achado' })
        }

        const senhaValida = await bcrypt.compare(valores.senha, usuario.senha)

        if (!senhaValida) {
            return res.status(401).json({ message: 'Senha incorreta' })
        }

        const payload = {
            idUsuario: usuario.codUsuario,
            nome: usuario.nome,
            tipo: usuario.tipo
        }

        // 5400 segundos = 1 hora e 30 minutos
        const token = jwt.sign(payload, CHAVE_SEGREDO, { expiresIn: 5400 })

        return res.status(200).json({
            message: 'Login realizado com sucesso!',
            token: token,
            nome: usuario.nome
        })
    } catch (err) {
        console.error('Erro ao tentar fazer o login:', err)
        return res.status(500).json({ message: 'Erro ao tentar fazer o login!' })
    }
}

module.exports = { login }