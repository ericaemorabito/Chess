import "./chessboard.css";
import Tile from "../Tile/Tile";

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizantalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

const pieces = [];

for(let p = 0; p <2; p++) {
  const type = p === 0 ? 'black-' : 'white-';
  const y = p === 0 ? 7 : 0;
  // ROOKS
  pieces.push({
    image: `assets/images/${type}rook.png`,
    x: 0,
    y
  });
  pieces.push({
    image: `assets/images/${type}rook.png`,
    x: 7,
    y
  });
  
  // KNIGHTS
  pieces.push({
    image: `assets/images/${type}knight.png`,
    x: 1,
    y
  });
  pieces.push({
    image: `assets/images/${type}knight.png`,
    x: 6,
    y
  });

  //BISHOPS
  pieces.push({
    image: `assets/images/${type}bishop.png`,
    x: 2,
    y
  });
  pieces.push({
    image: `assets/images/${type}bishop.png`,
    x: 5,
    y
  });
}
// Dark Pawns inital position
for (let i = 0; i <= 7; i++) {
  pieces.push({
    image: "assets/images/dark-pawn.png",
    x: i,
    y: 6,
  });
}
// White Pawns inital position
for (let i = 0; i <= 7; i++) {
  pieces.push({
    image: "assets/images/white-pawn.png",
    x: i,
    y: 1,
  });
}
// Dark King & Queen  inital position
pieces.push({
  image: "assets/images/black-king.png",
  x: 3,
  y: 7,
});
pieces.push({
  image: "assets/images/black-queen.png",
  x: 4,
  y: 7,
});
// Light King & Queen  inital position
pieces.push({
  image: "assets/images/white-king.png",
  x: 4,
  y: 0,
});
pieces.push({
  image: "assets/images/white-queen.png",
  x: 3,
  y: 0,
});

const Chessboard = () => {
  let board = [];

  for (let j = verticalAxis.length - 1; j >= 0; j--) {
    for (let i = 0; i < horizantalAxis.length; i++) {
      const number = i + j + 2;
      let image = undefined;

      pieces.forEach((piece) => {
        if (piece.x === i && piece.y === j) {
          image = piece.image;
        }
      });

      board.push(<Tile number={number} image={image} />);
    }
  }

  return <div id="chessboard">{board}</div>;
};

export default Chessboard;
