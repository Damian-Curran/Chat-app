import React from 'react';
import {Route} from 'react-router';
import Home from './components/Home';

const App = () => (
    <div>
        <main>
            <Route path="/" component={Home} />
        </main>
    </div>
)

export default App;