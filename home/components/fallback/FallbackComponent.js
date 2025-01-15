import React from 'react';

const Fallback = ({ error }) => {
  const isError = error instanceof Error; // Check if the error is thrown by the dynamic import

  console.log('error', error);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        height: 'auto',
      }}
    >
      <div>
        {isError ? (
          <p style={{ fontSize: '15px', color: 'red' }}>
            Serviço está fora, por favor tente novamente mais tarde.
          </p>
        ) : (
          <p style={{ fontSize: '15px' }}> Carregando ...</p>
        )}
      </div>
    </div>
  );
};

export default Fallback;
