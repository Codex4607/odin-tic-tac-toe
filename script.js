function createPlayer(name,marker){
  return {name, marker};
}


const gameBoard=(function(){
  let board=["-","-","-",
               "-","-","-",
               "-","-","-"];

  const winningPositions=[[0,1,2],[3,4,5],[6,7,8],
                          [0,3,6],[1,4,7],[2,5,8],
                          [0,4,8],[2,4,6]];
  
  const playMove=(index,marker)=>{
      board[index]=marker;
  }
  const validMove=(index)=>{
    if(index>=0 && index<9 && board[index]=="-"){
      return true;
    }
    return false;
  }
  const checkWinner=()=>{
    for(const state of winningPositions){
      if(board[state[0]]!="-" && board[state[0]]==board[state[1]] && board[state[1]]==board[state[2]]){
        return board[state[0]];
      }
      
    }
    return "-";
  }
  const resetBoard=()=>{
    board=["-","-","-",
               "-","-","-",
               "-","-","-"];
  }
  const displayBoard=()=>{
    let output="";
    for(let i=0;i<3;i++){
      for(let j=3*i;j<(3*i)+3;j++){
        output+=board[j]+" ";
      }
      output+="\n"
    }

    return output;
  }

  return {playMove,checkWinner,resetBoard, displayBoard, validMove};

})();

const gameController=(function(){
  const Player1= createPlayer("Player 1", "x");
  const Player2= createPlayer("Player 2", "o");
  let moveCount=0;
  let gameOver=false;
  let currPlayer=Player1;

  const reset=()=>{
    gameBoard.resetBoard();
    moveCount=0;
    gameOver=false;
    currPlayer=Player1;
  }
  const playTurn=(index)=>{
    const marker=currPlayer.marker;
    if(!gameOver){
      if(gameBoard.validMove(index) && moveCount<9){
        gameBoard.playMove(index, marker);
        moveCount++;
        if(gameBoard.checkWinner()=="-" && moveCount<9){
        currPlayer=currPlayer==Player1?Player2:Player1;
        }
        else{
        gameOver=true;
        }
      }
      else{
        console.log("Invalid move");
      }
      console.log(gameBoard.displayBoard());
    }
    
    if(gameOver){
      const winner= gameBoard.checkWinner();
      if(winner=="-"){
        console.log("It's a Tie!");
        reset();
      }
      else if(winner=="x"){
        console.log(`${Player1.name} wins!`);
        console.log(gameBoard.displayBoard());
        reset();

      }
      else if(winner=="o"){
        console.log(`${Player2.name} wins!`);
        console.log(gameBoard.displayBoard());
        reset()
      }
    }
    
    
    
  }

  return {playTurn};

})();



