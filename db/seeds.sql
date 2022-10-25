INSERT INTO department(name)
VALUE ("Marketing"), ("Finance"), ("Operations management"), ("Human Resource"), ("Information Technology");

INSERT INTO role(titleRole, salary_in_thousand, department_id)
VALUE("Marketing", 80, 1),
     ("Accountant", 90, 2),
     ("Manager", 85, 3),
     ("Trainee", 95, 4),
     ("Developer", 130, 5);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUE("Ria", "Sen", 1, 1),
     ("David", "G", 2, 2),
     ("Ryan", "Smith", 3, 3),
     ("Lee", "Lopez", 4, 4),
     ("Taylor", "Brown",5 , 5);



