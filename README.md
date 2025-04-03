# Expense Management System  

## 📌 Overview  
The **Expense Management System** is a monolithic web application designed to help individuals efficiently track, manage, and analyze their daily expenses. By eliminating manual expense tracking, the system enhances transparency, helps users maintain better control over their finances, and streamlines financial planning.

## 🚀 Features  
- **User Management**: Secure authentication and authorization for users.  
- **Expense Tracking**: Add, update, and manage expenses efficiently.  
- **Category Management**: Categorize expenses for better organization.  
- **Report Generation**:
  - Generate reports for expense analysis using **pie charts**.
  - Generate **PDF reports** (similar to bank statements).  
  - Send expense reports via **email** directly to the user.  

## 🏠 Architecture  
The system follows a **monolithic architecture**, ensuring scalability, flexibility, and maintainability. The application is modularized into the following key components:  

1. **User Module** – Manages user authentication, roles, and profiles.  
2. **Expense Module** – Handles expense creation, updates, and tracking.  
3. **Category Module** – Allows categorization of expenses for structured reporting.  
4. **Report Module** –
   - Generate reports using **pie charts** for users.
   - Generates **PDF reports** for users.  
   - Allows users to send reports via **email**.  

## 🛠️ Tech Stack  
- **Frontend**: React, Bootstrap  
- **Backend**: Java (Spring Boot)  
- **Database**: MySQL   
- **Authentication**:  Spring Security  
- **PDF Generation**: iText  
- **Email Service**:  Spring Boot Mail  

## 📂 Project Structure  
```  
expense-management-system/  
│── backend/  
│   ├── /src/main/java/com/infosys/expenseManagementApplication
│   │        ├── ExpenseManagementApplication.java
│   │        ├── bean
│   │        │   ├── Category.java
│   │        │   ├── Customer.java
│   │        │   ├── CustomerExpense.java
│   │        │   ├── Expense.java
│   │        │   ├── ExpenseUser.java
│   │        ├── config
│   │        │   ├── EncoderConfig.java
│   │        │   ├── SystemConfig.java
│   │        ├── controller
│   │        │   ├── CategoryController.java
│   │        │   ├── CustomerController.java
│   │        │   ├── ExpenseController.java
│   │        │   ├── LoginController.java
│   │        ├── dao
│   │        │   ├── ExpenseUserRepository.java
│   │        ├── dao.category
│   │        │   ├── CategoryDao.java
│   │        │   ├── CategoryDaoImpl.java
│   │        │   ├── CategoryRepository.java
│   │        ├── dao.customer
│   │        │   ├── CustomerDao.java
│   │        │   ├── CustomerDaoImpl.java
│   │        │   ├── CustomerRepository.java
│   │        ├── dao.expense
│   │        │   ├── ExpenseDao.java
│   │        │   ├── ExpenseDaoImpl.java
│   │        │   ├── ExpenseRepository.java
│   │        ├── report
│   │        │   ├── EmailService.java
│   │        │   ├── ExpenseReportController.java
│   │        │   ├── ExpenseReportService.java
│   │        │   ├── ExpenseService.java
│   │        ├── service
│   │        │   ├── CustomerExpenseService.java
│   │        │   ├── ExpenseUserService.java
│   │        ├── src/main/resources  
│   │        ├── pom.xml (Maven dependencies)  
│── frontend/  
│   ├── src/  
│   │   ├── Components/  
│   │   │   ├── Auth/  
│   │   │   │   ├── ProtectedRoute.jsx  
│   │   │   ├── CategoryComponent/  
│   │   │   │   ├── AdminCategoryList.jsx  
│   │   │   │   ├── CategoryAddition.jsx  
│   │   │   │   ├── CategoryUpdate.jsx  
│   │   │   │   ├── CustomerCategoryList.jsx  
│   │   │   ├── CustomerComponent/  
│   │   │   │   ├── CustomerAddition.jsx  
│   │   │   │   ├── CustomerCurrent.jsx  
│   │   │   │   ├── CustomerDetails.jsx  
│   │   │   │   ├── CustomerList.jsx  
│   │   │   │   ├── CustomerUpdate.jsx  
│   │   │   ├── ExpenseComponent/  
│   │   │   │   ├── CategoryExpenseEntry.jsx  
│   │   │   │   ├── ExpenseEntry.jsx  
│   │   │   │   ├── ExpenseList.jsx  
│   │   │   │   ├── ExpenseReport.jsx  
│   │   │   │   ├── ExpenseUpdate.jsx  
│   │   │   ├── LoginComponent/  
│   │   │   │   ├── AdminMenu.jsx  
│   │   │   │   ├── CustomerMenu.jsx
│   │   │   │   ├── LoginPage.jsx
│   │   │   │   ├── RegisterUser.jsx  
│   │   ├── Services/  
│   │   │   ├── CategoryService.jsx  
│   │   │   ├── CustomerService.jsx  
│   │   │   ├── ExpenseReportService.jsx  
│   │   │   ├── ExpenseService.jsx  
│   │   │   ├── LoginService.jsx
│   │   ├── AdminMenu.css
│   │   ├── App.css
│   │   ├── App.js 
│   │   ├── CustomerMenu.css
│   │   ├── index.css  
│   │   ├── index.js   
│   ├── public
│   ├── .gitignore 
│   ├── package-lock.json
│   ├── package.json 
│── DB_Script_Infosys.sql
│── README.md  
```  

## 🏁 Getting Started  
### Prerequisites  
- Java 17  
- Node.js & npm  
- MySQL  

### Installation  
1. Clone the repository:  
   ```bash  
   git clone https://github.com/sumit70707/Expense_Management_System.git  
   cd Expense_Management_System  
   ```  
2. **Backend Setup:**  
   - Navigate to the `backend` folder and configure **database** & **email settings** in `application.properties`.  
   - Build and run the Spring Boot application.  
   ```bash  
   mvn clean install  
   mvn spring-boot:run  
   ```  
3. **Frontend Setup:**  
   - Navigate to the `frontend` folder.  
   - Install dependencies and start the React app.  
   ```bash  
   npm install  
   npm start  
   ```  

## 🤝 Contributing  
Contributions are welcome! Feel free to open issues and pull requests.  
