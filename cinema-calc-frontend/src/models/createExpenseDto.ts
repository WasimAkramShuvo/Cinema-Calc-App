export interface CreateExpenseDto {
    name: string;
    price: number | null;
    markup: number| null;
}