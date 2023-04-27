import "./chessboard.css";
import Tile from "../Tile/Tile";

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];

const horizantalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

const Chessboard = () => {
  let board = [];

  for (let j = verticalAxis.length - 1; j >= 0; j--) {
    for (let i = 0; i < horizantalAxis.length; i++) {
      const number = i + j + 2;
      board.push(<Tile number={number}/>)
    }
  }

  return <div id="chessboard">{board}</div>;
};

export default Chessboard;
