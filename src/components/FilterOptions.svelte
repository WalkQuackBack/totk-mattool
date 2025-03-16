<script lang="ts">
    import FilterChip from './FilterChip.svelte';
    import { materialFilter } from '../mainStore'

    const { search } = $props()

    const searchParams = new URLSearchParams(search)

    const checked_Alb =      'true' === searchParams.get('Alb');
    const checked_Nrm =      'true' === searchParams.get('Nrm');
    const checked_Spm =      'true' === searchParams.get('Spm');
    const checked_Emc =      'true' === searchParams.get('Emc');
    const checked_Emm =      'true' === searchParams.get('Emm');
    const checked_EmmMsk =   'true' === searchParams.get('EmmMsk');
    const checked_Gn0 =      'true' === searchParams.get('Gn0');
    const checked_Gn1 =      'true' === searchParams.get('Gn1');
    const checked_Gn2 =      'true' === searchParams.get('Gn2');
    const checked_Gn3 =      'true' === searchParams.get('Gn3');
    const checked_Gn4 =      'true' === searchParams.get('Gn4');
    const checked_Gn5 =      'true' === searchParams.get('Gn5');
    const checked_AO =       'true' === searchParams.get('AO');
    const checked_Ind =      'true' === searchParams.get('Ind');

    function onChangedGeneric(event: Event) {
        const target = event.target as HTMLInputElement
        let conv = materialFilter.get()
        // TODO: fixme
        // @ts-ignore
        conv[target.id] = target.checked
        materialFilter.set(
            conv
        )
    }
</script>

<div class="container">
    <!-- <FilterChip checked={false} onChanged={onChangedGeneric} id="restrictedSearch">
        Restricted search
    </FilterChip>
    <hr /> -->
    <div class="wrap">
        <FilterChip checked={checked_Alb} onChanged={onChangedGeneric} id="Alb">
            Alb
        </FilterChip>
        <FilterChip checked={checked_Nrm} onChanged={onChangedGeneric} id="Nrm">
            Nrm
        </FilterChip>
        <FilterChip checked={checked_Spm} onChanged={onChangedGeneric} id="Spm">
            Spm
        </FilterChip>
        <div class="wrap">
        <FilterChip checked={checked_Emc} onChanged={onChangedGeneric} id="Emc">
            Emc
        </FilterChip>
        <FilterChip checked={checked_Emm} onChanged={onChangedGeneric} id="Emm">
            Emm
        </FilterChip>
        <FilterChip checked={checked_EmmMsk} onChanged={onChangedGeneric} id="EmmMsk">
            EmmMsk
        </FilterChip>
    </div>
    </div>
    <hr />
    <div class="wrap">
        <FilterChip checked={checked_Gn0} onChanged={onChangedGeneric} id="Gn0">
            Gn0
        </FilterChip>
        <FilterChip checked={checked_Gn1} onChanged={onChangedGeneric} id="Gn1">
            Gn1
        </FilterChip>
        <FilterChip checked={checked_Gn2} onChanged={onChangedGeneric} id="Gn2">
            Gn2
        </FilterChip>
        </div>
        <div class="wrap">
        <FilterChip checked={checked_Gn3} onChanged={onChangedGeneric} id="Gn3">
            Gn3
        </FilterChip>
        <FilterChip checked={checked_Gn4} onChanged={onChangedGeneric} id="Gn4">
            Gn4
        </FilterChip>
        <FilterChip checked={checked_Gn5} onChanged={onChangedGeneric} id="Gn5">
            Gn5
        </FilterChip>
    </div>
    <hr />
    <div class="wrap">
        <FilterChip checked={checked_AO} onChanged={onChangedGeneric} id="AO">
            AO
        </FilterChip>
        <FilterChip checked={checked_Ind} onChanged={onChangedGeneric} id="Ind">
            Ind
        </FilterChip>
    </div>
</div>

<style>
    .container {
        gap: 6px;
        display: flex;
        flex-direction: column;
        
    }
    .wrap {
        flex-wrap: wrap;
        display: flex;
        flex-direction: row;
        flex-shrink: 1;
        gap: 4px;
        min-width: min-content;
    }
</style>