<template>
    <div>
        <GridRow v-for="(row,index) in grid" :row=row :key=index
                 v-on:toggleType=toggleType v-on:setGoal=setGoal v-on:setStart=setStart>
        </GridRow>
    </div>
</template>

<script>
  import GridRow from "./GridRow.vue"

  export default {
    components: {GridRow},
    props: {
      size: {
        type: Number,
      },
      required: true
    },
    data() {
      const middle = this.size / 2;
      const currentStart = { row: 0, col: middle };
      const currentGoal = { row: middle, col: middle };
      const grid = [];
      for (let rowNumber = 0; rowNumber < this.size; rowNumber++) {
        const row = [];
        for (let colNumber = 0; colNumber < this.size; colNumber++) {
          let type = 'open';
          if(currentGoal.row === rowNumber && currentGoal.col === colNumber) {
            type = 'goal';
          } else if(currentStart.row === rowNumber && currentStart.col === colNumber) {
            type = 'start';
          }
          row[colNumber] = {
            row: rowNumber,
            col: colNumber,
            type
          }
        }
        grid[rowNumber] = row
      }
      return {
        currentStart,
        currentGoal,
        grid
      }
    },
    methods: {
      toggleType(selected) {
        //Left click toggles between open and wall
        if (selected.type === 'open') {
          selected.type = 'wall'
        } else {
          selected.type = 'open'
        }
        this.grid[selected.row].splice(selected.col, 1, selected)
      },
      setGoal(selected) {
        this.swap(this.currentGoal, selected);
      },
      setStart(selected) {
        this.swap(this.currentStart, selected);
      },
      swap(currentPointer, newSelection) {
        //Unset square pointed to by currentPointer
        const currentPointerType = this.grid[currentPointer.row][currentPointer.col].type;
        const newSelectionCurrentType = newSelection.type;
        this.grid[currentPointer.row].splice(currentPointer.col, 1, { row: currentPointer.row, col: currentPointer.col, type: newSelectionCurrentType});
        //Set the new one
        this.grid[newSelection.row].splice(newSelection.col, 1, { row: newSelection.row, col: newSelection.col, type: currentPointerType });
        currentPointer.row = newSelection.row;
        currentPointer.col = newSelection.col;
      }
    }
  }
</script>