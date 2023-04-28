import "./tile.css";

const Tile = ({ number, image }) => {
  if (number % 2 === 0) {
    return (
      <div className="tile dark-tile">
        {image && <div
          className="chess-piece"
          style={{ background: `url(${image})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}
        ></div>}
      </div>
    );
  } else {
    return (
      <div className="tile light-tile">
        { image && <div
          className="chess-piece"
          style={{ background: `url(${image})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center'  }}
        ></div>}
      </div>
    );
  }
};

export default Tile;
