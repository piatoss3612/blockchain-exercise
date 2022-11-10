// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "./ERC721Metadata.sol";

contract ERC721Connector is ERC721Metadata {
    constructor(string memory name, string memory symbol)
        ERC721Metadata(name, symbol)
    {}
}
