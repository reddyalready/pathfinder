<template>
    <div @click.stop=handleClick($event) class="square" :class=classObject>
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
    computed: {
      classObject: function() {
        let classes = [this.node.type];
        //If solution exists, add solved class
        if(this.node.hasOwnProperty('solution') && typeof this.node.solution !== 'undefined') {
          classes.push('solved');
          if(this.node.solution.isOnPath) {
            classes.push('path');
          }
        }
        return classes;
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

    .square.solved {
      border: 1px solid black;
    }

    .square.path {
      background-color: yellow;
    }

    .square.solved p {
      display: inline-block;
      vertical-align: top;
    }
</style>