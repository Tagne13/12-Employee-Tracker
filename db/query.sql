SELECT employee.id, first_name, last_name, title, salary, department.name AS deptName, manager_id AS ManagerID
FROM employee
JOIN role
ON role_id = role.id
JOIN department
ON department_id = department.id;