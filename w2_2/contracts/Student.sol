// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract Student{
    string public name;
    uint8 public score;
    address public owner;
    address public teacher;

    error overScore();

    event Relationship(address indexed owner,address indexed teacher);
    event updateScore(address indexed owner,uint8 indexed score);
    
    constructor(string memory stude,address teach){
        name = stude;
        teacher = teach;
        owner = msg.sender;
        require(isContract(teacher),"Teacher must be a contract");
        (bool success, ) = teacher.call(abi.encodeWithSignature("claim(string)", name));
        require(success,"claim failure");
        emit Relationship(owner, teach);
    }

    modifier mustTeacher{
        require(msg.sender == teacher,"You are not the teacher!");
        _;
    }

    function isContract(address target) internal view returns(bool){
        uint256 codeSize;
        assembly{
            codeSize := extcodesize(target)
        }
        return codeSize > 0;
    }

    function addScore(uint8 num) external mustTeacher{
        if(score + num > 100){
            revert overScore();
        }
        score += num;
        emit updateScore(owner, score);
    } 

    function modifyScore(uint8 num) external mustTeacher{
        if(num > 100){
            revert overScore();
        }
        score = num;
        emit updateScore(owner, score);
    }
}