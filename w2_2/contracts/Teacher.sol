// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

interface IStudent{
    function addScore(uint8 num) external;

    function modifyScore(uint8 num) external;
}

contract Teacher{
    address public owner;
    mapping(string => address) public students;

    event Claim(string indexed name,address indexed at);

    constructor(){
        owner = msg.sender;
    }

    modifier mustOwner{
        require(msg.sender == owner,"You can not modify score!");
        _;
    }

    function claim(string memory student) external {
        students[student] = msg.sender;
        emit Claim(student, msg.sender);
    }

    function addScore(string memory name,uint8 score) external mustOwner{
        address student_address = students[name];
        IStudent student = IStudent(student_address);
        student.addScore(score);
    }

    function modifyScore(string memory name,uint8 score) external mustOwner{
        address student_address = students[name];
        IStudent student = IStudent(student_address);
        student.modifyScore(score);
    }
}