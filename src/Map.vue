<template>
    <div>
        <div v-if="show">
            <div v-for="row in grid.raw" class="tileRow">
                <Tile v-for="node in row" :node=node :key=node.id
                      v-on:toggleType=toggleType v-on:setGoal=setGoal v-on:setStart=setStart>
                </Tile>
            </div>
        </div>
        <span>
            <button @click="solve">Run</button>
            <button @click="reset">Reset</button>
        </span>

    </div>
</template>

<script>
  import Vue from 'vue'
  import Grid from "./models/grid"
  import Tile from "./Tile.vue"

  export default {
    components: {Tile},
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
        grid: new Grid(this.size),
        show: true
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
      rerender() {
        this.show = false;
        this.$nextTick(() => {
          this.show = true;
        })
      },
      solve() {
        this.solution = this.pathfinder.findPath(this.grid);

        this.grid = new Grid(
          this.grid.raw.map((row) => {
            return row.map((node) => {
              node.solution = this.solution[node.id];
              return node;
            })
          })
        );

        this.rerender();
      },
      reset() {
        this.solution = null;
        this.grid = new Grid(this.size);

        this.rerender();
      }
    }
  }
</script>

<style>
    .tileRow {
        height: 20px
    }
</style>