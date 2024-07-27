 team-71
<!-- <script>

</script>

<div class="card gap-16 items-center mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 overflow-hidden rounded-lg">
	 Add tool here 
</div>

<style>

</style>-->

<script lang="ts">
	let inputText = '';
	let outputSQL= '';
  
	function convertTextToSQL(text) {
  let sqlQuery = '';
  const words = text.toLowerCase().split(' ');
  let operation = '';
  let table = '';
  let columns = '';
  let values = '';
  let condition = '';
  let andClause = '';
  let orClause = '';
  let plsqlBlock = '';

  for (let i = 0; i < words.length; i++) {
    if (words[i] === 'create') {
      operation = 'CREATE';
      i++;
      if (words[i] === 'table') {
        i++;
        table = words[i];
        i++;
        columns = '';
        let columnDefs = [];
        while (i < words.length && words[i] !== 'values') {
          let columnName = words[i];
          i++;
          let dataType = words[i];
          columnDefs.push(`${columnName} ${dataType}`);
          i++;
        }
        columns = columnDefs.join(', ');
      } else if (words[i] === 'procedure' || words[i] === 'function') {
        i++;
        plsqlBlock = 'CREATE OR REPLACE ' + words[i] + ' ';
        i++;
        plsqlBlock += words[i] + ' AS ';
        i++;
        while (i < words.length) {
          plsqlBlock += words[i] + ' ';
          i++;
        }
        plsqlBlock = plsqlBlock.trim();
      }
    } else if (words[i] === 'insert') {
      operation = 'INSERT';
      i++;
      if (words[i] === 'into') {
        i++;
        table = words[i];
        i++;
        columns = '';
        while (i < words.length && words[i] !== 'values') {
          columns += words[i] + ' ';
          i++;
        }
        columns = columns.trim();
        i++;
        values = '';
        while (i < words.length) {
          values += words[i] + ' ';
          i++;
        }
        values = values.trim();
      }
    } else if (words[i] === 'select') {
      operation = 'SELECT';
      i++;
      columns = '';
	  if(words[i]=='all'){
		operation="*";
		i++;
		columns = '';
	  }

      while (i < words.length && words[i] !== 'from') {
        columns += words[i] + ' ';
        i++;
      }
      columns = columns.trim();
      i++;
      table = words[i];
      i++;
      condition = '';
      while (i < words.length) {
        if (words[i] === 'where') {
          i++;
          condition = 'WHERE ';
        } else if (words[i] === 'and') {
          andClause = ' AND ';
          i++;
        } else if (words[i] === 'or') {
          orClause = ' OR ';
          i++;
        } else {
          condition += words[i] + ' ';
          i++;
        }
      }
      condition = condition.trim();
    } else if (words[i] === 'update') {
      operation = 'UPDATE';
      i++;
      table = words[i];
      i++;
      columns = '';
      values = '';
      while (i < words.length && words[i] !== 'where') {
        columns += words[i] + ' ';
        i++;
        values += words[i] + ' ';
        i++;
      }
      columns = columns.trim();
      values = values.trim();
      i++;
      condition = '';
      while (i < words.length) {
        if (words[i] === 'where') {
          i++;
          condition = 'WHERE ';
        } else if (words[i] === 'and') {
          andClause = ' AND ';
          i++;
        } else if (words[i] === 'or') {
          orClause = ' OR ';
          i++;
        } else {
          condition += words[i] + ' ';
          i++;
        }
      }
      condition = condition.trim();
    } else if (words[i] === 'delete') {
      operation = 'DELETE';
      i++;
      table = words[i];
      i++;
      condition = '';
      while (i < words.length) {
        if (words[i] === 'where') {
          i++;
          condition = 'WHERE ';
        } else if (words[i] === 'and') {
          andClause = ' AND ';
          i++;
        } else if (words[i] === 'or') {
          orClause = ' OR ';
          i++;
        } else {
          condition += words[i] + ' ';
          i++;
        }
      }
      condition = condition.trim();
    }
  }
  switch (operation) {
    case 'CREATE':
      if (plsqlBlock) {
        sqlQuery = plsqlBlock;
      } else {
        sqlQuery = `CREATE TABLE ${table} (${columns})`;
      }
      break;
    case 'INSERT':
      sqlQuery = `INSERT INTO ${table} (${columns}) VALUES (${values})`;
      break;
	  case 'SELECT':
      sqlQuery = `SELECT ${columns} FROM ${table}`;
      if (condition) {
        sqlQuery += ` ${condition}`;
        if (andClause) {
          sqlQuery += andClause;
        }
        if (orClause) {
          sqlQuery += orClause;
        }
      }
      break;
    case 'UPDATE':
      sqlQuery = `UPDATE ${table} SET ${columns} = ${values}`;
      if (condition) {
        sqlQuery += ` ${condition}`;
        if (andClause) {
          sqlQuery += andClause;
        }
        if (orClause) {
          sqlQuery += orClause;
        }
      }
      break;
    case 'DELETE':
      sqlQuery = `DELETE FROM ${table}`;
      if (condition) {
        sqlQuery += ` ${condition}`;
        if (andClause) {
          sqlQuery += andClause;
        }
        if (orClause) {
          sqlQuery += orClause;
        }
      }
      break;
  }

  return sqlQuery;
}
function handleClick() {
    outputSQL = convertTextToSQL(inputText);
  }
</script>

<main>
	<div class="card gap-16 items-center mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 overflow-hidden rounded-lg">
        <h1>Text to SQL Converter</h1>
        <textarea bind:value={inputText} placeholder="Enter text to convert to SQL"></textarea>
        <button on:click={() => handleClick()}>Convert to SQL</button>
        <textarea readonly value={outputSQL}></textarea>
    </div>
</main>
  
  <style>
	main {
	  font-family: Arial, sans-serif;
	  max-width: 800px;
	  margin: 40px auto;
	  padding: 20px;
	  background-color: #f9f9f9;
	  border: 1px solid #ddd;
	  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	}
  
	textarea {
	  width: 100%;
	  height: 100px;
	  padding: 10px;
	  font-size: 16px;
	  margin-bottom: 20px;
	}
   button {
    background-color: #4CAF50;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  button:hover {
    background-color: #3e8e41;
  }
</style>
team-71
