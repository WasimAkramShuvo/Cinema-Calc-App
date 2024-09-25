import axios, { AxiosResponse } from "axios";
import { ExpenseDto } from "../models/expenseDto";
import axiosInstance from "./axiosInstance";
import { CreateExpenseDto } from "../models/createExpenseDto";

const apiConnector = {
    getExpenses: async (): Promise<ExpenseDto[]> => {
        try {
            const response: AxiosResponse<ExpenseDto[]> =
                await axiosInstance.get(`/getAllExpenses`);
          
            const expenses = response.data.map(expense => ({
                ...expense
            }));
    
            return expenses;
        }
        catch (error) {
            console.log('Error fetching expenses:', error);
            throw error;
        }
    },

    createExpense: async (expense: CreateExpenseDto): Promise<void> => {
        await axiosInstance.post<any>(`/createExpense`, expense);
    },

    editExpense: async (expenseId: number, expense: CreateExpenseDto): Promise<void> => {
        await axiosInstance.put<any>(`/updateExpense/${expenseId}`, expense);
    },

    deleteExpense: async (expenseId: number): Promise<void> => {
        await axiosInstance.delete<any>(`/deleteExpense/${expenseId}`);
    },

    getExpenseById: async (expenseId: number): Promise<ExpenseDto | undefined> => {
        const response = await axiosInstance.get<ExpenseDto>(`/getExpenseById/${expenseId}`);
        return response.data;
    },
}

export default apiConnector;