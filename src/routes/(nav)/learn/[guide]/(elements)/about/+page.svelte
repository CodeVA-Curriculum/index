<script lang='ts'>
  let { data } = $props()
</script>

<div class='container'>
  <section>
  <h1>Using the {data.guide.title}</h1>
  <p>The {data.guide.title} is designed to help you learn how to make things with code. When you first open the guide, you'll see the "map":</p>
  <img src="/images/trail-map.png" />
  <p>Each circle on the map represents a tutorial about a particular skill, concept, or topic that will help you make new things. To view the tutorial, click a circle:</p>
  <img src="/images/open-tutorial.png" />
  <p>From here, you can watch a video about the topic, practice your skills by answering questions or practice prompts, or view the full "textbook"-style version of the tutorial by opening the full tutorial page.</p>
  <p>You can explore topics from the map, but it can be difficult to know how to get started. For some guidance, click the <i>Projects</i> button:</p>
  <img src="/images/projects-button.png" />
  <p>Here, you can see a list of projects you can try. Our recommendation for a "first project" is at the top of the list. Click it, and you'll see all of the relevant tutorials highlighted on the map.</p>
  <p>If you want to work on the project and focus on only the relevant tutorials, open the project:</p>
  <img src="/images/project-page.png" />
  <p>From here, you can interact with a smaller version of the map, as well as load and read tutorials in the project order. Follow the prompts and tutorials in order to create your own version of the project!</p>
  <img src="/images/project-nav.gif"/>
  <p>We plan to add more content continuously as we think of interesting projects for beginners. Check back often!</p>
  </section>
</div>
<style lang='scss'>
  img {
    float: right;
  }
</style>
