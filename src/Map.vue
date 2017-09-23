<template>
    <div>
        <button @click="solve">Run</button>
        <TileRow v-for="(row,index) in grid.rows()" :row=row :key=index
                 v-on:toggleType=toggleType v-on:setGoal=setGoal v-on:setStart=setStart>
        </TileRow>
    </div>
</template>

<script>
  import TileRow from "./TileRow.vue"
  import Grid from "./models/grid"

  export default {
    components: {TileRow},
    props: {
      size: {
        type: Number,
        required: true
      },
      pathfinder: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        grid: new Grid(this.size)
      }
    },
    methods: {
      toggleType(selected) {
        this.grid.toggleType(selected);
      },
      setGoal(selected) {
        this.grid.setGoal(selected);
      },
      setStart(selected) {
        this.grid.setStart(selected);
      },
      solve() {
        this.pathfinder.findPath(this.grid)
      }
    }
  }
</script>