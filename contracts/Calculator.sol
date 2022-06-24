//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Calculator {
    using SafeMath for uint;

    function addition(uint a, uint b) public pure returns(uint) {
        return a.add(b);
    }
    function subtraction(uint a, uint b) public pure returns(uint) {
        return a.sub(b);
    }
    function multiplication(uint a, uint b) public pure returns(uint) {
        return a.mul(b);
    }
    function division(uint a, uint b) public pure returns(uint) {
        return a.div(b);
    }
}