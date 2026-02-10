<script lang='ts'>
  
	let { obj } = $props();
</script>

<a>{obj.title}</a>

<style lang='scss'>
  a {
    white-space: nowrap; 
    padding: 2px;
    margin: 2px;
    font-size: small;
    background-color: whitesmoke;
    box-shadow: 1px 1px black;
  }
</style>
