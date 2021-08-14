<template>
  <div class="locale-switcher select">
    <select v-model="$i18n.locale">
      <option :value="locale.code" v-for="locale in locales" :key="locale.code">
        {{ locale.name }}
      </option>
    </select>
  </div>
</template>

<script>
import { getSupportedLocales } from "@/util/supported-locales";
export default {
  data: () => ({ locales: getSupportedLocales() })
};
</script>
