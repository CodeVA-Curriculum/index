<script>
    import logo from '$lib/assets/CodeVA_Logo_Primary.png';
    import {base} from '$app/paths'
    import Projects from '$lib/components/Projects.svelte'
</script>


<section class='hero is-fullheight-with-navbar'>
    <div class='hero-body'>
        <div class='container has-text-centered'>
            <img alt="The CodeVA logo" src={logo} />
            <h1 class="title my-5">Curriculum Website</h1>
            <div class='buttons is-centered pt-5'>
                <a href='{base}/lessons' class='button is-large is-primary'>Lessons</a>
                <a href='{base}/about' class='button is-large'>About CodeVA</a>
            </div>
        </div>
        
    </div>
</section>

<style>
    img {
        max-width: 80%;
        margin: 0 auto;
        padding-left: 6rem;
    }
    h1 {
        font-size: 36pt;
    }
</style>
