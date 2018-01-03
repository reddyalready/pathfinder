<template>
    <div @click.stop=handleClick($event) class="tile" :class=classObject v-bind:style="node.style">
        <span v-if="typeof node.solution !== 'undefined'">{{ node.solution.cost }}</span>
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
    .tile {
      width: 20px;
      height: 20px;
      display: inline-block;
        
    }

    .tile span {
        font-size: 0.7em;
    }

    .tile.open {
      background: lightgrey;
    }

    .tile.wall {
      background: black;
    }

    .tile.goal {
      background-color: red;
    }

    .tile.start {
      background-color: blue;
    }

    .tile.solved {
      background-color: yellow;
    }

    .tile.path {
      background-color: yellowgreen;
    }
</style>