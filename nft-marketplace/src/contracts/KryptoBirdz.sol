// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "./ERC721Connector.sol";

contract KryptoBirdz is ERC721Connector {
    string[] public kryptoBirds;

    mapping(string => bool) _kryptoBirdExists;

    constructor() ERC721Connector("KryptoBirdz", "KBIRDZ") {}

    function mint(string memory _kryptoBird) public {
        require(
            !_kryptoBirdExists[_kryptoBird],
            "Error: kryptoBird already exists"
        );
        kryptoBirds.push(_kryptoBird);
        uint256 _id = kryptoBirds.length - 1;

        _mint(msg.sender, _id);
        _kryptoBirdExists[_kryptoBird] = true;
    }
}
