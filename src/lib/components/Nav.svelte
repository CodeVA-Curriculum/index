<script lang='ts'>
  import LogInButton from '$lib/components/LogInButton.svelte'
  import { dashboardURL } from '$lib'
  import { page } from '$app/state'
  let { session, user} = $props();
  let url = page.url.toString()
</script>
{#snippet navLink(text:string, href:string)}
  <a href="{href}" class={url.includes(href) ? "active": ""}>{text}</a>
{/snippet}
<nav>
  <ul>
    <li><img alt="CodeVA logo" src="/images/wordmark.png"></li>
  </ul>
  <ul>
    <li><a href="/teach">Teach</a></li>
    <li>
      {@render navLink("Learn", "/learn")}
    </li>
    <li><a href="/teach/library">Library</a></li>
  </ul>
</nav>

<style lang='scss'>
  @use "$lib/styles/media-queries.scss";
  nav {
    flex-grow: 0;
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
    padding: 0 1rem;
    z-index: 99;
  }
  img {
    width: auto;
    height: 36px;
    @include media-queries.xs { height: 22px; }
  }
  .active {
    text-decoration: underline;
    
  }
</style>
