<template>
    <div id="app">
        <p>Pathfinder</p>
        <Grid :size=size :pathfinder=pathfinders.aStar></Grid>
    </div>
</template>

<script>
  import Grid from './Map.vue'
  import AStar from './algorithms/aStar'

  export default {
    name: 'app',
    components: {Grid},
    data() {
      return {
        size: 10,
        pathfinders: {
          aStar: AStar
        }
      }
    }
  }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
