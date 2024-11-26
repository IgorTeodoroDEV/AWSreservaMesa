// src/components/FinalizarComanda.js
import React, { useState } from 'react';
import api from '../api';

const ConsultaReserva = () => {

    const [message, setMessage] = useState('');

    const handleConsultaReserva = async () => {
        try {
            const response = await api.post('/ConsultaReserva', {
                action: 'consultarReserva'
            });
            setMessage(response.data.body);
        } catch (error) {
            setMessage('Erro ao consultar mesas.');
        }
    };

    return (
        <div>
            <h2>Consultar mesas</h2>
            <button onClick={handleConsultaReserva}>Consultar reservas</button>
            <p>{message}</p>
        </div>
    );
};

export default ConsultaReserva;
