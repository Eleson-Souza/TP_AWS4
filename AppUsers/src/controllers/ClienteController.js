const Cliente = require('../models/cliente');
const status = require('http-status');

exports.Insert = (req, res) => {
    const { nome, salario, dataNascimento, ativo } = req.body;

    Cliente.create({
        nome,
        salario,
        dataNascimento,
        ativo,
    })
        .then(usuario => {
            if (usuario) {
                res.status(status.OK).json(usuario);
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => res.status(status.BAD_REQUEST).json({mensagem: 'Houve um erro ao inserir o cliente!'}));
};

exports.SelectAll = (req, res) => {
    Cliente.findAll({
        order: [
            ['id', 'asc']
        ]
    })
        .then(cliente => {
            if (cliente) {
                res.status(status.OK).json(cliente);
            }
        })
        .catch(error => res.status(status.BAD_REQUEST).json({mensagem: 'Houve um erro ao listar os clientes!'}));
}
 
exports.SelectDetail = (req, res, next) => {
    const id = req.params.id;
 
    Cliente.findByPk(id)
        .then(cliente => {
            if (cliente) {
                res.status(status.OK).json(cliente);
            } else {
                res.status(status.NOT_FOUND).json({mensagem: "Cliente não encontrado!"});
            }
        })
        .catch(error => res.status(status.BAD_REQUEST).json({mensagem: 'Houve um erro ao listar o cliente!'}));
};

exports.Update = (req, res, next) => {
    const { nome, salario, dataNascimento, ativo } = req.body;
    const { id } = req.params;

    Cliente.findByPk(id)
        .then(cliente => {
            if (cliente) {
                cliente.update({
                    nome,
                    salario,
                    dataNascimento,
                    ativo
                },
                    {
                        where: { id }
                    })
                    .then(() => {
                        res.status(status.OK).json({mensagem: "Cliente atualizado com sucesso!"});
                    })
                    .catch(error => res.json({mensagem: 'Houve um erro ao atualizar cliente!'}));
            } else {
                res.status(status.NOT_FOUND).json({mensagem: "Cliente não encontrado!"});
            }
        })
        .catch(error => res.json({mensagem: 'Houve um erro ao atualizar cliente!'}));
};
 
exports.Delete = (req, res, next) => {
    const id = req.params.id;
 
    Cliente.findByPk(id)
        .then(cliente => {
            if (cliente) {
                cliente.destroy({
                    where: { id }
                })
                    .then(() => {
                        res.status(status.OK).json({mensagem: "Cliente removido com sucesso!"});
                    })
                    .catch(error => res.json({mensagem: 'Houve um erro ao atualizar cliente!'}));
            }
            else {
                res.status(status.NOT_FOUND).json({mensagem: "Cliente não encontrado!"});
            }
        })
        .catch(error => res.json({mensagem: 'Houve um erro ao atualizar cliente!'}));
};

