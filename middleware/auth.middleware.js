const jwt = require('jsonwebtoken')
const CHAVE_SEGREDO =  'CHAVE_BAIXA'

function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization']

    if (!authHeader) {
        return res.status(401).json({ message: 'Acesso negado! Token não fornecido' })
    }

    const token = authHeader.startsWith('Bearer ')
        ? authHeader.slice(7).trim()
        : authHeader.trim()

    try {
        const payload = jwt.verify(token, CHAVE_SEGREDO)
        req.usuario = payload
        next()
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Sessão expirada! Faça login novamente' })
        }
        return res.status(401).json({ message: 'Token inválido' })
    }
}

module.exports = authMiddleware