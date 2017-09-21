<template>
    <div>
        <square v-for="square in row" :square=square :key=square.id
                v-on:toggleType=toggleType v-on:setGoal=setGoal v-on:setStart=setStart>
        </square>
    </div>
</template>

<script>
  import Square from "./Square.vue"

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