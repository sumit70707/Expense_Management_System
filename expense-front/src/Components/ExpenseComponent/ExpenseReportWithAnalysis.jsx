import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCustomerByUsername } from "../../Services/CustomerService";
import { getExpenseReport, sendExpenseReport } from "../../Services/ExpenseReportService";
import { getExpenseReportByCustomer } from "../../Services/ExpenseService";
import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";
import "../../LoginView.css";

const COLORS = ["#0088FE", "#FF0000", "##FF0000", "#FF8042", "#A28FFF"];

const ExpenseReportWithAnalysis = () => {
  const [customer, setCustomer] = useState();
  const [CustomerExpenses, setCustomerExpense] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCustomerData();
  }, []);

  const getCustomerData = async () => {
    try {
      const response = await getCustomerByUsername();
      setCustomer(response.data);
      fetchExpenseData(response.data.customerId);
    } catch (error) {
      console.error("Error loading customer:", error);
    }
  };

  const getReport = async () => {
    if (!customer) return alert("Customer data is not loaded yet!");
    try {
      const response = await getExpenseReport(customer.customerId);
      if (response.status === 404) {
        alert(response.headers.get("Warning") || "No expenses found for this customer.");
        return;
      }
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    } catch (error) {
      alert("Failed to retrieve PDF from backend.");
    }
  };

  const sendEmailReport = async () => {
    if (!customer) return alert("Customer data is not loaded yet!");
    try {
      const response = await sendExpenseReport(customer.email, customer.customerId);
      alert(response.data);
    } catch (error) {
      console.error("Error while sending report:", error);
    }
  };

  const fetchExpenseData = async (customerId) => {
    try {
      const response = await getExpenseReportByCustomer(customerId);
      setCustomerExpense(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const returnBack = () => {
    navigate("/CustomerMenu");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        overflowY: "auto",
        display: "block", // override global body flex
      }}
    >
      <div
        style={{
          background: "linear-gradient(to right, #4facfe, #00f2fe)",
          minHeight: "100vh",
          padding: "30px",
        }}
      >
        <h1
          className="text-center fw-bold mb-5"
          style={{ color: "#222", letterSpacing: "1px" }}
        >
          Expense Report
        </h1>

        <div className="expense-container">
          <div className="row align-items-start">
            <div className="col-md-6 text-center mb-4">
              <h4 className="mb-3">Expense Analysis</h4>
              <hr
                style={{
                  height: "3px",
                  borderWidth: 0,
                  backgroundColor: "#444",
                  width: "60%",
                  margin: "0 auto 20px",
                }}
              />
              {CustomerExpenses.length > 0 ? (
                <PieChart width={400} height={400}>
                  <Pie
                    data={CustomerExpenses}
                    dataKey="amount"
                    nameKey="categoryId"
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={120}
                    fill="#8884d8"
                    label
                  >
                    {CustomerExpenses.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              ) : (
                <p>No expense data available.</p>
              )}
            </div>
            <div className="col-md-6 text-center mb-4">
              <h4 className="mb-3">Report Actions</h4>
              <hr
                style={{
                 height: "3px",
                borderWidth: 0,
                backgroundColor: "#444",
                width: "60%",
                margin: "0 auto 20px",
                }}
                />

              <button className="btn btn-success m-2 w-75" onClick={getReport}>
                View Expense Report
              </button>
              <button className="btn btn-success m-2 w-75" onClick={sendEmailReport}>
                Send Email Report
              </button>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col text-center">
            <button
                className="btn btn-success"
                 style={{ width: "700px", fontWeight: "bold" ,marginBottom: "30px"}}
                onClick={returnBack}>Return</button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseReportWithAnalysis;
