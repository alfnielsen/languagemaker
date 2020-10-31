<script lang="ts">
   import { user, signOut, signIn } from "../stores/user.store";
</script>
<style>
   .name{

   }
</style>



{#if $user}
<div class='name'>{ $user.displayName }</div>
   <img src={ $user.photoURL } width="60" alt="user avatar">

   <button on:click={signOut}>Logout</button>
{:else}
   <button on:click={signIn}>
      Signin with Google
   </button>
{/if}