<script>
  import "../app.scss";
  import Nav from '$lib/components/Nav.svelte'
  import Analytics from "$lib/components/analytics/Analytics.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import Acknowledge from "$lib/components/Acknowledge.svelte";
</script>

<svelte:head>
    <title>CodeVA Curriculum Library</title>
</svelte:head>

<Analytics />

<Nav />
<slot />

<!-- <Acknowledge /> -->
<!-- <Footer /> -->
