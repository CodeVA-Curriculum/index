<script lang='ts'>
  import GuideNav from '$lib/components/guide/GuideNav.svelte'
  let { data, children } = $props()

</script>
<GuideNav guide={data.guide} user={data.user} session={data.session} />
{@render children()}
