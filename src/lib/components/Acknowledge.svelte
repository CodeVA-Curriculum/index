<script lang='ts'>
    let acknowledged = false;
    let open = true;

    function close() {
        if(acknowledged) {
            open = false;
        }
    }
</script>

<div class="modal {open ? 'is-active' : ''}">
    <div class="modal-background blur"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Acknowledgement</p>
      </header>
      <section class="modal-card-body">
        <!-- <p>Many of the materials on this site were not created in partnership with the VDOE, and were not paid for by state appropriation dollars. These materials do not represent the views of the Virginia Department of Education, and may not align to state or federal curriculum guidelines. All materials are clearly marked to indicate whether or not they were paid for by the state of Virginia.</p> -->

        <p>To access the site, please check the box below and click "Continue":</p>
        <div class='field mt-5'>
            <div class='control is-expanded'>
                <label class="checkbox">
                    <input bind:value={acknowledged} type="checkbox">
                    I acknowledge that the materials on this site do not reflect the views, policies, values, or constitute official guidance from the VDOE unless otherwise indicated.
                </label>
            </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        
        <div class='field'>
            <div class='control'>
                <button on:click={close} class='button is-primary' disabled={!acknowledged}>Continue</button>
            </div>
        </div>
      </footer>
    </div>
  </div>
  

  <style lang='scss'>
    .disclaimer > p {
        font-size: 9pt;
    }
    // label {
    //     font-size: 14pt;
    //     font-weight: bold;
    // }
    // input {
    //     width: 14pt;
    //     height: 14pt;
    // }
    .blur {
        backdrop-filter: blur(20px);
    }
  </style>