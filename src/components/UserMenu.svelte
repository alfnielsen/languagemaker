
<script>
   import { user } from '../stores/user.store'
</script>
<style>
   img {
      border-radius: 100%;

   }
</style>

<div class='name'>{ $user.displayName }</div>

<img src={ $user.photoURL } width="60" alt="user avatar">

<!-- <p>Your userID is { uid }</p> -->