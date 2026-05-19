function createPlayer(name,marker){
  return {name, marker};
}

const xIcon=`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`;

const oIcon=`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-icon lucide-circle"><circle cx="12" cy="12" r="10"/></svg>`;

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
  const Player1= createPlayer("Player 1", xIcon);
  const Player2= createPlayer("Player 2", oIcon);
  let moveCount=0;
  let gameOver=false;
  let currPlayer=Player1;
  let currState="Player 1's Move"
  const getCurrentPlayer=()=>{
    return currPlayer;
  }
  const getState=()=>{
    return currState;
  }
  const reset=()=>{
    gameBoard.resetBoard();
    moveCount=0;
    gameOver=false;
    currPlayer=Player1;
    currState="Player 1's Move";
  }


  const playTurn=(index)=>{
    if(!gameBoard.validMove(index)||gameOver){
      return false;
    }
      gameBoard.playMove(index, currPlayer.marker);
      moveCount++;
      if(gameBoard.checkWinner()=="-" && moveCount<9){
      currPlayer=currPlayer==Player1?Player2:Player1;
      currState=currPlayer==Player1?"Player 1's Move":"Player 2's Move";
      }

      else{
      gameOver=true;
      const winner= gameBoard.checkWinner();
      if(winner=="-"){
        currState="It's a Tie";

      }
      else if(winner==xIcon){
        currState=`${Player1.name} wins!`;

      }
      else if(winner==oIcon){
        currState=`${Player2.name} wins!`;
      }
    }
    return true;
    };

  return {playTurn, reset, getCurrentPlayer, getState};

})();


const boxes=Array.from(document.querySelectorAll(".box"));

for(const box of boxes){
  box.addEventListener("click", (event)=>{
    const player=gameController.getCurrentPlayer();
    const successful= gameController.playTurn(Number(event.target.id)-1);
    if(successful){
      box.innerHTML=player.marker;
    }
    state.textContent = gameController.getState();
  })
}
const reset=document.querySelector(".reset");
  reset.addEventListener("click",(event)=>{
    gameController.reset();
    for(const box of boxes){
      box.innerHTML="";
    }
    state.innerHTML=gameController.getState();
  });
const state=document.querySelector(".state");

state.innerHTML=gameController.getState();





