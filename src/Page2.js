import React from 'react';


function Page2({ history }) {
    function voltar() {
        history.push('/solicitar');
    }

    return (
        <>
            <button onClick={voltar}>Voltar</button>
        </>
    )
}

export default Page2;