<script lang='ts'>
  import GuideNav from '$lib/components/guide/GuideNav.svelte'
  let { data, children } = $props()

  import {onMount} from 'svelte'
</script>
<GuideNav guide={data.guide} user={data.user} session={data.session} />
  {@render children()}
