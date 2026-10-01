<script lang='ts'>
  import LogInButton from '$lib/components/LogInButton.svelte'
  let { session, user } = $props()
</script>
<h1>Track Your Learning</h1>
<p>Log in with an educator account to save projects, create reports, collect data from students, and track your progress! If you are a teacher interested in learning more about using trail guides in your classroom, <a href="https://codevirginia.org/">check out our professional learning!</a></p>
<div class='buttons'>
  <LogInButton redirect="/account" user={user} session={session} />
</div>
<blockquote>
  When users are logged in as students, this site does not track their data and does not make any attempt to associate their data with their individual identity. If you have questions about our privacy practices, please contact <a mailto="jonstapleton@codevirginia.org">jonstapleton@codevirginia.org</a>.
</blockquote>
