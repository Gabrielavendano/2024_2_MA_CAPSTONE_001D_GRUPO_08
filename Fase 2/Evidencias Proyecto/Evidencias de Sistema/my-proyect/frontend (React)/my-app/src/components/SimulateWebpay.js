import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/SimulateWebpay.css";

const SimulateWebpay = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
    const returnUrl = queryParams.get("return_url");

    const handlePayment = () => {
        // Redirige al URL de retorno simulando un pago exitoso
        navigate(returnUrl);
    };

    return (
        <div className="simulate-webpay-container">
            <h1>Simulación de Webpay</h1>
            <p>Estás simulando un pago con Webpay.</p>
            <p>Token de la transacción: {token}</p>
            <button className="pay-button" onClick={handlePayment}>
                Completar Pago
            </button>
        </div>
    );
};

export default SimulateWebpay;
