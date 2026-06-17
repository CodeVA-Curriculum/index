<script lang='ts'>
  import { enhance } from '$app/forms';
  import Fa from 'svelte-fa'
  import { faCheck, faPenToSquare, faX , faXmark} from "@fortawesome/free-solid-svg-icons";
  let { title, question } = $props()
  let options = JSON.parse(question.options)
  let answer = $state();
  let buttonClass = $state("")
  let buttonIcon = $state(faPenToSquare)
  let buttonText = $state("Check Answer")
  let correctAnswer = -1
  for(let i=0;i<options.length;i++) {
      if(options[i].correct) {
          correctAnswer = i
      }
  }
  if(question.status.length > 0 && question.status[0].complete) {
    answer = correctAnswer
    buttonClass = 'is-success'
    buttonIcon = faCheck
  }
  function reset() {
    console.log("resetting")
    answer = null
    buttonClass = ''
    buttonText = "Check Answer"
    buttonIcon = faPenToSquare
  }
  function checkAnswer() {
    console.log("Checking answer...")
      // <input style="display: none;" type="text" name="complete" id="complete" value={correctAnswer == answer} />
      // <input style="display: none;" type="text" name="answer" id="answer" value={answer} />
      // <input style="display: none;" type="text" name="questionId" id="questionId" value={question.id} />
      // <input style="display: none;" type="text" name="type" id="type" value="question" />
      fetch("/learn", {
        method: 'POST',
        body: JSON.stringify({
          complete: correctAnswer == answer,
          answer: answer,
          itemId: question.id,
          type: "question"
        }),
  			headers: {
  				'content-type': 'application/json'
  			}
      }).then((res) => {
        console.log("Updated db")
      })
      if(buttonText != 'Check Answer') {
          reset()
      } else if(answer == correctAnswer) {
          buttonClass = 'is-success'
          buttonText = "Correct!"
          buttonIcon = faCheck
      } else {
          buttonClass = 'is-danger'
          buttonText = "Incorrect..."
          buttonIcon = faXmark
      }
  }
</script>
<svelte:options customElement={{
    tag: 'practice-question',
    shadow: 'none',
    props: {
        title: { reflect: true, type: 'String' },
        question: {reflect: true, type: 'Object'}
    }
}} />

<article class='practice-question'>
  <header>
    <p>{title}</p>
  </header>
  <div class='body'>
    {@html question.text}
  </div>
      {#each options as option, i}
      <label class='radio'>
          <input type='radio' name='option' value={i} bind:group={answer}>
          {option.text}
      </label>
      <br>
      {/each}
      {#if (answer || answer == 0) && buttonClass.length > 0 && options[answer].feedback.length > 0}
      <div class='feedback-text {buttonClass}'>
          <!-- <span class='has-text-weight-bold'>Feedback:</span> -->
          {@html question.options[answer].feedback}
      </div>
      {/if}
      <button onclick={checkAnswer} disabled={!answer && answer != 0 } class='button {buttonClass}'>
          <Fa class='mr-2' icon={buttonIcon} />
          {buttonText}
      </button>
</article>
<style lang='scss'>
  @use "$lib/styles/theme.scss";
  .is-success {
    background-color: theme.$highlight-green;
  }
  .is-danger {
    background-color: red;
  }
</style>
