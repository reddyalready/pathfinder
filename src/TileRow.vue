<template>
    <div>
        <square v-for="node in row" :node=node :key=node.id
                v-on:toggleType=toggleType v-on:setGoal=setGoal v-on:setStart=setStart>
        </square>
    </div>
</template>

<script>
  import Square from "./Tile.vue"

  export default {
    components: {Square},
    props: {
      row: {
        type: Array,
        required: true
      }
    },
    methods: {
      toggleType: function(square) {
        this.$emit('toggleType', square)
      },
      setGoal: function(square) {
        this.$emit('setGoal', square)
      },
      setStart: function(square) {
        this.$emit('setStart', square)
      }
    }
  }
</script>