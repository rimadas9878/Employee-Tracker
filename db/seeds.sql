INSERT INTO department(name)
VALUE ("Marketing"), ("Finance"), ("Operations management"), ("Human Resource"), ("Information Technology");

INSERT INTO role(titleRole, salary_in_thousand, department_id)
VALUE("Marketing Manager", 150, 1),
     ("Account Manager", 130, 2),
     ("Operation Manager", 120, 3),
     ("Tester", 95, 5),
     ("Developer", 110, 5),
     ("Scrum Master", 90, 5),
     ("CEO", 200, 2);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUE("Ria", "Sen", 1, 1),
     ("David", "G", 2, 2),
     ("Ryan", "Smith", 3, 3),
     ("Lee", "Lopez", 4, 4),
     ("Taylor", "Brown",5 , 5);



