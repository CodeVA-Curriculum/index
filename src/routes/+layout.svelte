<script>
  import "../app.scss";
  import Nav from '$lib/components/Nav.svelte'
  import Analytics from "$lib/components/analytics/Analytics.svelte";
    import Footer from "$lib/components/Footer.svelte";
</script>

<svelte:head>
    <title>CodeVA Curriculum Library</title>
</svelte:head>

<!-- <Analytics /> -->

<Nav />
<slot />
<!-- <Footer /> -->
