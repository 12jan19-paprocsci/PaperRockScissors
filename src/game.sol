pragma solidity >=0.5.4 <0.6.0;

contract PaperRockScissors {

   struct Player {
       uint8 id;
       string name;
       int8 move;
   }

   Player[] players;

   mapping(uint8 => Player) playerReference;
   mapping(uint8 => string) moveNames;

   address owner;

   // modifier onlyOwner {
   //     require(owner == msg.sender, "Screw you hacker!");
   //     _;
   // }

   constructor() public {
       owner = msg.sender;
       setPlayers();
       setMoves();
   }

   function setPlayers() private {
       players.push(Player(0,"Player 1", 0));
       players.push(Player(1,"Player 2", 0));
   }

   function setMoves() private {
       moveNames[0] = "no moves";
       moveNames[1] = "paper";
       moveNames[2] = "rock";
       moveNames[3] = "scissors";
   }

   // function playGame(int8 p1move, int8 p2move) public view returns(string memory) {
   //     int8 result = p1move - p2move;
   //     string memory output;
   //     if (result == 0) {
   //         output = "draw";
   //     } else if (result == -1 || result == 2) {
   //         output = players[0].name;
   //     } else if (result == -2 || result == 1) {
   //         output = players[1].name;
   //     } else {
   //         output = "error";
   //     }
   //     return output;
   // }

   function playGame2(int8 p1move, int8 p2move) public pure returns(int8) {
       int8 result = p1move - p2move;
       if (result == 0) {
           return 0;
       } else if ( result % 3 == 2 ) {
           return 2;
       } else if ( result % 3 == 1) {
           return 1;
       } else {
           return -1;
       }
   }
}
