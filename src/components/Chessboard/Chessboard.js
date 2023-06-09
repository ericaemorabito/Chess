import "./chessboard.css";
import Tile from "../Tile/Tile";
import { useRef, useState } from "react";
import Referee from "../Referee/Referee";

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizantalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

const initalBoardState = [];

for (let p = 0; p < 2; p++) {
  const type = p === 0 ? "black" : "white";
  const y = p === 0 ? 7 : 0;
  initalBoardState.push({
    image: `assets/images/${type}-rook.png`,
    x: 0,
    y,
    type: 'ROOK',
    team: `${type}`
  });
  initalBoardState.push({
    image: `assets/images/${type}-rook.png`,
    x: 7,
    y,
    type: 'ROOK',
    team: `${type}`
  });
  initalBoardState.push({
    image: `assets/images/${type}-knight.png`,
    x: 1,
    y,
    type: 'KNIGHT',
    team: `${type}`
  });
  initalBoardState.push({
    image: `assets/images/${type}-knight.png`,
    x: 6,
    y,
    type: 'KNIGHT',
    team: `${type}`
  });
  initalBoardState.push({
    image: `assets/images/${type}-bishop.png`,
    x: 2,
    y,
    type: 'BISHOP',
    team: `${type}`
  });
  initalBoardState.push({
    image: `assets/images/${type}-bishop.png`,
    x: 5,
    y,
    type: 'BISHOP',
    team: `${type}`
  });
}
for (let i = 0; i <= 7; i++) {
  initalBoardState.push({
    image: "assets/images/dark-pawn.png",
    x: i,
    y: 6,
    type: 'PAWN',
    team: 'black'
  });
}
for (let i = 0; i <= 7; i++) {
  initalBoardState.push({
    image: "assets/images/white-pawn.png",
    x: i,
    y: 1,
    type: 'PAWN',
    team: 'white'
  });
}
initalBoardState.push({
  image: "assets/images/black-king.png",
  x: 3,
  y: 7,
  type: 'KING',
  team: 'black'
});
initalBoardState.push({
  image: "assets/images/black-queen.png",
  x: 4,
  y: 7,
  type: 'QUEEN',
  team: 'black'
});
initalBoardState.push({
  image: "assets/images/white-king.png",
  x: 4,
  y: 0,
  type: 'KING',
  team: 'white'
});
initalBoardState.push({
  image: "assets/images/white-queen.png",
  x: 3,
  y: 0,
  type: 'QUEEN',
  team: 'white'
});

const Chessboard = () => {
  const [activePiece, setActivePiece] = useState(null)
  const [gridX, setGridX] = useState(0);
  const [gridY, setGridY] = useState(0);
  const [pieces, setPieces] = useState(initalBoardState);
  const chessboardRef = useRef(null);
  const referee = new Referee();

  function grabPiece(e) {
    const element = e.target;
    const chessboard = chessboardRef.current;
    if (element.classList.contains("chess-piece") && chessboard) {
      const gridX = Math.floor((e.clientX - chessboard.offsetLeft) / 100);
      const gridY = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100));
      setGridX(gridX);
      setGridY(gridY);
      const x = e.clientX - 50;
      const y = e.clientY - 50;
      element.style.position = "absolute";
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;

      setActivePiece(element);
    }
  }

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

  function dropPiece(e) {
    const chessboard = chessboardRef.current;
    if (activePiece && chessboard) {
      const x = Math.floor((e.clientX - chessboard.offsetLeft) / 100);
      const y = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100));

      setPieces((value) => {
        const pieces = value.map((p) => {
          if (p.x === gridX && p.y === gridY) {
            // Check is move is valid
            const validMove = referee.isValidMove(gridX, gridY, x, y, p.type, p.team);
            // is move is valid - set locations
            if (validMove){
              p.x = x;
              p.y = y;
            } else {
              activePiece.style.position = 'relative';
              activePiece.style.removeProperty('top');
              activePiece.style.removeProperty('left');
            }
          }
          return p;
        });
        return pieces;
      });
      setActivePiece(null);
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
