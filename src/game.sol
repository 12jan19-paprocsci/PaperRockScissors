pragma solidity ^0.5.0;

contract Game {

    address owner;
    string constant doc = "Find out here: https://en.wikipedia.org/wiki/Rock%E2%80%93paper%E2%80%93scissors";

    constructor() public {
        owner == msg.sender;
    }

    /**
     * @title How does it work ?
     * @dev Simple Getter to an explanation about how the game works
     */
    function how_does_it_work() public pure returns (string memory) {
        return doc;
    }
}
