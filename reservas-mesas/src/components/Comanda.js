// src/components/ConsultarComanda.js
import React, { useState } from 'react';
import api from '../api'; // Certifique-se de que o api está configurado corretamente

const ConsultarComanda = () => {
    const [comandaID, setComandaID] = useState('');
    const [itens, setItens] = useState([]);
    const [message, setMessage] = useState('');

    const handleConsultarItens = async () => {
        try {
            const response = await api.post('/consultarComanda', {
                action: 'consultarComanda',
                comandaID: comandaID,
            });

            // Verificando se a resposta contém itens
            if (response.data.body && response.data.body.itens) {
                setItens(response.data.body.itens);
                setMessage('Itens carregados com sucesso.');
            } else {
                setItens([]);
                setMessage('Nenhum item encontrado para esta comanda.');
            }
        } catch (error) {
            setMessage('Erro ao consultar itens da comanda.');
        }
    };

    return (
        <div>
            <h2>Consultar Itens da Comanda</h2>
            <input
                type="text"
                placeholder="ID da Comanda"
                value={comandaID}
                onChange={(e) => setComandaID(e.target.value)}
            />
            <button onClick={handleConsultarItens}>Consultar Itens</button>
            <p>{message}</p>
            {itens.length > 0 && (
                <ul>
                    {itens.map((item, index) => (
                        <li key={index}>
                            {item.produto} - Quantidade: {item.quantidade}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ConsultarComanda;