<script lang='ts'>
  import type { PageProps } from './$types'
  import LoginDialogue from '$lib/components/LoginDialogue.svelte'
  let { data, form }:PageProps = $props()

  // This page will never appear to a logged in user due to logic in ./+page.server.ts
  let emailConfirm = $state(false)
</script>
<div class='container'>
  {#if form?.confirm}
    <section class='confirmation'>
      <p>Is this right?</p>
      <form action="/login?/submit" method="POST">
        <input style="display:none;" name="codeId" id="codeId" type="text" value={form.confirm.codeId} >
        <input style="display:none;" name="alias" id="alias" type="text" value={form.confirm.alias} >
        <fieldset class='grid'>
          <label for="confirm_email">
            <input bind:checked={emailConfirm} name="confirm_email" id="confirm_email" type="checkbox">
            {form.confirm.checkText}
          </label>
        </fieldset>
        <fieldset class='grid'>
          <input name="avatar" id="avatar" type="text" >
          <input disabled={!emailConfirm} type="submit" value="Log In" >
        </fieldset>
      </form>
    </section>
  {:else}
  <section>
  <LoginDialogue session={data.session} />
  </section>
  {/if}
</div>

<style lang='scss'>
  .confirmation {
    max-width: 800px;
    margin:  4rem auto;
  }
  p { font-style: italic; font-size: 1.5rem; color: gray; }
  label { font-size: 4rem; }
  input[type="checkbox"] {
    height: 3rem;
    width: 3rem;
    font-size: 3rem;
  }
</style>
