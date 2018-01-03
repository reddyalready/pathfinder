<template>
    <div id="app">
        <h1>Pathfinder</h1>
        <Map :size=size :pathfinder=pathfinders.aStar></Map>
        <p class="small">Click = Set/Unset Walls</p>
        <p class="small">Ctrl + Click = Set Goal</p>
        <p class="small">Shift + Click = Set Start</p>
    </div>
</template>

<script>
  import Map from './Map.vue'
  import AStar from './algorithms/aStar'

  export default {
    name: 'app',
    components: {Map},
    data() {
      return {
        size: 20,
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

    .small {
        font-size: 0.8em;
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
