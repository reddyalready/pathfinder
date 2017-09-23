<template>
    <div
            @click.stop=handleClick($event)
            class="square"
            :class=node.type>
    </div>
</template>

<script>
  export default {
    props: {
      node: {
        type: Object,
        required: true
      }
    },
    methods: {
      handleClick: function($event) {
        if($event.ctrlKey || $event.metaKey) {
          this.$emit('setGoal', this.node);
        } else if($event.shiftKey) {
          this.$emit('setStart', this.node);
        } else {
          this.$emit('toggleType', this.node);
        }
      }
    }
  }
</script>

<style>
    .square {
        width: 20px;
        height: 20px;
        display: inline-block;
    }

    .square.open {
        background: lightgrey;
    }

    .square.wall {
        background: black;
    }

    .square.goal {
        background-color: red;
    }

    .square.start {
        background-color: blue;
    }
</style>