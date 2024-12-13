import React, { useState } from 'react';
import '../styles/CardServicio.css';  // Para los estilos

const CardServicio = ({ name, price, info,image }) => {
    
    return (
        <div className='card-service-wrapper'>
            <div className='card-image'>
                <img
                    src={`${process.env.PUBLIC_URL}/images/${image}`}
                    alt= {image}
                    style={{width: "300px", height: "200px"}}
                    className=""
                />
            </div>
            <div className='card-header'>
                {name}
            </div>
            <div className='card-body'>
                <div className='card-price'>
                    $ {price}
                </div>
                <div className='card-info'>
                    {info}
                </div>
                
                
            </div>
            
        </div>
    )
}


export default CardServicio;