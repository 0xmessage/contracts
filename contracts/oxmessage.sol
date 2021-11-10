//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract oxmessage {
    struct Message {
        uint256 timestamp; // set in contract
        address sender;
        address receiver;
        string content; // uri of the message json
    }

    mapping(address => mapping(uint256 => Message)) private _sentMessages;
    mapping(address => uint256) private _sentMessagesCount;

    mapping(address => mapping(uint256 => Message)) private _receivedMessages;
    mapping(address => uint256) private _receivedMessagesCount;

    event MessagePosted(
        address indexed from,
        address indexed to,
        uint256 receiverIndex
    );

    function send(address to, string memory content) external {
        Message memory message = Message(
            block.timestamp,
            msg.sender,
            to,
            content
        );
        message.timestamp = block.timestamp;
        // add to send and receive mappings, update counts
        uint256 idx = _sentMessagesCount[msg.sender];
        _sentMessages[msg.sender][idx] = message;
        _sentMessagesCount[msg.sender] = idx + 1;

        idx = _receivedMessagesCount[to];
        _receivedMessages[to][idx] = message;
        _receivedMessagesCount[to] = idx + 1;

        emit MessagePosted(msg.sender, to, idx);
    }

    function receivedCount(address addr) external view returns (uint256) {
        return _receivedMessagesCount[addr];
    }

    function receivedMessage(address addr, uint256 idx)
        external
        view
        returns (Message memory)
    {
        return _receivedMessages[addr][idx];
    }

    function sentCount(address addr) external view returns (uint256) {
        return _sentMessagesCount[addr];
    }

    function sentMessage(address addr, uint256 idx)
        external
        view
        returns (Message memory)
    {
        return _sentMessages[addr][idx];
    }
}
