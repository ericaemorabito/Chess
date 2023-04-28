import "./chessboard.css";
import Tile from "../Tile/Tile";
import { act } from "react-dom/test-utils";
import { useRef } from "react";

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizantalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

const pieces = [];

for (let p = 0; p < 2; p++) {
  const type = p === 0 ? "black-" : "white-";
  const y = p === 0 ? 7 : 0;
  // ROOKS
  pieces.push({
    image: `assets/images/${type}rook.png`,
    x: 0,
    y,
  });
  pieces.push({
    image: `assets/images/${type}rook.png`,
    x: 7,
    y,
  });

  // KNIGHTS
  pieces.push({
    image: `assets/images/${type}knight.png`,
    x: 1,
    y,
  });
  pieces.push({
    image: `assets/images/${type}knight.png`,
    x: 6,
    y,
  });

  //BISHOPS
  pieces.push({
    image: `assets/images/${type}bishop.png`,
    x: 2,
    y,
  });
  pieces.push({
    image: `assets/images/${type}bishop.png`,
    x: 5,
    y,
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
  // REFEREE
  const chessboardRef = useRef(null);

  // ACTIVE PIECE
  let activePiece = null;

  // GRAB PIECE
  function grabPiece(e) {
    const element = e.target;
    if (element.classList.contains("chess-piece")) {
      const x = e.clientX - 50;
      const y = e.clientY - 50;
      element.style.position = "absolute";
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;

      activePiece = element;
    }
  }

  // MOVE PIECE
  function movePiece(e) {
    const chessboard = chessboardRef.current;

    if (activePiece && chessboard) {
      const minX = chessboard.offsetLeft - 25;
      const minY = chessboard.offsetTop - 25;
      const maxX = chessboard.offsetLeft + chessboard.clientWidth - 75;
      const maxY = chessboard.offsetTop + chessboard.clientHeight - 75;
      const x = e.clientX - 50;
      const y = e.clientY - 50;
      activePiece.style.position = "absolute";

      activePiece.style.left = `${x}px`;
      activePiece.style.top = `${y}px`;

      //If x is smaller than minimum amount
      if (x < minX) {
        activePiece.style.left = `${minX}px`;
      }
      //If x is bigger than maximum amount
      else if (x > maxX) {
        activePiece.style.left = `${maxX}px`;
      }
      //If x is in the constraints
      else {
        activePiece.style.left = `${x}px`;
      }

      //If y is smaller than minimum amount
      if (y < minY) {
        activePiece.style.top = `${minY}px`;
      }
      //If y is bigger than maximum amount
      else if (y > maxY) {
        activePiece.style.top = `${maxY}px`;
      }
      //If y is in the constraints
      else {
        activePiece.style.top = `${y}px`;
      }
    }
  }

  // DROP PIECE
  function dropPiece(e) {
    // RESET ACTIVE PIECE
    if (activePiece) {
      activePiece = null;
    }
  }

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

      board.push(<Tile key={`${i},${j}`} number={number} image={image} />);
    }
  }

  return (
    <div
      id="chessboard"
      onMouseDown={(e) => grabPiece(e)}
      onMouseMove={(e) => movePiece(e)}
      onMouseUp={(e) => dropPiece(e)}
      ref={chessboardRef}
    >
      {board}
    </div>
  );
};

export default Chessboard;
