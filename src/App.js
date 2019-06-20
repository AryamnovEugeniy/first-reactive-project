import React from 'react';
import {Link} from 'react-router-dom';
import './App.css';

function App() {
    return (
        <React.Fragment>
            <h1 align="center">Hello!!</h1>
            <Link to={`/main`}>
                <button >Далее</button>
            </Link>
        </React.Fragment>
        
    );
}

export default App;
