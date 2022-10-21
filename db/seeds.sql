INSERT INTO department(name)
VALUE ("Marketing"), ("Finance"), ("Operations management"), ("Human Resource"), ("Information Technology")

INSERT INTO role(title, salary, department_id)
VALUE("Digital Marketing", "80k", 1),
     ("Accountant", "90k", 2),
     ("finance", "85k", 3),
     ("Talent Management", "95k", 4),
     ("Developer", "130k", 5)

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUE("Ria", "Sen", 1, 1),
     ("David", "G", 2, 2),
     ("Ryan", "Smith", 3, 3),
     ("Lee", "Lopez", 4, 4),
     ("Taylor", "Brown",5 , 5)



