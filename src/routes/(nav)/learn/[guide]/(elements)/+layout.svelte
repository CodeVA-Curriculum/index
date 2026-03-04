<script lang='ts'>
  import GuideNav from '$lib/components/guide/GuideNav.svelte'
  let { data, children } = $props()

  import {onMount} from 'svelte'
  onMount(() => {
    console.log(data)
  })
</script>
<GuideNav guide={data.guide} />
<div class='container'>
  {@render children()}
</div>
