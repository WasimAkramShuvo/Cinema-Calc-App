import { Outlet, useLocation } from 'react-router-dom';
import './App.css';
import { Container } from 'semantic-ui-react';
import ExpenseTable from './components/expenses/ExpenseTable';

function App() {
    const location = useLocation();

    return (
        <>
            <h1 className="app-title">Cinema Calc App</h1>
            {location.pathname === '/' ? <ExpenseTable /> : (
                <Container className="container-style">
                    <Outlet />
                </Container>
            )}
        </>
    );
}

export default App;
