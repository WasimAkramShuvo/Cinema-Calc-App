import { useState, useEffect } from 'react';
import { Container, Button, Icon, Table } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { ExpenseDto } from '../../models/expenseDto';
import apiConnector from '../../api/apiConnector';
import ExpenseTableItem from './ExpenseTableItem';

export default function ExpenseTable() {

    const [expenses, setExpenses] = useState<ExpenseDto[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const fetchedExpenses = await apiConnector.getExpenses();
            setExpenses(fetchedExpenses);
        }

        fetchData();
    }, []);

    const calculateSum = () => {
        return expenses.reduce((sum, expense) => sum + expense.totalPrice, 0).toFixed(2);
    };

    return (
        <>
            <Container className="container-style">
                <Button className="margin" as={NavLink} to="createExpense" floated="right" positive>
                    <Icon name="plus" /> Create Expense
                </Button>
                <table className="ui inverted table">
                    <thead style={{ textAlign: 'center' }}>
                        <tr>
                            <th>Name</th>
                            <th>Price (€)</th>
                            <th>Markup (%)</th>
                            <th>TotalPrice (€)</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses?.length !== 0 ? (
                            expenses?.map((expense, index) => (
                                <ExpenseTableItem key={index} expense={expense} />
                            ))
                        ) : (
                               <Table.Row>
                                <Table.Cell colSpan="5" textAlign="center">
                                    No expenses found.
                                </Table.Cell>
                            </Table.Row>
                        )}
                    </tbody>
                    
                    <tfoot>
                        <tr>
                            <td colSpan={3}></td>
                            <td>
                                <strong className="total-sum">
                                    Sum of all expense total prices: <span>{calculateSum()} €</span>
                                </strong>
                            </td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
                <div>
                    <strong className="total-sum">
                        Total: <span>{expenses.length}</span>
                    </strong>

                </div>
            </Container>
        </>
    );
}
