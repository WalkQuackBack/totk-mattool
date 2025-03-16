<script lang="ts">
    import { activeListItem } from '../mainStore.ts'
    import CopyBtn from './CopyBtn.svelte';
    const { data } = $props();
</script>

<div class="container list">
    <hr />
    <h1>Material details</h1>
    {#if $activeListItem > -1}
        <span class="sectionHeader">Name</span>
        <span class="longData">{data[$activeListItem].item.materialGroup}</span>
        <span class="sectionHeader">BFRES file name</span>
        <span class="longData">{data[$activeListItem].item.bfresKey}</span>
        <ul class="list">
            <span class="sectionHeader">Textures</span>
            {#each data[$activeListItem].item.textures as texture}
                <li class="texture">
                    {texture}
                    <CopyBtn label='Copy texture name' value={texture} />
                </li>
            {/each}
        </ul>
    {:else} 
        <span>
            Select a material to view details
        </span>
    {/if}
</div>

<style>
    .list {
        display: flex;
        flex-direction: column;
        gap: 8px;
        justify-content: stretch;

        margin: 0;
        padding: 0;
    }

    li.texture {
        list-style: none;
        overflow: hidden;
        word-break: break-all;

        padding: 8px 12px;
        border-radius: 10px;
        background-color: var(--md-sys-color-surface-container);

        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    h1 {
        margin-block: 0rem;
    }

    .longData {
        line-break: anywhere;
        overflow: hidden;
    }

    .sectionHeader {
        font-weight: 500;
        font-size: 0.875rem;
        margin-block: 0.1rem;
        color: var(--md-sys-color-primary)
    }
</style>