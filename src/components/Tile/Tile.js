import "./tile.css";

const Tile = ({ number, image }) => {
  if (number % 2 === 0) {
    return <div className="tile dark-tile"><img src={image}></img></div>;
  } else {
    return <div className="tile light-tile"><img src={image}></img></div>;
  }
};

export default Tile;
