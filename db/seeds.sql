INSERT INTO department (name)
VALUES ("Family Medicine"),
       ("Internal Medicine"),
       ("Emergency Medicine"),
       ("Rehabiliation"),
       ("Orthopedics"),
       ("Cardiopulmonary"),
       ("Oncology"),
       ("Gastroentrology"),
       ("Urology"),
       ("Endocrinology");

INSERT INTO role (title, salary, department_id)
VALUES ("Physical Therapist", 80000.00, 4),
       ("Medical Assistant", 45000.00, 2),
       ("Administrative Assistant", 50000.00, 3),
       ("Physician", 200000.00, 9),
       ("Registered Nurse", 65000.00, 7);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jeff", "Montagne", 1, NULL),
       ("Gabi", "Hill", 5, 1),
       ("John", "Doe", 4, NULL),
       ("Jane", "Doe", 3, 3),
       ("Michael", "Jordan", 2, 3);
