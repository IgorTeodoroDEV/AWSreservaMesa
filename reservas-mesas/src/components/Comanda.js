// src/components/Comanda.js
import React, { useState } from 'react';
import api from '../api';

const Comanda = () => {
    const [comandaID, setComandaID] = useState('');
    const [produto, setProduto] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [message, setMessage] = useState('');

    const handleAdicionarItem = async () => {
        try {
            const response = await api.post('/adicionarItem', {
                action: 'adicionarItem',
                comandaID: comandaID,
                produto: produto,
                quantidade: quantidade,
            });
            setMessage(response.data.body);
        } catch (error) {
            setMessage('Erro ao adicionar item.');
        }
    };

    return (
        <div>
            <h2>Adicionar Item à Comanda</h2>
            <input
                type="text"
                placeholder="ID da Comanda"
                value={comandaID}
                onChange={(e) => setComandaID(e.target.value)}
            />
            <input
                type="text"
                placeholder="Produto"
                value={produto}
                onChange={(e) => setProduto(e.target.value)}
            />
            <input
                type="number"
                placeholder="Quantidade"
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
            />
            <button onClick={handleAdicionarItem}>Adicionar Item</button>
            <p>{message}</p>
        </div>
    );
};

export default Comanda;
