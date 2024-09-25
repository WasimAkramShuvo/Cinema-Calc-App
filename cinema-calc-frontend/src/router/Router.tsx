import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../App";
import ExpenseForm from "../components/expenses/ExpenseForm";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App/>,
        children: [
            {path: 'createExpense', element: <ExpenseForm key='create' />},
            {path: 'editExpense/:id', element: <ExpenseForm key='edit' />}
        ]
    }
]

export const router = createBrowserRouter(routes)