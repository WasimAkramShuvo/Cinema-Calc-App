import { Button, Icon } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { ExpenseDto } from "../../models/expenseDto";
import apiConnector from "../../api/apiConnector";

interface Props {
    expense: ExpenseDto;
}

export default function ExpenseTableItem({ expense }: Props) {

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this expense?");
        if (confirmDelete) {
            await apiConnector.deleteExpense(expense.id);
            window.location.reload();
        }
    };

    return (
        <tr className="center aligned">
            <td data-label="Name">{expense.name}</td>
            <td data-label="Price">{expense.price} €</td>
            <td data-label="Markup">{expense.markup}%</td>
            <td data-label="TotalPrice">{expense.totalPrice} €</td>
            <td data-label="Action">
                <Button as={NavLink} to={`editExpense/${expense.id}`} className="hover-button" color="yellow" icon>
                    <Icon name="edit" />
                </Button>
                <Button type="button" className="hover-button" negative icon onClick={handleDelete}>
                    <Icon name="trash" />
                </Button>
            </td>
        </tr>
    );
}
