<script lang="ts">
  import "../app.css";
  import "@tschk/flowtoken-svelte/styles.css";
  import "@tschk/svelte-streamdown/styles.css";

  let { children } = $props();
</script>

{@render children()}
