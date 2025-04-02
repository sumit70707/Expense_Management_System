import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCustomerByUsername } from "../../Services/CustomerService";
import { getExpenseReport, sendExpenseReport } from "../../Services/ExpenseReportService";

const ExpenseReport = () => {
  
  const [customer, setCustomer] = useState();
  let navigate=useNavigate();

  useEffect(() => {
    getCustomerData();
  }, []);

  const getCustomerData = () => { 
    getCustomerByUsername().then((response) => {           
      setCustomer(response.data);
      });
  };
  const returnBack=()=>{
    navigate('/CustomerMenu'); 
   }
  
  //get pdf 
  const getReport = async () => {

      if (!customer){
        return alert("Customer data is not loaded yet!");
      }
      //console.log(" Customer ID:", customer.customerId);
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
  //send email
const sendEmailReport = async () => {
  if (!customer){
    return alert("Customer data is not loaded yet!");
  }

    try {
      const response = await sendExpenseReport(customer.email, customer.customerId);
      alert(response.data);
    } catch (error) {
      console.error("Error while sending report:", error);
    }
  };
  

  return (
    <div className="text-center">
    <h2>Expense Report</h2>
    <button style={{marginLeft: "10px"}} onClick={()=>getReport()} className="btn btn-success">View Expense Report</button>

    <button style={{marginLeft: "10px"}} onClick={()=>sendEmailReport()} className="btn btn-success">Send Email Report</button>
    <button style={{marginLeft: "10px"}} onClick={()=>returnBack()} className="btn btn-success">Return</button>    
  </div>
);
};

export default ExpenseReport;
