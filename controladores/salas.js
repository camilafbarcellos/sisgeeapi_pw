const { pool } = require('../config');

// método para retornar todas as salas: em caso de erro (400)
// retorna um json com o erro e a mensagem, caso sucesso (200)
// retorna as linhas da query
const getSalas = (request, response) => {
    pool.query('SELECT * FROM salas ORDER BY codigo',
        (error, results) => {
            if (error) {
                return response.status(400).json({
                    status: 'error',
                    message: 'Erro ao consultar a sala: ' + error
                })
            }
            response.status(200).json(results.rows);
        }
    )
}

// método para adicionar novas salas na tabela que retorna
// um array que irá conter os valores dos parâmetros
const addSalas = (request, response) => {
    const { numero, descricao, capacidade, predio } = request.body;
    pool.query(`INSERT INTO salas (numero, descricao, capacidade, predio) 
    VALUES ($1, $2, $3, $4) RETURNING numero, descricao, capacidade, predio`,
        [numero, descricao, capacidade, predio],
        (error, results) => {
            if (error) {
                return response.status(400).json({
                    status: 'eror',
                    message: 'Erro ao inserir a sala: ' + error
                })
            }
            response.status(200).json({
                status: "success", message: "Sala criada",
                objeto: results.rows[0]
            })
        })
}

// método para alterar salas na tabela com base em codigo que
// retorna um array que irá conter os valores dos parâmetros
const updateSalas = (request, response) => {
    const { numero, descricao, capacidade, predio, codigo } = request.body;
    pool.query(`UPDATE salas SET numero=$1, descricao=$2, capacidade=$3, predio=$4  
    WHERE codigo=$5 RETURNING codigo, numero, descricao, capacidade, predio`,
        [numero, descricao, capacidade, predio, codigo],
        (error, results) => {
            if (error) {
                return response.status(400).json({
                    status: 'eror',
                    message: 'Erro ao alterar a sala: ' + error
                })
            }
            response.status(200).json({
                status: "success", message: "Sala alterada",
                objeto: results.rows[0]
            })
        })
}

// método para deletar salas na tabela com base em codigo que
// verifica se existe linha retornada na consulta e deleta
const deleteSala = (request, response) => {
    const codigo = parseInt(request.params.codigo);
    pool.query(`DELETE FROM salas WHERE codigo=$1`, [codigo],
        (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(400).json({
                    status: 'eror',
                    message: 'Erro ao remover a sala: ' +
                        (error ? error : 'Nenhuma linha removida')
                })
            }
            response.status(200).json({
                status: "success", message: "Sala removida"
            })
        })
}

// método para encontrar um predio na tabela com base em codigo que
// verifica se existe linha retornada na consulta e retorna em json
const getSalaPorCodigo = (request, response) => {
    const codigo = parseInt(request.params.codigo);
    pool.query(`SELECT * FROM salas WHERE codigo=$1`, [codigo],
        (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(400).json({
                    status: 'eror',
                    message: 'Erro ao recuperar a sala: ' +
                        (error ? error : 'Nenhuma linha encontrada')
                })
            }
            response.status(200).json(results.rows[0]);
        })
}

module.exports = { getSalas, addSalas, updateSalas, deleteSala, getSalaPorCodigo }