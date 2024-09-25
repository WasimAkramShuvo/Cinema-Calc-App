# Cinema-Calc-App
This project is a simple web application built using `React (with TypeScript)` for the frontend, `ASP.NET Core with Web API and C#` for the backend, and `SQLServer` for the Database. It allows users to manage film-related expenses with ease. The app supports adding, editing, and deleting expenses while showing the total sum of all expenses.

---

## 1. How to Run the Project Locally

### Backend Setup

1. Open the `.NET` solution in Visual Studio.
2. In the `appsettings.json` file, replace the database connection name with `
  "DefaultConnection": "Server=localhost;Database=CinemaCalcApp;Integrated Security=true;"` (or any other appropriate name for your environment).
3. Open **Package Manager Console** in Visual Studio, and run the following command to apply the database migrations:
   ```bash
   Update-Database
   ```
   This will create the necessary tables in the database. 
4. Press `Ctrl + F5` to start the project. It should automatically open the Swagger API interface in the browser.
5. After that the browser will look like this,
   
  ![image](https://github.com/user-attachments/assets/04a1d72c-eba5-4a25-acc0-607a7ef70cf5)


### Frontend Setup
1. Navigate to the frontend directory in the terminal.
2. Install the dependencies by running:
   ```bash
   npm install
   ```
3. Start the frontend application:
    ```bash
    npm start
    ```
4. This will launch the UI in the browser.
##### Viewing Expenses
Initially, the expense list may be empty (due to a new database), but you can add expenses via the UI, and they will display in the list.
Here is the initial view

![image](https://github.com/user-attachments/assets/11fbff6b-f662-4831-8a13-1127f8ada09f)

## 2. What is the Overall Structure of Your Code?
### Backend (.NET)
1. **Controllers**: `ExpensesController.cs` handles all the API requests (CRUD operations) related to expenses.
2. **Models**: Contains the `Expense.cs` model that represents an expense.
3. **Data**: The `ApplicationDbContext.cs` manages the database interactions using Entity Framework Core.
4. **Repository**: For `CRUD`, I am using custom repository which I customise `Create, Update, Delete, GetAll, GetSingle, FindBy, Count` methods.

### Frontend (React + TypeScript)
1. **App.tsx**: The main entry point that renders the `components >> expenses` Folder `ExpenseTable` component.
2. **ExpenseTable.tsx**: Contains the core logic for listing, adding expenses options and when button click then change the router in `/createExpense` page which is the `ExpenseForm` component, and Sum of all expense total prices logic also here. All listing data renders the `components >> expenses` Folder `ExpenseTableItem` component.
3. **ExpenseTableItem.tsx**: Contains the all listing data bindings, edit option and delete option. When edit option click then renders the again `ExpenseForm` Component.
4. **ExpenseForm.tsx**: Contains Create and Edit Form logic with validation. After successfully created or edited then show a alert message and go to listing page.
5. **apiConnector.ts**: Contains all backend api connection using `axios` and return `response`. 
6. **config.ts**: Contains the backend api base url and this also use `axiosInstance.ts` file which is also using `apiConnector.ts` file. 
    ```bash
    export const API_BASE_URL = 'https://localhost:7233/api/Expense';
    ```
7. **State Management**: Managed locally using React's `useState` and `useEffect` hooks.
8. **Styling**: The `App.css` uses basic `CSS` and `semantic-ui-css` for basic styling.
9. **Delete Button**: Each row in the table should have a delete icon button to remove that expense. When click this icon then show a alert message if yes then delete from the list.

**In Adding new expense,**

![image](https://github.com/user-attachments/assets/d8ee7825-51ab-4dde-b299-e8de16636320)


**Editing expense,**

![image](https://github.com/user-attachments/assets/0fe7dfe6-a957-4dce-8df0-973dd94751f0)


**After many data adding then list look like this,**

![image](https://github.com/user-attachments/assets/7b8010a2-f6f2-4d12-a7af-00ac543d732d)

## 3. How Do You Manage State in Your Application? Why Did You Choose This Solution?
1. I use React’s `useState` and `useEffect` hooks to manage state locally within components.
2. **State is managed per component**: Each expense’s details are stored in the local component state and updated based on user actions (like adding, editing, or deleting).
3. **Why this approach?**: It keeps the code simple and straightforward, with minimal external dependencies. Given the scale of the project, this approach is lightweight and sufficient for handling state changes locally.

## 4. How Does Your Approach for Precise Number Calculations Work?
To ensure precise calculations, I handle the percentages and the total expense price as follows:
##### Backend (.NET)
In, `ExpenseController.cs` controller, create and update method I can use the bellow calculation way,
```bash
_expense.TotalPrice = expense.Price + (expense.Price * expense.Markup / 100);
```
and save this `Expense` table in database.

## 5. What "Tasks" Did You Have on Your Mind? How Did You Break Down the Different Deliverables?
I broke down the deliverables into the following tasks:
#### Backend
1. Set up the database using Entity Framework Core.
2. Create the Expense model.
3. Develop the CRUD API using a Controller to handle HTTP requests.

#### Frontend
1. Build the `ExpenseTable` component that displays expenses.
2. In `ExpenseForm` component for adding and editing expenses.
3. Implement the logic for adding, editing, and deleting expenses using API calls to the backend.
4. Add routing for adding and editing expenses.

## 6. Use the readme as a notepad to make us understand your thinking

**Start with basic structure**: I began by ensuring the backend API was functional (using Swagger for testing), then moved on to building the frontend.
