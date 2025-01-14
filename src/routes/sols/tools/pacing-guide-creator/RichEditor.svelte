<script>
    // prettier-ignore
    let {
        options = {},
        data = '',
        class: class_attr,
    } = $$restProps
    
    function init(node) {
        let off
        import('./quill.js').then(({quill}) => {
            off = quill(node, data, {
                theme: 'snow',
                ...options,
            })
        })
        return {
            destroy() {
                off && off()
            },
        }
    }
</script>
    
<div {...class_attr ? {class: class_attr} : {}}>
    <div class='editor'
        use:init
        on:text-change
    ></div>
</div>

<style>
    .editor {
        height: 10rem;
        /* border-radius: 4px; */
    }
</style>
    