// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.6.2 <0.9.0;

contract Counter{
    uint256 public count;

    function add(uint a) public {
        count += a;
    }
}