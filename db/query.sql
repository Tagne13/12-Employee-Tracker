SELECT department.id, role.department_id
FROM department
JOIN role
ON department.id = role.department_id;

SELECT role.id, employee.role_id
FROM role
JOIN employee
ON role.id = employee.role_id;

SELECT employee.id, employ.manager_id
FROM employee
JOIN employee AS employ
ON employee.id = employ.manager_id;