<script lang="ts">
    let { label = 'Copy text', value } = $props();
    let wasPressed = $state(false);

    function onClick(event: MouseEvent) {
        wasPressed = true
        navigator.clipboard.writeText(value)

        setTimeout(() => {
            wasPressed = false
        }, 1000);
    }
</script>

<button onclick={onClick} title={label} aria-label={label}>
    <div hidden={wasPressed}>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z"/></svg>
    </div>
    <div hidden={!wasPressed}>
        
<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
    </div>
</button>

<style>
    button {
        width: 40px;
        height: 40px;
        padding: 0;
        margin: 0;
        margin-inline-start: 4px;
        position: relative;
        appearance: none;
        background: none;
        border: none;
        color: inherit;

        vertical-align: sub;

        border-radius: 50%;

        outline-offset: 0;

        display: flex;
        align-items: center;
        justify-content: center;
        
        cursor: pointer;

        &::after {
            border-radius: inherit;
            content: "";
            inset: 0;
            pointer-events: all;
            position: absolute;
    
            background: currentColor;
            opacity: 0;

            will-change: opacity;

            transition: opacity 50ms linear;
        }

        &:hover::after {
            opacity: var(--md-sys-state-opacity-hover);
        }

        &:active::after {
            opacity: var(--md-sys-state-opacity-pressed);
        }
    }
</style>