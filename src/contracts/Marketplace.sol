pragma solidity ^0.5.0;


contract Marketplace {
    uint256 public resourceCount = 0;
    mapping(uint256 => Resource) public resources;

    struct Resource {
        uint256 id;
        string name;
        uint256 price;
        address payable owner;
        bool purchased;
        string resourceIPFSHash;
    }

    event ResourceDetailsAdded(
        uint256 id,
        string name,
        uint256 price,
        address payable owner,
        bool purchased,
        string resourceIPFSHash
    );

    event ResourceBought(
        uint256 id,
        string name,
        uint256 price,
        address payable owner,
        bool purchased,
        string resourceIPFSHash
    );

    function addResourceDetails(
        string memory _name,
        uint256 _price,
        string memory _resourceIPFSHash
    ) public {
        // Require a valid name
        require(bytes(_name).length > 0, "");
        // Require a valid price
        require(_price > 0, "");
        // Increment product count
        resourceCount++;
        // Create the product
        resources[resourceCount] = Resource(
            resourceCount,
            _name,
            _price,
            msg.sender,
            false,
            _resourceIPFSHash
        );
        // Trigger an event
        emit ResourceDetailsAdded(
            resourceCount,
            _name,
            _price,
            msg.sender,
            false,
            _resourceIPFSHash
        );
    }

    function buyResource(uint256 _id) public payable {
        // Fetch the product
        Resource memory resource = resources[_id];
        // Fetch the owner
        address payable _seller = resource.owner;
        // Make sure the product has a valid id
        require(resource.id > 0 && resource.id <= resourceCount, "");
        // Require that there is enough Ether in the transaction
        require(msg.value >= resource.price, "");
        // Require that the product has not been purchased already
        require(!resource.purchased, "");
        // Require that the buyer is not the seller
        require(_seller != msg.sender, "");
        // Transfer ownership to the buyer
        resource.owner = msg.sender;
        // Mark as purchased
        resource.purchased = true;
        // Update the product
        resources[_id] = resource;
        // Pay the seller by sending them Ether
        address(_seller).transfer(msg.value);
        // Trigger an event
        emit ResourceBought(
            resourceCount,
            resource.name,
            resource.price,
            msg.sender,
            true,
            resource.resourceIPFSHash
        );
    }
}
