
/*
A square in the maze. Type values:
0 = Open
1 = Wall
*/
class Square extends React.Component {

  constructor() {
    super();
    this.state = {
      type: null,
    };
  }

  render() {
    return (
      <button className="square" onClick={() => alert('click')}>
        #Set colour/functionality based on value
      </button>
    )
  }
};
