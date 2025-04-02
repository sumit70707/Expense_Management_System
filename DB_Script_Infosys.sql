use expensedb;
show tables;
select * from expense_user;
select * from category;
select * from customer;
select * from expense;
show databases;
DELETE FROM customer WHERE customer_name = 'w';

DESC expense;
DESC customer;
DESC category;

truncate table expense_user;
truncate table customer;
truncate table expense;
DELETE FROM expense;
SET SQL_SAFE_UPDATES = 0;

ALTER TABLE expense DROP COLUMN date;







use careandcure;
show tables;
select * from patients;
select * from doctor;
select * from appointment;



INSERT INTO patients (patient_name, contact_number, email_id, location, date_of_birth, gender, allergies, medications, treatments, medical_history, others, last_visit_date, status, doctor_id)
VALUES
    ('John Doe', '1234567890', 'johndoe@example.com', 'New York', '1985-05-10', 'Male', 'None', 'Paracetamol', 'Consultation', 'No previous history', 'None', '2025-03-20', true, 1),
    ('Jane Smith', '0987654321', 'janesmith@example.com', 'Los Angeles', '1990-02-15', 'Female', 'Pollen', 'Ibuprofen', 'Consultation', 'Asthma', 'None', '2025-03-18', true, 2),
    ('Alice Johnson', '1122334455', 'alicej@example.com', 'Chicago', '1988-11-23', 'Female', 'None', 'Aspirin', 'Routine Checkup', 'No history', 'None', '2025-03-15', true, 1),
    ('Bob Brown', '5566778899', 'bobbrown@example.com', 'Miami', '1992-08-05', 'Male', 'Dust', 'Antibiotics', 'Consultation', 'High blood pressure', 'None', '2025-03-10', true, 3),
    ('Mary Davis', '6677889900', 'marydavis@example.com', 'Dallas', '1978-03-22', 'Female', 'None', 'None', 'Annual Checkup', 'No issues', 'None', '2025-03-17', true, 4),
    ('Steve Martin', '2233445566', 'stevemartin@example.com', 'San Francisco', '1982-09-14', 'Male', 'Peanuts', 'Penicillin', 'Consultation', 'No history', 'None', '2025-03-12', true, 2),
    ('Emma Wilson', '3344556677', 'emmawilson@example.com', 'Austin', '1995-06-30', 'Female', 'None', 'Acetaminophen', 'Routine Checkup', 'No known issues', 'None', '2025-03-16', true, 1),
    ('David Lee', '4455667788', 'davidlee@example.com', 'Seattle', '1980-01-20', 'Male', 'None', 'None', 'Consultation', 'Chronic back pain', 'None', '2025-03-13', true, 5),
    ('Sophia Adams', '5566778890', 'sophiaadams@example.com', 'Boston', '1994-04-10', 'Female', 'None', 'Ibuprofen', 'Consultation', 'No previous conditions', 'None', '2025-03-14', true, 3),
    ('William Clark', '6677889901', 'williamclark@example.com', 'Atlanta', '1984-07-25', 'Male', 'None', 'None', 'Annual Checkup', 'No history', 'None', '2025-03-19', true, 4);

INSERT INTO appointment (
    appointment_date, 
    slot, 
    reason_for_visit, 
    doctor_report, 
    medicines_suggested, 
    status, 
    patient_id, 
    doctor_id
) 
VALUES 
    ('2026-03-24', '09:00 -09:30', 'Routine Checkup', 'Normal report', 'Paracetamol', 'Scheduled', 1, 1),
    ('2026-03-24', '10:00 - 10:30', 'Follow-up for headache', 'No major issues', 'Ibuprofen', 'Scheduled', 2, 2),
    ('2025-03-25', '11:00 - 11:30', 'General checkup', 'Healthy', 'None', 'Scheduled', 3, 3),
    ('2026-03-27', '12:00 - 12:30', 'Consultation for fever', 'Mild fever, no concerns', 'Acetaminophen', 'Scheduled', 4, 4),
    ('2025-03-28', '08:00 - 08:30', 'Blood pressure check', 'Blood pressure is normal', 'None', 'Scheduled', 5, 5),
    ('2025-03-26', '09:30 - 10:00', 'Follow-up for diabetes', 'Blood sugar levels are stable', 'Metformin', 'Scheduled', 6, 6),
    ('2025-03-26', '14:00 - 14:30', 'Consultation for back pain', 'Minor muscle strain', 'Muscle relaxants', 'Scheduled', 7, 7),
    ('2025-03-24', '15:00 - 15:30', 'Skin rash treatment', 'No serious issues', 'Hydrocortisone cream', 'Scheduled', 8, 8),
    ('2025-03-23', '16:00 - 16:30', 'Pregnancy checkup', 'Healthy pregnancy', 'Folic acid', 'Scheduled', 9, 9),
    ('2025-03-26', '17:00 - 17:30', 'Routine dental checkup', 'No cavities', 'Toothpaste and floss', 'Scheduled', 10, 10);