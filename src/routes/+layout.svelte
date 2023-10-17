<script>
  import "../app.scss";
  import Nav from '$lib/components/Nav.svelte'
  import Analytics from "$lib/components/analytics/Analytics.svelte";
</script>

<Analytics />

<Nav />
<slot />
