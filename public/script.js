
document.getElementById('displayTodos').addEventListener('click', async () => {
  try{
      const response = await fetch('/todos')
      const todos = await response.json();
   
    // const todos = await response.json();
    // TODO ➡️ Display the todos within in element id of 'todoDisplay'
    document.getElementById('todoDisplay').textContent = JSON.stringify(todos, null, 2);
  }catch (error){
    console.error('Error fetching todos:', error);

  }
});

// There a bunch of missing keywords in the following code, fix them to have the code work corretly!

document.getElementById('submitTodo').addEventListener('click', async () => {
    const name = document.getElementById('todoName').value;
    const priority = document.getElementById('todoPriority').value || 'low';
    const isFun = document.getElementById('todoIsFun').value || 'true';

    console.log("This should print in terminal")
    //const todo = { name, priority, isFun };
 
try {
    const response = await fetch('/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, priority, isFun })
    });
  
    const result = await response.json();
    alert(`Todo added: ${JSON.stringify(result)}`);
  }catch (error) {
    console.error('Error sumbitting todo:', error);
  }
});
 
document.getElementById('deleteTodo').addEventListener('click', async () => {
    const id = document.getElementById('todoIdToDelete').value;
    
    try{
      const response = await fetch(`/todos/${id}`, { method: 'DELETE' });
      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error('Error delting todo:', error);
    }
});