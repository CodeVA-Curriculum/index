<script lang='ts'>
  import LogInButton from '$lib/components/LogInButton.svelte'
  let { guide, session, user }:PageProps = $props()
</script>
<nav>
  <ul>
    <li class='icon'><div class='icon-wrap'><a href="/learn"><img src="/images/icon.png"></a></div></li>
    <li>{guide.title}</li>
  </ul>
  <ul>
    <li><a href="/learn/{guide.pathTitle}">{guide.pathTitle.charAt(0).toUpperCase() + guide.pathTitle.slice(1)} Map</a></li>
    <li><a href="/learn/{guide.pathTitle}/about">About</a></li>
    <li><a href="/learn/{guide.pathTitle}/projects">Projects</a></li>
    <li><a href="/learn/{guide.pathTitle}/tutorials">Tutorials</a></li>
  </ul>
</nav>
<style lang='scss'>
  @import "$lib/styles/media-queries.scss";
  nav {
    flex-grow: 0;
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
    padding: 0 1rem;
    z-index: 99;
  }
  img {
    aspect-ratio: 1/1;
    width: 78px;
    position: absolute;
    margin: auto;
    // left: -43px;
    left: 0px;
    top: 0px;
    @include xs { height: 22px; }
  }
  h1 {
    margin: 0;
    padding: 0;
    margin-left: 1rem;
  }
  .icon-wrap {
    padding: 0;
    margin: 0;
    width: 40px;
    aspect-ratio: 1/1;
    overflow: visible;
    background-color: pink;
    // display: flex;
    // justify-content: center;
    // align-items: center;
  }  
</style>
