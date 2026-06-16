<div class="container">
  <section>
    <h1>Teach Computer Science with Us!</h1>
    <p>Use our <a href="/teach/cs">Computer Science Education Hub</a> (coming soon!) and our <a href="/teach/tools">tools</a> to create high-quality CS learning experiences in your classroom.</p> 
  </section>
  <section>
    <div class='grid'>
      <article>
        <div class='fullwidth-card'>
          <div class='img-wrap'>
          <img src="/images/library.png"/>
          </div>
          <div class='text'>
            <div>
        <h2>Computing Curriculum Library</h2>
          <p>The CodeVA Curriculum Library is a free, open resource with high-quality CS lessons for teachers to explore and use in their classrooms. Check out the library and download, remix, or modify lessons to your heart's content!</p>
          <p>All of our free material is licensed under CC-BY-SA-NC, which means its yours to use as you wish as long as it's not for commercial purposes! Just make sure you credit CodeVA for the materials you adapt from us.</p>
          </div>
          <a href="/teach/library" role="button">Visit the Library</a>
          </div>
        </div>
      </article>
    </div>
    <div class='grid'>
      <article>
        <h2>CS Education Hub</h2>
        <p>Your resource for computer science teaching, containing information about CS standards of learning, vocabulary, lesson ideas, and tools to help you design high quality computing instruction for your students.</p> 
        <a role='button' href="/teach/cs/hub">Coming soon!</a>
      </article>
      <article>
        <h2>CS Integration Tools</h2>
        <p>Our CS integration and curriculum planning tools provide a starting point for teachers working to integrate computing into their instruction, especially in grades K-8. Check them out!</p>
          <a href="/teach/tools" role="button">Open the Toolbox</a>
      </article>
    </div>
  </section>
</div>
<style lang='scss'>
  @use "$lib/styles/theme.scss";
  .fullwidth-card {
    display: flex;
    flex-direction: row;
    .text {
      justify-content: start;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }
    img {
      padding-left: 1rem;
      padding-right: 1rem;
      flex-grow: 0;
    }
  }
  article {
    display: flex;
    flex-direction: column;
  }
  button, a {
    align-items:flex-end;  
    width: 100%;
    margin-top: auto;
    margin-bottom: 0;
    background-color: #0F3760;
  }
  p {
    flex-grow: 1;
    a {
      background-color: white;
    }
  }
</style>
