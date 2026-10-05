<script lang='ts'>
  import { onMount } from 'svelte'
  let { id = "14I8C6FKINQ"} = $props();
  let loaded = $state(false)
  let iframeElement  
  function iframeLoader(node, callback) {
		function checkLoad() {
			callback();
		}

		if (node.contentDocument?.readyState === 'complete') {
			checkLoad();
		} else {
			node.addEventListener('load', checkLoad);
		}

		return {
			destroy() {
				node.removeEventListener('load', checkLoad);
			}
		};
	}
	function onReady() {
	  console.log("Loaded iframe")
	  // loaded = true
	}
</script>
<div class='video' aria-busy="true">
  <iframe onload={onReady} src='https://www.youtube.com/embed/{id}' title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>
<style lang='scss'>
  .video {
    flex: 1;
    font-size: 300%;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  .invisible { display: none; }
  .visible { display: block; }
  iframe { position: absolute; flex: 1; border-radius: 12px;width: 100%; height: 100%;  }
</style>
