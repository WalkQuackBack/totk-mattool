<script lang="ts">
    import { activeListItem } from '../mainStore.ts'
	import VirtualList from 'svelte-tiny-virtual-list';
    import Fuse from 'fuse.js';
    import CopyBtn from './CopyBtn.svelte';

    let jumpToIndex = $state(-1);

    interface ExtractedMaterial {
        bfresKey: string;
        materialGroup: string;
        textures: string[];
    }
    let { data } = $props();
    let h = $state(500);

    let jumpToTextBox: HTMLInputElement | undefined;

    function onItemClick(event: MouseEvent) {
        activeListItem.set(Number((event.target as HTMLElement).closest('.item')?.getAttribute('data-index')))  
    }
</script>

<!-- <div slot="item" let:index let:style class="item" {style}>
            <div class="start"><span class="title">{data[index].item.key}</span></div>
            <div class="end">
                {#each data[index].item.value.Materials as value}
                    {#each Object.entries(value) as [key2, value2]}
                        {#each Object.entries(value2) as [_, value3]}
                            {#if key2 !== 'Possible Skin Counts'}
                                <span class="texture">
                                    {key2} 
                                </span>  
                            {/if}
                        {/each}
                    {/each}
                {/each}
            </div>
        </div> -->
<div class="container">
    <div class="header">
        <span>{data.length} items</span>
        <div>
            <input bind:this={jumpToTextBox} min="1" max={data.length} type="number" placeholder="Jump to index...">
            <button onclick={() => {
                jumpToIndex = Number(jumpToTextBox?.value)
            }}>Jump to...</button>
        </div>
    </div>
    <div bind:clientHeight={h} class="mainList" style="width: 100%;">
        <VirtualList
            width="100%"
            height={h}
            itemCount={data.length}
            itemSize={52}
            scrollToAlignment='start'
            scrollToBehaviour="smooth"
            scrollToIndex={jumpToIndex-1}
        >
            <button
                slot="item"
                onclick={onItemClick}
                tabindex="0"
                data-index={index}
                let:index
                let:style
                class={['item', ($activeListItem === index) && 'active', (jumpToIndex === index+1) && 'highlighted']}
                {style}
            >
                <div class="start">
                    <span class="title">
                        {data[index].item.materialGroup}
                    </span>
                    <span class="subtext">
                        {data[index].item.bfresKey}
                    </span>
                </div>
                <div class="end">
                    <CopyBtn label='Copy BFRES name' value={data[index].item.bfresKey} />
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M420-308q-8 0-14-5.5t-6-14.5v-304q0-9 6-14.5t14-5.5q2 0 14 6l145 145q5 5 7 10t2 11q0 6-2 11t-7 10L434-314q-3 3-6.5 4.5T420-308Z"/></svg>
                </div>
            </button>
        </VirtualList>

        {#snippet noContent()}
            <p>No results for search query</p>
        {/snippet}

        {#if data.length <= 0}
            {@render noContent()}
        {/if}
    </div>
</div>

<style>
    .container {
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: var(--md-sys-color-surface-container);
        padding: 8px;
        border-radius: 8px;
    }
    
    .mainList {
        border-radius: 8px;
        overflow: hidden;
        flex-grow: 1;
    }
    
    .item {
        gap: 10px;
        display: flex;
        flex-direction: row;
        /* overflow: hidden; */

        appearance: none;
        background: none;
        border: none;
        font: inherit;
        text-align: inherit;
        color: inherit;

        user-select: text;

        justify-content: space-between;
        
        border-bottom: 1px solid var(--md-sys-color-outline-variant);
        &::after {
            border-radius: inherit;
            content: "";
            inset: 0px;
            pointer-events: none;
            position: absolute;

            background-color: var(--md-sys-color-on-surface);

            will-change: opacity;

            opacity: 0;
            z-index: 1;
            transition: opacity 50ms linear;    
        }
        &:hover::after {
            opacity: var(--md-sys-state-opacity-hover);
        }

        &:active::after {
            opacity: var(--md-sys-state-opacity-pressed);
        }

        &:focus-visible {
            outline-offset: -4px;
        }

        &.active {
            color: var(--md-sys-color-on-primary-container);
            background-color: var(--md-sys-color-primary-container);
            /* &::before {
                content: '';
                inset: 0;
                pointer-events: none;
                position: absolute;
                border-radius: inherit;
                --_level: 3;
                --_shadow-color: var(--md-sys-color-shadow);
                box-shadow:
                0px calc(1px*(clamp(0,var(--_level),1)
                    + clamp(0,var(--_level) - 3,1)
                    + 2*clamp(0,var(--_level) - 4,1)))
                    calc(1px*(2*clamp(0,var(--_level),1)
                    + clamp(0,var(--_level) - 2,1)
                    + clamp(0,var(--_level) - 4,1))) 0px var(--_shadow-color);
                    opacity:.3;
            } */
        }

        &.highlighted {
            outline-offset: -2px;
            outline: 2px dotted var(--md-sys-color-primary);
        }
    }

    .start {
        overflow: hidden;
        text-overflow: ellipsis;
        flex-grow: 1;
    }

    .end {
        text-align: end;
        display: flex;
        flex-direction: row;
        padding-inline: 8px;
        align-items: center;
        gap: 4px;
    } 

    /* .texture {
        font-size: 14px;
        margin: 4px;
        padding: 4px 6px;
        background-color: var(--md-sys-color-primary-container);
        color: var(--md-sys-color-on-primary-container);
        border-radius: 999px;
        width: fit-content;
        height: 1rem;
    } */

    span.title, span.subtext {
        position: relative;
        inset-inline-start: 4px;
        inset-block-start: 8px;

        user-select: contain;
    }

    span.title {
        word-break: break-all;
        display: block;
        width: 100%;
        font-weight: 500;
        font-size: 14px;
    }

    span.subtext {
        font-weight: 400;
        font-size: 12px;
        color: var(--md-sys-color-on-surface-variant)
    }
</style>