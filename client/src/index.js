import React from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from "./Home/Home";
import Team from './Teams/Team';
import User from './Users/User';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider
} from "@apollo/client";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import NavBar from "./NavBar/NavBar";

const client = new ApolloClient({
    uri: 'http://localhost:4000',
    cache: new InMemoryCache()
});


function App() {    
    const [dateRange, setDateRange] = useState([new Date("Tue Feb 22 2022"), new Date("Thu Mar 17 2022")])   

    return (
        <React.StrictMode>
            <ApolloProvider client={client}>
                <BrowserRouter>
                    <NavBar startRange={dateRange} setRange={setDateRange}/>
                    <Routes>
                        <Route index element={<Home dateRange={dateRange}/>} />
                        <Route path='/teams' element={<Home dateRange={dateRange}/>}/>
                        <Route path='/teams/:teamId' element={<Team dateRange={dateRange}/>}/>
                        <Route path='/teams/:teamId/users/' element={<Team dateRange={dateRange}/>}/>
                        <Route path='teams/:teamId/users/:userId' element={<User dateRange={dateRange}/>}/>\
                    </Routes>
                </BrowserRouter>
            </ApolloProvider>
        </React.StrictMode>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
