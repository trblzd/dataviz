import React from "react";

function Ferramenta() {
    return (
        <div style={{ width: '100%', height: '100vh', padding: '20px' }}>
            <h1 style={{ marginBottom: '20px', textAlign: 'center' }}>Interactive Tool</h1>
            
            <iframe 
                src="/ferramenta.html" 
                style={{
                    width: '100%',
                    height: 'calc(100vh - 100px)',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                }}
                title="Ferramenta de Visualização de Dados"
                allowFullScreen
            />
        </div>
    );
}

export default Ferramenta;