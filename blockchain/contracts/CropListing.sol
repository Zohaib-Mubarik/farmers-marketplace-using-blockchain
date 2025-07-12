// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CropListing {
    struct Crop {
        string listingTitle;
        string originalPrice;
        string category;
        string listingDescription;
        address owner;
    }

    Crop[] public crops;

    event CropAdded(
        string listingTitle,
        string originalPrice,
        string category,
        string listingDescription,
        address indexed owner
    );

    function addCrop(
        string memory _listingTitle,
        string memory _originalPrice,
        string memory _category,
        string memory _listingDescription
    ) public {
        crops.push(Crop({
            listingTitle: _listingTitle,
            originalPrice: _originalPrice,
            category: _category,
            listingDescription: _listingDescription,
            owner: msg.sender
        }));

        emit CropAdded(_listingTitle, _originalPrice, _category, _listingDescription, msg.sender);
    }

    function getAllCrops() public view returns (Crop[] memory) {
        return crops;
    }
}
