// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "./interfaces/IERC721.sol";
import "./ERC165.sol";

contract ERC721 is IERC721, ERC165 {
    // Mapping from token id to the owner
    mapping(uint256 => address) private _tokenOwner;

    // Mapping from owner to the number of owned tokens
    mapping(address => uint256) private _ownedTokensCount;

    // Mapping from token id to approved addresses
    mapping(uint256 => address) private _tokenApprovals;

    function balanceOf(address _owner) public view returns (uint256) {
        require(_owner != address(0), "query for non-existent owner");
        return _ownedTokensCount[_owner];
    }

    function ownerOf(uint256 _tokenId) public view returns (address) {
        address owner = _tokenOwner[_tokenId];
        require(owner != address(0), "query for non-existent token");
        return owner;
    }

    function _exists(uint256 tokenId) internal view returns (bool) {
        address owner = _tokenOwner[tokenId];
        return owner != address(0);
    }

    function _mint(address to, uint256 tokenId) internal virtual {
        // requires that the address is not zero
        require(to != address(0), "ERC721: minting to the zero address");
        // requires that the token does not minted yet
        require(!_exists(tokenId), "ERC721: token already minted");

        _tokenOwner[tokenId] = to;
        _ownedTokensCount[to]++;

        emit Transfer(address(0), to, tokenId);
    }

    function _transferFrom(
        address _from,
        address _to,
        uint256 _tokenId
    ) internal {
        require(
            _to != address(0),
            "Error - ERC721 Transfer to the zero address"
        );
        require(
            ownerOf(_tokenId) == _from,
            "Error - Transfer a token from address that does'nt own it"
        );
        _ownedTokensCount[_from]--;
        _tokenOwner[_tokenId] = _to;
        _ownedTokensCount[_to]++;

        emit Transfer(_from, _to, _tokenId);
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _tokenId
    ) external {
        require(isApprovedOrOwner(msg.sender, _tokenId));
        _transferFrom(_from, _to, _tokenId);
    }

    function approve(address _approved, uint256 _tokenId) external {
        address owner = ownerOf(_tokenId);
        require(
            msg.sender == owner,
            "Error - caller is not the owner of the token"
        );
        require(_approved != owner, "Error - cannot approve yourself");

        _tokenApprovals[_tokenId] = _approved;

        emit Approval(owner, _approved, _tokenId);
    }

    function isApprovedOrOwner(address spender, uint256 tokenId)
        internal
        view
        returns (bool)
    {
        address owner = ownerOf(tokenId);
        return (spender == owner || getApproved(tokenId) == spender);
    }

    function getApproved(uint256 tokenId) public view returns (address) {
        require(_exists(tokenId), "Error - token does not exist");

        return _tokenApprovals[tokenId];
    }
}
