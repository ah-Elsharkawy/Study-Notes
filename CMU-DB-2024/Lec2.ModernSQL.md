# Modern SQL

## Relational Languages

> [!tip] **Data Manipulation Language (DML)**
>
> - **SELECT**: retrieve data from the database
> - **INSERT**: insert data into the database
> - **UPDATE**: update data in the database
> - **DELETE**: delete data from the database

> [!tip] **Data Definition Language (DDL)**
>
> - **CREATE**: create objects in the database
> - **ALTER**: alter the structure of the database
> - **DROP**: delete objects from the database
> - **TRUNCATE**: remove all records from a table

> [!tip] **Data Control Language (DCL)**
>
> - **GRANT**: give user access privileges to database
> - **REVOKE**: take back access privileges given with the GRANT command
> - **DENY**: deny access privileges to database

> [!note]
>
> Although relational model is based on sets (no duplicates), SQL depends on bags like multiset (allows duplicates).
> Bags are unordered collections of elements that may contain duplicates.

## Aggregates

Aggregates are functions that summarize a set of values into a single value.

> [!tip]
>
> when using an aggregate function, you must use the `GROUP BY` clause to specify the grouping column(s).
> also you can't select a column that is not in the `GROUP BY` clause unless it is an aggregate function or use any_value() function instead to return an arbitrary value (random) from the group.
> any_value() function is specific to MySQL for other databases you can use other meaninful functions like `MIN()`, `MAX()`, `First_Value(column) over (partition by column order by column)`, etc.
> We can also use `HAVING` clause to filter the groups.

```sql
SELECT column1, column2, aggregate_function(column3)
FROM table_name
GROUP BY column1, column2
HAVING condition;
```

> [!note] sql mode
>
> In all DBMSs, the default SQL mode is Different in each DBMS and can be changed. However, you can change the SQL mode to a different mode to enable some features that are not available in the default mode.
> The instructor says as far as he knows there is sql modes switching only in the MySQL DBMS as they try to fix some faults they did in the past.

> [!tip] string operations
>
> - `LIKE` operator: used in a `WHERE` clause to search for a specified pattern in a column.
> - `SUBSTRING` function: extracts a substring from a string.
> - `CONCAT` function: concatenates two or more strings.
>   keep in mind that the `||` operator is considerd as a concatenation operator in some DBMSs but not in all of them.

> [!tip] date and time operations
>
> To get the current date and time, you can use the `SELECT CURRENT_TIMESTAMP;` statement, or call it as a function `SELECT CURRENT_TIMESTAMP();` it depends on the DBMS.

> [!tip] output redirection
>
> You can redirect the output of a query to a file using the `INTO certainTable` clause, some dbms like postgresql make a temporary table to store the output of the query.

> [!tip] window functions
>
> Window functions are a type of function that performs a calculation across a set of table rows that are somehow related to the current row.

```sql
SELECT Func-Name(...) OVER (...)
FROM table_name;
```

> we can use all aggregate functions in window functions plus some other special functions like `ROW_NUMBER()`, RANK(), DENSE_RANK(), NTILE(), LAG(), LEAD(), FIRST_VALUE(), LAST_VALUE(), etc.

> [!note] Nested Queries
>
> A nested query is a query that has another query embedded within it. The nested query is also known as a subquery.

> [!question] which is better performance wise, nested queries or CTEs?
>
> CTEs are better performance wise than nested queries because CTEs are executed only once and the result is stored in memory, while nested queries are executed every time they are called.
> THE INSTRUCTOR SAYS: "I don't know, It depends on the query execution plan, the DBMS, and the query itself."

> [!question] which is better performance wise, Join or Subquery?
>
> THE INSTRUCTOR SAYS: "Let's see and opened postgresql and wrote **Explain** before the query to see the query execution plan, the answer at the end is that nested queries most of the time are getting rewritten as joins but not always.
> The answer i got from searching is most of the time the join is faster than the subquery but the subquery advantage is that it is more readable and easier to write, although there are too many factors that can affect the performance of the query like how and where you write the subquery.

> [!tip] Nested Queries operations
>
> - **IN**: used to compare a value to a list of literal values or subquery results, equivalent to `ANY`.
> - **EXISTS**: used to check the existence of a row in a subquery.
> - **ALL**: used to compare a value to all values in a list or returned by a subquery.
> - **ANY/SOME**: used to compare a value to any value in a list or returned by a subquery.

> [!tip] Lateral Join
>
> Lateral join allows a subquery to reference columns from the outer query by using the `LATERAL` keyword.

```sql
SELECT column1, column2, column3
FROM table1
LEFT JOIN LATERAL (
    SELECT column4
    FROM table2
    WHERE table1.column1 = table2.column4
) AS subquery ON true;
```

> here the subquery can reference the columns (column1) from the outer query.

> [!tip] Common Table Expressions (CTEs)
>
> CTEs are temporary result sets that are defined within the execution of a single SQL statement, which can be later referenced within the same query.

```sql
WITH cte_name AS (
    SELECT column1, column2
    FROM table_name
)
SELECT *
FROM cte_name;
```
