import { ChangeEvent, useEffect, useState } from "react";
import apiConnector from "../../api/apiConnector";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import { Button, Form, Grid, Segment } from "semantic-ui-react";
import { CreateExpenseDto } from "../../models/createExpenseDto";

export default function ExpenseForm() {

    const { id } = useParams();
    const navigate = useNavigate();
    const numericId: number | null = id ? Number(id) : null;

    const [expense, setExpense] = useState<CreateExpenseDto>({
        name: '',
        price: null,
        markup: null
    });

    useEffect(() => {
        if (numericId) {
            apiConnector.getExpenseById(numericId).then(expense => setExpense(expense!))
        }
    }, [numericId]);

    function validateForm() {
        if (expense.name.trim() === '' && (expense.price === null || expense.price === 0) && (expense.markup === null || expense.markup === 0)) {
            alert("All fields are required! Please fill out the form completely.");
            return;
        }
        if (expense.name.trim() === '') {
            alert("Name is required!");
            return false;
        }
        if (expense.price === null || expense.price === 0) {
            alert("Price is required!");
            return false;
        }
        if (expense.price <= 0) {
            alert("Price must be a positive number greater than 0!");
            return false;
        }
        if (expense.markup === null) {
            alert("Markup is required!");
            return false;
        }
        if (expense.markup <= 0) {
            alert("Markup must be a positive number greater than 0!");
            return false;
        }
        return true;
    }

    function handleSubmit() {

        if (!validateForm()) {
            return;
        }
        if (!numericId) {
            apiConnector.createExpense(expense).then(() => { alert("Expense created successfully!"); navigate('/') });
        } else {
            apiConnector.editExpense(numericId, expense).then(() => {
                alert("Expense updated successfully!");
                navigate('/');
            });
        }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setExpense({ ...expense, [name]: value });
    }

    return (
        <>
            <Segment clearing style={{ backgroundColor: '#f4f4f4', padding: '20px', borderRadius: '8px' }}>
                <Form onSubmit={handleSubmit} autoComplete='off'>
                    <h1 className="form-title">{numericId ? 'Edit Expense' : 'Add Expense'}</h1>
                    <Form.Input
                        label="Name"
                        placeholder='Name'
                        name='name'
                        value={expense.name}
                        onChange={handleInputChange}
                        style={{ border: '1px solid #ccc' }}
                        required={true}
                    />
                    <Form.Input
                        label="Price (€)"
                        placeholder='Price (€)'
                        type="number"
                        name='price'
                        value={expense.price === null || expense.price === 0 ? '' : expense.price}
                        onChange={handleInputChange}
                        style={{ border: '1px solid #ccc' }}
                        required={true}
                    />
                    <Form.Input
                        label="Markup (%)"
                        placeholder='Markup (%)'
                        name='markup'
                        type="number"
                        value={expense.markup === null || expense.markup === 0 ? '' : expense.markup}
                        onChange={handleInputChange}
                        style={{ border: '1px solid #ccc' }}
                        required={true}
                    />
                    <Button floated='right' positive type='submit' content={numericId ? 'Update' : 'Submit'} />
                    <Button as={NavLink} to='/' floated='right' type='button' content='Cancel' />
                </Form>
            </Segment>
        </>
    );
}