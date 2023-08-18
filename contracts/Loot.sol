// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@manifoldxyz/royalty-registry-solidity/contracts/specs/IEIP2981.sol";
import "./interfaces/ILoot.sol";

contract Void2122Loot is ERC1155Upgradeable, ILoot {
    uint256 public lootIds;
    uint256 public royaltyAmount;
    address public royalties_recipient;
    string public constant contractName = "Void 2122 - Loots";
    mapping(uint256 => Loot) public loots;
    mapping(address => bool) isAdmin;
    string[] uriComponents;

    error Unauthorized();

    function initialize() public initializer {
        __ERC1155_init("");
        lootIds = 1;
        royaltyAmount = 10;
        royalties_recipient = msg.sender;
        isAdmin[msg.sender] = true;
        uriComponents = [
            'data:application/json;utf8,{"name":"',
            '", "description":"',
            '", "image":"',
            '", "animation":"',
            '"}'
        ];
    }

    modifier adminRequired() {
        if (!isAdmin[msg.sender]) revert Unauthorized();
        _;
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(ERC1155Upgradeable) returns (bool) {
        return
            ERC1155Upgradeable.supportsInterface(interfaceId) ||
            interfaceId == type(IEIP2981).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    function name() public pure returns (string memory) {
        return contractName;
    }

    function mint(
        address to,
        uint256 id,
        uint256 amount
    ) external adminRequired {
        _mint(to, id, amount, "0x0");
    }

    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts
    ) external adminRequired {
        _mintBatch(to, ids, amounts, "0x0");
    }

    function burnBatch(
        uint256[] memory ids,
        uint256[] memory amounts
    ) external {
        _burnBatch(tx.origin, ids, amounts);
    }

    function burn(uint256 tokenId, uint256 quantity) public {
        _burn(tx.origin, tokenId, quantity);
    }

    function toggleAdmin(address _admin) external adminRequired {
        isAdmin[_admin] = !isAdmin[_admin];
    }

    function uri(
        uint256 _tokenId
    ) public view virtual override returns (string memory) {
        Loot memory loot = loots[_tokenId];
        bytes memory byteString = abi.encodePacked(
            abi.encodePacked(uriComponents[0], loot.name),
            abi.encodePacked(uriComponents[1], loot.description),
            abi.encodePacked(uriComponents[2], loot.image),
            abi.encodePacked(uriComponents[3], loot.animation),
            abi.encodePacked(uriComponents[4])
        );
        return string(byteString);
    }

    function setRoyalties(
        address payable _recipient,
        uint256 _royaltyPerCent
    ) external adminRequired {
        royalties_recipient = _recipient;
        royaltyAmount = _royaltyPerCent;
    }

    function royaltyInfo(
        uint256 salePrice
    ) external view returns (address, uint256) {
        if (royalties_recipient != address(0)) {
            return (royalties_recipient, (salePrice * royaltyAmount) / 100);
        }
        return (address(0), 0);
    }

    function withdraw(address recipient) external adminRequired {
        payable(recipient).transfer(address(this).balance);
    }

    function createLoot(Loot calldata _loot) external {
        loots[lootIds] = _loot;
        lootIds++;
        emit LootCreated(_loot);
    }
}
