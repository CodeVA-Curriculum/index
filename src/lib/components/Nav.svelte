<script>
    import {base} from '$app/paths';
    import CodeVA from '$lib/assets/CodeVA_Logo_Secondary.png'
    // import Twine from '$lib/assets/twine.svg';
    
    let burger = {
        active: false
    }
    function toggleMenu() {
        burger.active = !burger.active;
    }
</script>

<nav class='navbar'>
    <div class='navbar-brand logo'>
        <a class="navbar-item" href="{base}/">
            <img alt="The CodeVA Logo" src="{CodeVA}" height="28">
        </a>
        <button on:click={toggleMenu} class="navbar-burger {burger.active ? 'is-active' : ''}" aria-label="menu" aria-expanded="{burger.active}" data-target="nav-menu">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
        </button>
    </div>
    <div id='nav-menu' class="navbar-menu {burger.active ? 'is-active' : ''}">
        <div class="navbar-end">
            <a class="navbar-item"
                href='{base}/'
            >
                Home
            </a>
            <a class="navbar-item"
                href='{base}/library'
            >
                Search Our Library
            </a>
            <!-- <a class='navbar-item'
                href="{base}/sols"
            >
                Learn About the CS SOLs
            </a> -->
            <!-- <a target="_blank" class='navbar-item' href='https://goopenva.org/profile/18746'>
                GoOpenVA
            </a> -->
            <a class="navbar-item"
                href='{base}/contact'
            >
                Contact
            </a>
            <div class='navbar-item'>
                <a class='button is-primary' href='https://app.hubspot.com/payments/purchase/hscs_d16qUamtR7hEt0Q5avDzgfGx4fKcRmYMTwP5jTC0T6hbnt1Bc8SpNR0dMBlPayR6?referrer=CMS_MODULE_NEWTAB'>
                    Donate!
                </a>
            </div>
        </div>
    </div>
</nav>

<style lang='scss'>
    @import '../../variables.scss';
    nav {
        border-bottom: 1px;
        border-color: whitesmoke;
        border-bottom-style: solid;
        background-color: $light-blue;
    }
</style>