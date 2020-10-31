<script>
   import { todos, addTodo , updateTodoStatus, removeTodo } from '../stores/todos.store'
   // Form Text
   let text = 'some task';

</script>

<style>
   input { display: block }
   .is-complete {
        text-decoration: line-through;
        color: green;
    }
</style>

Todos:

<ul>
  {#each $todos as todo}
       <li>
         {#if todo.complete}
            <span class="is-complete">{ todo.text }</span>
            <button on:click={()=>updateTodoStatus(todo.id, false)}> ✔️ </button>
         {:else}
            <span>{ todo.text }</span>
            <button on:click={()=>updateTodoStatus(todo.id, true)}> ❌ </button>
         {/if}
         <button on:click={()=>removeTodo(todo.id)}> 🗑 </button>
      </li>
  {/each}
</ul>


<input bind:value={text}>

<button on:click={()=>{ 
   addTodo(text)
   text = ''
}}>Add Task</button>