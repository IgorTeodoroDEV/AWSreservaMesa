// src/components/Comanda.js
import React, { useState } from 'react';
import api from '../api';

const LiberarMesa = () => {
    const [mesaID, setMesaID] = useState('');
    const [message, setMessage] = useState('');

    const handLiberarMesas = async () => {
        try {
            const response = await api.post('/liberarMesa', {
                action: 'liberarMesa',
                mesaID: mesaID
            });
            setMessage(response.data.body);
        } catch (error) {
            setMessage('Erro ao consultar comanda.');
        }
    };

    return (
        <div>
            <h2>liberar mesa reservada</h2>
            <input
                type="text"
                placeholder="Numero da Mesa"
                value={mesaID}
                onChange={(e) => setMesaID(e.target.value)}
            />
            <button onClick={handLiberarMesas}>LiberarMesa</button>
            <p>{message}</p>
        </div>
    );
};

export default LiberarMesa;
