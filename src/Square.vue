<template>
    <div
            @click.stop=handleClick($event)
            class="square"
            :class=classObject>
    </div>
</template>

<script>
  export default {
    props: {
      square: {
        type: Object,
        required: true
      }
    },
    computed: {
      classObject: function() {
        return this.square.type
      }
    },
    methods: {
      handleClick: function($event) {
        if($event.ctrlKey || $event.metaKey) {
          this.$emit('setGoal', this.square);
        } else if($event.shiftKey) {
          this.$emit('setStart', this.square);
        } else {
          this.$emit('toggleType', this.square);
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