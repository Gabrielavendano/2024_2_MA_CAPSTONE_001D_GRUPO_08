import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/SimulateWebpay.css";

const SimulateWebpay = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location; // Recibe los datos de navegación
    const { reservation, token, returnUrl } = state || {}; // Extrae los datos relevantes

    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const [paymentDetails, setPaymentDetails] = useState({
        cardNumber: "",
        cardHolder: "",
        expiryDate: "",
        securityCode: "",
    });
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [successMessage, setSuccessMessage] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        let formattedValue = value;

        if (name === "cardNumber") {
            // Permitir solo números y formatear en bloques de 4
            formattedValue = value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim();
        }

        if (name === "expiryDate") {
            // Permitir solo números y agregar "/" automáticamente después de MM
            formattedValue = value.replace(/\D/g, "").slice(0, 4);
            if (formattedValue.length > 2) {
                formattedValue = `${formattedValue.slice(0, 2)}/${formattedValue.slice(2)}`;
            }
        }

        if (name === "securityCode") {
            // Permitir solo números y limitar a 3 dígitos
            formattedValue = value.replace(/\D/g, "").slice(0, 3);
        }

        setPaymentDetails({ ...paymentDetails, [name]: formattedValue });
    };

    const handlePayment = async () => {
        if (
            !paymentDetails.cardNumber ||
            !paymentDetails.cardHolder ||
            !paymentDetails.expiryDate ||
            !paymentDetails.securityCode
        ) {
            setPaymentStatus({ error: "Por favor, completa todos los campos." });
            return;
        }

        setLoading(true);
        try {
            setTimeout(() => {
                setSuccessMessage(true);

                setTimeout(() => {
                    navigate("/"); // Redirige al inicio o donde prefieras
                }, 3000); // Espera 3 segundos antes de redirigir
            }, 2000);
        } catch (error) {
            console.error("Error al confirmar el pago:", error);
            setPaymentStatus({ error: "Hubo un error al confirmar el pago. Inténtalo nuevamente." });
        } finally {
            setLoading(false);
        }
    };

    const openPaymentForm = () => {
        setShowPaymentForm(true);
    };

    const closePaymentForm = () => {
        setShowPaymentForm(false);
    };

    return (
        <div className="simulate-webpay-container">
            {!successMessage && (
                <>
                    <div className="simulate-webpay-card">
                        <h1 className="simulate-webpay-title">Sistema de Pago Webpay</h1>
                        <p className="simulate-webpay-info">
                            Por favor, revisa los detalles de la transacción antes de proceder con el pago.
                        </p>
                        {reservation && (
                            <div className="reservation-card">
                                <h2 className="reservation-card-title">Detalles de la Reserva</h2>
                                <p><strong>ID:</strong> {reservation.id}</p>
                                <p><strong>Email:</strong> {reservation.email}</p>
                                <p><strong>Nombre Mascota:</strong> {reservation.pet_name}</p>
                                <p><strong>Tamaño Mascota:</strong> {reservation.pet_size}</p>
                                <p><strong>Raza Mascota:</strong> {reservation.pet_breed}</p>
                                <p><strong>Fecha Inicio:</strong> {reservation.init_date}</p>
                                <p><strong>Fecha Fin:</strong> {reservation.end_date}</p>
                                <p><strong>Total a Pagar:</strong> ${reservation.total.toLocaleString("de-DE")}</p>
                                <p><strong>Token de Transacción:</strong> {token}</p>
                            </div>
                        )}
                        <button
                            className="simulate-webpay-button"
                            onClick={openPaymentForm}
                        >
                            Iniciar Pago
                        </button>
                    </div>

                    {showPaymentForm && (
                        <div className="simulate-webpay-modal">
                            <div className="simulate-webpay-modal-content">
                                <h2>Detalles de Pago</h2>
                                <form>
                                    <label>Número de Tarjeta</label>
                                    <input
                                        type="text"
                                        name="cardNumber"
                                        value={paymentDetails.cardNumber}
                                        onChange={handleInputChange}
                                        placeholder="1234 5678 9012 3456"
                                        maxLength={19} // 16 números + 3 espacios
                                        required
                                    />
                                    <label>Nombre del Titular</label>
                                    <input
                                        type="text"
                                        name="cardHolder"
                                        value={paymentDetails.cardHolder}
                                        onChange={handleInputChange}
                                        placeholder="Juan Pérez"
                                        required
                                    />
                                    <label>Fecha de Vencimiento</label>
                                    <input
                                        type="text"
                                        name="expiryDate"
                                        value={paymentDetails.expiryDate}
                                        onChange={handleInputChange}
                                        placeholder="MM/AA"
                                        maxLength={5} // MM/AA
                                        required
                                    />
                                    <label>Código de Seguridad</label>
                                    <input
                                        type="password"
                                        name="securityCode"
                                        value={paymentDetails.securityCode}
                                        onChange={handleInputChange}
                                        placeholder="123"
                                        maxLength={3}
                                        required
                                    />
                                </form>
                                {paymentStatus?.error && (
                                    <p className="payment-error">{paymentStatus.error}</p>
                                )}
                                <div className="simulate-webpay-modal-buttons">
                                    <button
                                        className="simulate-webpay-button"
                                        onClick={handlePayment}
                                        disabled={loading}
                                    >
                                        {loading ? "Procesando..." : "Pagar"}
                                    </button>
                                    <button
                                        className="simulate-webpay-cancel-button"
                                        onClick={closePaymentForm}
                                        disabled={loading}
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}

            {successMessage && (
                <div className="simulate-webpay-success">
                    <h2>¡Reserva pagada con éxito!</h2>
                    <p>Gracias por completar tu pago. Tu reserva ha sido confirmada.</p>
                    <button
                        className="simulate-webpay-button"
                        onClick={() => navigate("/")}
                    >
                        Volver al Inicio
                    </button>
                </div>
            )}
        </div>
    );
};

export default SimulateWebpay;
