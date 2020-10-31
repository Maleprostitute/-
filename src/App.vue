<template>
  <div id="app">
    <keep-alive :include="$store.state.cachelist">
      <router-view />
    </keep-alive>
  </div>
</template>

<style lang="less">
</style>
