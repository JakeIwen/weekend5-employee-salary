CREATE TABLE salaries (
  id integer,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  title VARCHAR(50),
  salary INTEGER,
  active BOOLEAN DEFAULT true
);

INSERT INTO salaries (id, first_name, last_name, title, salary)
VALUES
(3, 'jake', 'iwen', 'bum', 1),
(7, 'john', 'johnathan', 'professional' , 100000);
