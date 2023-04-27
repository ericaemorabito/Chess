import "./tile.css";

const Tile = ({ number }) => {
  if (number % 2 === 0) {
    return <div className="tile dark-tile"></div>;
  } else {
    return <div className="tile light-tile"></div>;
  }
};

export default Tile;
