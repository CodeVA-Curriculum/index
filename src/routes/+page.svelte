<script lang='ts'>
    import logo from '$lib/assets/CodeVA_Logo_Primary.png';
    import OrbLink from '$lib/components/OrbLink.svelte';
    import {base} from '$app/paths'

    interface Project {
        title:string,
        img:string,
        path:string
    }

    const projects:Project[] = [
        {
            title: 'GoOpenVA Lessons & Resources',
            path: 'https://goopenva.org/profile/18746',
            img: '/images/goopen.png'
        },
        {
            title: "Twine Trail Guide",
            path: `https://curriculum.codevirginia.org/twine-trail-guide`,
            img: '/images/twine.png'
        },
        {
            title: "CodeVA Twine Editor",
            path: 'https://curriculum.codevirginia.org/twine-trail-guide/editor',
            img: '/images/twine.png'
        },
        {
            title: 'Micro:Bit Puzzle Box',
            path: `https://curriculum.codevirginia.org/microbit-lockbox`,
            img: '/images/microbit.webp'
        },
        {
            title: 'Designing Interactive Narratives with Python',
            path: `https://curriculum.codevirginia.org/rath-python`,
            img: '/images/python.png'
        }
    ]
</script>


<section class='hero is-fullheight-with-navbar'>
    <div class='hero-body'>
        <div class='container has-text-centered'>
            <div class='columns is-desktop'>
                <div class='column mr-5 pr-3'>
                    <div class='is-sticky'>
                        <img alt="The CodeVA logo" src={logo} />
                        <h1 class="title my-5">CS Curriculum</h1>
                        <p class='block is-italic'>Free computer science resources for K-12 teachers</p>
                        <div class='buttons is-centered pt-5'>
                            <a href='{base}/library' class='button is-large is-primary'>Search Our Library!</a>
                            <a href='https://codevirginia.org' class='button is-large'>About CodeVA</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</section>

<style>
    @media (max-width: 1024px) {
  /* CSS that should be displayed if width is equal to or less than 800px goes here */
        .is-sticky {
            position: sticky;
            top: 10rem;
            /* width: 100%; */
        }
    }
    
    .is-pink {
        background-color: pink;
    }
    img {
        max-width: 650px;
        margin: 0 auto;
        padding-left: 6rem;
    }
    h1 {
        font-size: 36pt;
    }
</style>


<!-- <script>
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
                <a href='{base}/library' class='button is-large is-primary'>Our Library</a>
                <a href='{base}/about' class='button is-large'>About CodeVA</a>
            </div>
        </div>
        
    </div>
</section>

<style>
    img {
        max-width: 60%;
        margin: 0 auto;
        padding-left: 6rem;
    }
    h1 {
        font-size: 36pt;
    }
</style> -->
