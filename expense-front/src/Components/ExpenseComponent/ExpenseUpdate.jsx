import React, { useState, useEffect } from "react";
import { displayExpenseById, updateExpense } from '../../Services/ExpenseService';
import { useNavigate, useParams } from "react-router-dom";
import '../../LoginView.css';

const ExpenseUpdate = () => {
    const [expense, setExpense] = useState({
        expenseId: 0,
        customerId: 0,
        categoryId: 0,
        expenseDate: "",
        amount: "",
        description: "",
    });

    const [errors, setErrors] = useState({});

    let navigate = useNavigate();
    const { id } = useParams();

    const returnBack = () => {
        navigate('/expense-list');
    };

    useEffect(() => {
        displayExpenseById(id).then((response) => {
            setExpense(response.data);
        });
    }, [id]);

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setExpense((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const validateForm = () => {
        let formErrors = {};
        if (!String(expense.expenseDate).trim()) {
            formErrors.expenseDate = "Expense Date is required!";
        }
        if (!String(expense.amount).trim()) {
            formErrors.amount = "Expense Amount is required!";
        }
        if (!String(expense.description).trim()) {
            formErrors.description = "Expense Description is required!";
        }
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };
    

    const expenseUpdate = (event) => {
        event.preventDefault();
        if (!validateForm()) return;
        updateExpense(expense).then(() => {
            alert("Expense updated successfully");
            navigate('/expense-list');
        });
    };

    return (
        <div className="container" style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div className="card p-4 shadow" style={{ width: "400px", borderRadius: "10px" }}>
                <div className="card-body">
                    <h2 className="text-center"><u>Update Expense</u></h2>
                    <br />
                    <form>
                        <div className="form-group">
                            <label>Expense Id: </label>
                            <input name="expenseId" className="form-control" value={expense.expenseId} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Customer Id: </label>
                            <input name="customerId" className="form-control" value={expense.customerId} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Category Id: </label>
                            <input name="categoryId" className="form-control" value={expense.categoryId} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Expense Date: </label>
                            <input type="date" name="expenseDate" className="form-control" value={expense.expenseDate} onChange={onChangeHandler} />
                            {errors.expenseDate && (<p style={{ color: "red", fontSize: "14px" }}>{errors.expenseDate}</p>)}
                        </div>
                        <div className="form-group">
                            <label>Expense Amount: </label>
                            <input placeholder="Expense Amount" name="amount" className="form-control" value={expense.amount} onChange={onChangeHandler} />
                            {errors.amount && (<p style={{ color: "red", fontSize: "14px" }}>{errors.amount}</p>)}
                        </div>
                        <div className="form-group">
                            <label>Description: </label>
                            <input placeholder="Description" name="description" className="form-control" value={expense.description} onChange={onChangeHandler} />
                            {errors.description && (<p style={{ color: "red", fontSize: "14px" }}>{errors.description}</p>)}
                        </div>
                        <button type="submit" className="btn btn-success w-100 mt-3" onClick={expenseUpdate}>Save</button>
                        <button type="button" className="btn btn-success w-100 mt-3" onClick={returnBack}>Return</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ExpenseUpdate;
