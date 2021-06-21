<script>
  import PrismicDom from 'prismic-dom'
  import Prismic from '@prismicio/client'
  import Client from './client'
  
  const types = [
    {id: "page", name: "Page"},
    {id: "core_concepts_article", name: "Core Concepts Article"},
    {id: "article", name: "Technologies Article"},
    {id: "core_concepts_category", name: "Core Concepts Category"},
    {id: "core_concepts_homepage", name: "Core Concepts Homepage"},
    {id: "homepage", name: "Homepage"},
    {id: "side_navigation", name: "Side Navigation"},
    {id: "layout", name: "Layout"}
  ]

  let selected = types[2].id
  $: predicates = Prismic.Predicates.at('document.type', selected)

  $: promise = Client.query(predicates)
</script>

<h1>Basic Svelte App</h1>

<select bind:value={selected} on:change="{() => console.log(selected)}">
  {#each types as type}
    <option value={type.id}>
      {type.name}
    </option>
  {/each}
</select>

{#await promise}
  <p>Loading...</p>
{:then response}
  <!-- <pre>{JSON.stringify(response,null,2)}</pre> -->
  {#each response.results as result, index}
    <p>{index + 1}. {PrismicDom.RichText.asText(result.data.title || result.data.prismic_display_name)}</p>
  {:else}
    <p>No results!</p>
  {/each}
{:catch error}
  <p>Something went wrong: {error.message}</p>
{/await}