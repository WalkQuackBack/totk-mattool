<script lang="ts">
    const { children, checked, id, onChanged } = $props();
</script>

<div class='container'>
    <input onchange={onChanged} checked={checked} type="checkbox" name={id} id={id} class="input">
    <label for={id}>
        <div class="button">
            <div class="icon" aria-hidden="true">
                <svg class="checkmark" viewBox="0 0 18 18" aria-hidden="true">
                    <path d="M6.75012 12.1274L3.62262 8.99988L2.55762 10.0574L6.75012 14.2499L15.7501 5.24988L14.6926 4.19238L6.75012 12.1274Z"></path>
                </svg>
            </div>
            <span class="label">
                {@render children?.()}
            </span>
        </div>
    </label>
</div>

<style>
    .container {
        position: relative;

        border-radius: 8px;
        height: 32px;
        cursor: pointer;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        
        outline: 1px solid var(--md-sys-color-outline);
        outline-offset: -1px;

        user-select: none;
        width: fit-content;
        contain: layout;

        &::before {
            border-radius: inherit;
            content: "";
            inset: 0px;
            pointer-events: none;
            position: absolute;
    
            z-index: -1;    
        }
    
        &::after {
            border-radius: inherit;
            content: "";
            inset: 0px;
            pointer-events: none;
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
        
        &:has(*:checked) {
            outline-width: 0;
            background-color: var(--md-sys-color-secondary-container);
            color: var(--md-sys-color-on-secondary-container);
        }
    }

    label {
        display: inline-flex;
        border-radius: inherit;
        cursor: inherit;
        height: 100%;
    }

    .button {
        align-items: baseline;
        border-radius: inherit;
        display: flex;
        outline: none;
        padding: 0px;
        position: relative;
        text-decoration: none;

        min-width: 0px;
        padding-inline-start: 16px;
        padding-inline-end: 16px;

        color: inherit;
        font-family: inherit;
    }

    .icon {
        align-self: center;
        display: flex;
        fill: currentcolor;
        position: relative;

        display: none;
        & > svg {
            height: 18px;
            width: 18px;
            margin-inline-end: 8px;
        }
    }

    .label {
        align-items: center;
        color: inherit;
        display: flex;
        font-family: inherit;
        font-size: 0.875rem;
        font-weight: 500;
        height: 100%;
        line-height: 1.25rem;
        overflow: hidden;
        user-select: none;
    }

    .input {
        position: absolute;
        width: 0;
        height: 0;
        opacity: 0;
    }
    
    .input:checked + label .button {
        padding-inline-start: 8px;
    }

    .input:checked + label .icon {
        display: flex;
    }
</style>
