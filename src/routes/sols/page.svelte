<script lang='ts'>
    import { fullGradeNames } from "$lib/utils/metaUtils";
    import { base } from "$app/paths";
    let grades = fullGradeNames.splice(0,9)
    grades.push('High School')

    let selected = 0
</script>

<div class='container'>
    <section class='section'>
        <h1 class='title is-1'>Computer Science in Virginia</h1>
        <p class='block'>In 2017, the Virginia Department of Education published its first iteration of the <a href="TODO:">Virginia Computer Science Standards of Learning</a>. This site is all about those standards, how to teach them, and what resources educators can use to deepen their computer science knowledge.</p>
    </section>
    <section class='section'>
        <div class='columns is-desktop cards'>
            <div class='green column is-7'>
                <h2 class='title is-2'>CS Strands</h2>
                <p class='block'>The Virginia Computer Science SOLs are divided into six "strands", each of which deals with one aspect of computer science.</p>

                <ul class='strands'>
                    <li>
                        <div class='is-flex'>
                            <img alt='' src='/images/empty-hex.png'>
                            <a href='{base}/sols/algorithms-and-programming' class='title is-4'>Algorithms & Programming</a>
                        </div>
                        <!-- <div class='hexagon'></div> -->
                         <p>In this strand, students learn how to code and how to apply computational thinking practices to the process of creating software.</p>
                    </li>
                    <li>
                        <div>
                            <img alt='' src='/images/empty-hex.png'>
                            <a class='title is-4'>Computing Systems</a>
                        </div>
                        <p>In this strand, students learn about how computers work, how to troubleshoot computing systems, and what computers are made of.</p>
                    </li>
                    <li>
                        <div>
                            <img alt='' src='/images/empty-hex.png'>
                            <a class='title is-4'>Cybersecurity</a>
                        </div>
                        <p>In this strand, students learn about how to keep themselves and their data safe in the digital world, including everything from digital hygiene to common cyberattacks and vulnerabilities.</p>
                    </li>
                    <li>
                        <div>
                            <img alt='' src='/images/empty-hex.png'>
                            <a class='title is-4'>Data & Analysis</a>
                        </div>
                        <p>In this strand, students learn about how to use computing tools to collect, analyze, and communicate about data. This strand also encompasses a wide range of data science and AI/machine learning concepts.</p>
                    </li>
                    <li>
                        <div>
                            <img alt='' src='/images/empty-hex.png'>
                            <a class='title is-4'>Impacts of Computing</a>
                        </div>
                        <p>In this strand, students learn about how computing impacts local, national, and global social contexts. Students investigate historical impacts of computing, make predictions about the future of computing, and explore careers in computing.</p>
                    </li>
                    <li>
                        <div>
                            <img alt='' src='/images/empty-hex.png'>
                            <a class='title is-4'>Networks & the Internet</a>
                        </div>
                        <p>In this strand, students learn about how computers access, transmit, and receive data over local networks and the Internet. Students explore how to build networks, common networking issues, and the protocols that make up our modern networking infrastructure.</p>
                    </li>
                </ul>
            </div>
            <div class='yellow column'>
                <h2 class='title is-2'>Tools</h2>
                <p class='block'>Check out some of the tools we've made to assist with planning and implementing the Virginia CS SOLs!</p>
                <ul class='strands'>
                    <li>
                        <div>
                            <img alt='' src='/images/empty-hex.png'>
                            <a class='title is-4'>Pacing Guide Creator</a>
                        </div>
                        <p class='block'>Use this tool to create a CS-integrated pacing guide for your classroom or school!</p>
                    </li>
                    <li>
                        <div>
                            <img alt='' src='/images/empty-hex.png'>
                            <a class='title is-4'>CS SOL Matchmaker</a>
                        </div>
                        <p>Looking for a way to find resources that integrate CS with a particular non-CS standard? Use this tool to match up standards and see lesson plans, units, and other resources that integrate those SOLs into one cohesive learning experience!</p>
                    </li>
                    <li class='mt-5 is-italic'>More tools coming soon!</li>
                </ul>
            </div>
        </div>
    </section>
    <section class='section'>
        <h2 class='title is-2'>More Resources</h2>
        <p class='block'>CodeVA is dedicated to providing computer science education resources that help educators implement high-quality CS teaching in their classrooms. Check out the links below to dive into our resources and start teaching CS!</p>
        <!-- TODO: -->
    </section>
</div>

<style lang='scss'>
    @import '../../variables.scss';
    $gap: 1.5rem;
     .cards > div {
        padding: 2rem;
        border-radius: 1em;
     }
    .green {
        background-color: $light-green;
        margin-right: $gap;
    }
    .yellow {
        background-color: $light-yellow;
        margin-left: $gap;
    }
    // ul.strands > li {
    //     background-image: url('/images/hex-banner.png');
    //     background-size: contain;
    //     background-repeat: no-repeat;
    // }
    .dropdown-wrap > div{
        position: absolute;
        right: 0;
    }
    .grade-select {
        z-index: 99;
        font-size: 12pt;
    }
    .strands > li > div {
        padding-top: 1rem;
        padding-bottom: 0rem;
        display: flex;
        align-items: center;
        position: relative;
        margin-bottom: 0;
        img {
            height: 4em;
            flex-grow: 0;
            z-index: 50;
        }
        a {
            color: white;
            margin-left: -2.5rem;
            background-color: $navy;
            border-radius: 1em;
            padding: 0.75rem 0;
            padding-left: 3rem;
            padding-right: 2rem;
            flex-grow: 1;
            width: 100%;
            &:hover {
                text-decoration: underline;
            }
        }
        // $negative-space: 30px;
        // $positive-space: calc($negative-space / 2);
        // h3:after {
        //     content: "";
        //     width: 0;
        //     height: 0;
        //     background-color: $light-green;
        //     border-top: $negative-space solid $light-green;
        //     border-left: $positive-space solid $navy;
        //     border-bottom: $negative-space solid $light-green;
        //     border-right: $negative-space solid $light-green;
        // }
        // div.hexagon {
        //     /* HTML: <div class="hexagon"></div> */
        //     height: 3em; /* adjust to control the size  */
        //     width: 3em;
        //     aspect-ratio: 1/cos(30deg);
        //     clip-path: polygon(50% -50%,100% 50%,50% 150%,0 50%);
        //     background: $navy;

        // }
    }
    li > p {
        font-size: 12pt;
        border: 6px solid $navy;
        margin-left: 4rem;
        margin-right: 1em;
        margin-top: -1rem;
        padding: 0.5rem;
        border-radius: 0.5em;
    }
</style>