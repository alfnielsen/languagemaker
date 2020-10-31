<script lang="ts">
   import Todos from './components/Todos.svelte';
   import TopBar from './components/TopBar.svelte';

</script>

<section>
   <TopBar />
   <h1>App</h1>
   <Todos />
</section>

<style>

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

</style>