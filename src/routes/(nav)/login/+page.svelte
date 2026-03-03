<script lang='ts'>
  import type { PageProps } from './$types'
  let { data, form }:PageProps = $props()
</script>
<div class='container'>
  <p>hey</p>
  <p>{data.user? data.user.email : "Not logged in"}</p>
</div>
