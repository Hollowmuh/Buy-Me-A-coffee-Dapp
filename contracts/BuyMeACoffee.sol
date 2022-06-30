//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BuyMeACoffee {
    address payable public owner;

    event NewMemo (
        address indexed sentFrom,
        uint timeSent,
        string Name,
        string message
    );
    struct Memo {
        address sentFrom;
        uint timeSent;
        string Name;
        string message;
    }

    Memo[] memos;

    constructor() {
        owner = payable(msg.sender);
    }

    function buyCoffee(string memory name, string memory message) public payable {
        require(msg.value > 0, "Can't buy A Coffee with zero ether");
        memos.push(Memo(
            msg.sender,
            block.timestamp,
            name,
            message
        ));
        emit NewMemo (
            msg.sender,
            block.timestamp,
            name,
            message
        );
    }
    function withdrawTips() public{
        require(owner.send(address(this).balance));
    }
    function getMemos() public view returns(Memo[] memory){
        require(msg.sender == owner);
        return memos;
    }
    function balance() public view returns(uint) {
        return address(this).balance;
    }
}