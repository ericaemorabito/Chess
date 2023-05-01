
export default class Referre {
  isValidMove (prevX, prevY, x, y, type, team) {
    console.log('Referre checking the move');
    console.log(`Previous: ${prevX}, ${prevY}`)
    console.log(`Current: ${x}, ${y}`)
    console.log(`Type: ${type}`)
    console.log(`Team: ${team}`)

    
    if(type === 'PAWN'){
      if(team === 'white'){
        if(prevY === 1){
          if(prevX == x && (y - prevY === 1 || y - prevY === 2)){
            console.log('valid move')
            return true;
          }
        } else if (prevX === x && y - prevY === 1){
            return true;
          }
      }
    }
    
    return false;
  }
}