<div class='container'>
  <section>
    <h1>Tools</h1>
    <p>Use the tools below to help support your work integrating computing into your teaching! Each tool has been custom-made to support the particular challenges of computer science curriculum planning. Check them out! We hope you find them to be as useful for you as they are for us.</p>
  </section>
  <section>
    <article>
      <div class='thumbnail'>
        <img src="/pacing-guide.png" alt="The pacing guide creator tool, a table with editable cells" />
      </div>
      
      <div class='article-body'>
        <h2>Pacing Guide Creator</h2>
        <p>This tool is designed to help you create pacing guides that align to or integrate with computer science standards. Create a table of your units or lessons and the standards they align to, and get suggested lessons, activities, and resources to integrate related computer science topics!</p>
        <div class='button-wrap'>
          <a href="/tools/pacing-guide-creator" role="button">Launch the Tool</a>
        </div>
      </div>
    </article>
    <p class='more'><i>More coming soon!</i></p>
  </section>

</div>

<style lang='scss'>
  @use "$lib/styles/theme.scss";
  a {
    background-color: theme.$navy;
  }
  article {
    display: flex;
    gap: 1.5rem;
    .thumbnail {
    }
    .article-body {
      flex-basis: 66%;
      display: flex;
      flex-direction: column;
    }
    .button-wrap {
      flex-grow: 1;
      display: flex;
      flex-direction: row;
      justify-content: left;
      align-items: center;
      a {
        width: 100%;
      }
    }
  }
  .more {
    margin-top: 3rem;
  }
</style>
