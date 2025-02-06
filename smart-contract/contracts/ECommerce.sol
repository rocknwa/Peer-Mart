// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/Ownable.sol";

contract ECommerce is Ownable(msg.sender) {
    struct Product {
        uint id;
        string name;
        string imageUrl;
        uint price;
        address payable seller;
        string sellerName;
        bool isSold;
        bool isPaid;
        address payable buyer; 
        string description;
    }

    struct Seller {
        string name;
        string profileURI;
        uint256 confirmedPurchases;
        uint256 canceledPurchases;
        uint256 reportedPurchases;
        uint256 rating;
    }

    struct SellerContact {
        string location;
        string phoneNumber;
    }

    struct BlockedSeller {
        address sellerAddress;
        string reason;
    }

    uint public productCount = 0;
    mapping(uint => Product) public products;
    mapping(address => Seller) public sellers;
    mapping(address => SellerContact) public sellerContacts;
    mapping(address => BlockedSeller) public blockedSellers;
    mapping(address => bool) public isSellerBlocked;
    mapping(uint => mapping(address => bool)) public hasReported; // Mapping to track reports
    mapping(uint => bool) public canceledPurchases; // Mapping to track canceled purchases
    mapping(uint => mapping(address => bool)) public buyerCanceled; // Mapping to track if a buyer has canceled a product

    uint public feePercentage = 5;  // 5%
    uint public penaltyPercentage = 3;  // 3%
    uint public cancellationPenaltyPercentage = 10;  // 10%
    uint public totalFeesCollected = 0;

    event ProductCreated(
        uint id,
        string name,
        string imageUrl,
        uint price,
        address payable seller,
        string sellerName,
        bool isSold,
        bool isPaid
    );

    event ProductPurchased(
        uint id,
        string name,
        uint price,
        address payable seller,
        address payable buyer,
        bool isPaid
    );

    event PaymentConfirmed(
        uint id,
        string name,
        uint price,
        address payable seller,
        address payable buyer,
        bool isSold
    );

    event SellerRegistered(
        address indexed sellerAddress,
        string name,
        string profileURI
    );

    event SellerRated(
        address indexed sellerAddress,
        uint256 rating
    );

    event SellerBlocked(
        address indexed sellerAddress,
        string reason
    );


    function registerSeller(string memory _name, string memory _profileURI, string memory _location, string memory _phoneNumber) public {
        require(bytes(_name).length > 0, "Seller name is required");
        require(bytes(_profileURI).length > 0, "Profile URI is required");
        require(bytes(_location).length > 0, "Location is required");
        require(bytes(_phoneNumber).length > 0, "Phone number is required");
        require(bytes(sellers[msg.sender].name).length == 0, "Seller already registered");

        sellers[msg.sender] = Seller(_name, _profileURI, 0, 0, 0, 0);
        sellerContacts[msg.sender] = SellerContact(_location, _phoneNumber);
        
        emit SellerRegistered(msg.sender, _name, _profileURI);
    }

    function createProduct(string memory _name, string memory _imageUrl, uint _price, string memory _description) public {
        require(bytes(_name).length > 0, "Product name is required");
        require(bytes(_imageUrl).length > 0, "Product image URL is required");
        require(_price > 0, "Product price must be greater than zero");
        require(!isSellerBlocked[msg.sender], "Seller is blocked");
        require(bytes(sellers[msg.sender].name).length > 0, "Seller not registered");

        productCount++;
        products[productCount] = Product(productCount, _name, _imageUrl, _price, payable(msg.sender), sellers[msg.sender].name, false, false, payable(address(0)), _description);

        emit ProductCreated(productCount, _name, _imageUrl, _price, payable(msg.sender), sellers[msg.sender].name, false, false);
    }

    function purchaseProduct(uint _id) public payable {
        Product storage _product = products[_id];
        address payable _seller = _product.seller;

        require(_product.id > 0 && _product.id <= productCount, "Product does not exist");
        require(msg.value == _product.price, "Incorrect Ether value sent");
        require(!_product.isPaid, "Product is already paid for");
        require(_seller != msg.sender, "Seller cannot buy their own product");

        _product.isPaid = true;
        _product.buyer = payable(msg.sender);

        emit ProductPurchased(_id, _product.name, _product.price, _seller, payable(msg.sender), true);
    }

    function confirmPayment(uint _id) public {
        Product storage _product = products[_id];
        require(_product.buyer == msg.sender, "Only the buyer can confirm the payment");
        require(!_product.isSold, "Product is already sold");

        uint fee = (_product.price * feePercentage) / 100;
        uint paymentToSeller = _product.price - fee;

        totalFeesCollected += fee;
        _product.isSold = true;

        // Transfer ETH to the seller
        _product.seller.transfer(paymentToSeller);

        // Update seller's confirmed purchases
        sellers[_product.seller].confirmedPurchases += 1;

        emit PaymentConfirmed(_id, _product.name, _product.price, _product.seller, _product.buyer, true);
    }

    function cancelPurchase(uint _id) public {
        Product storage _product = products[_id];
        require(_product.buyer == msg.sender, "Only the buyer can cancel the purchase");
        require(_product.isPaid, "Product not paid for");

        uint penalty = (_product.price * cancellationPenaltyPercentage) / 100;
        uint refundToBuyer = _product.price - penalty;
        uint fee = (penalty * penaltyPercentage) / 100;
        uint paymentToSeller = penalty - fee;

        totalFeesCollected += fee;
        _product.isPaid = false;

        // Transfer ETH back to the buyer and to the seller as penalty
        payable(_product.buyer).transfer(refundToBuyer);
        _product.seller.transfer(paymentToSeller);

        // Update seller's canceled purchases
        sellers[_product.seller].canceledPurchases += 1;

        // Mark the purchase as canceled
        canceledPurchases[_id] = true;
        // Mark that the buyer has canceled this product
        buyerCanceled[_id][msg.sender] = true;

        _product.buyer = payable(address(0));
    }

    function reportCanceledPurchase(uint _id) public {
        Product storage _product = products[_id];
        require(canceledPurchases[_id], "Purchase has not been canceled");
        require(buyerCanceled[_id][msg.sender], "You did not cancel this purchase");
        require(!hasReported[_id][msg.sender], "You have already reported this purchase");

        // Mark as reported
        hasReported[_id][msg.sender] = true;

        // Update seller's reported purchases
        sellers[_product.seller].reportedPurchases += 1;

        // Check if seller should be blocked
        if (sellers[_product.seller].reportedPurchases >= 3 && sellers[_product.seller].confirmedPurchases == 0) {
            blockSeller(_product.seller, "Multiple reports with no confirmed purchases");
        }
    }

    function rateSeller(address _seller) public {
        require(sellers[_seller].confirmedPurchases > 0, "Seller must have confirmed purchases");
        require(sellers[_seller].rating < sellers[_seller].confirmedPurchases, "Rating cannot exceed confirmed purchases");

        // Increment the seller's rating
        sellers[_seller].rating++;

        emit SellerRated(_seller, sellers[_seller].rating);
    }

    function blockSeller(address _seller, string memory _reason) internal {
        require(!isSellerBlocked[_seller], "Seller is already blocked");

        blockedSellers[_seller] = BlockedSeller(_seller, _reason);
        isSellerBlocked[_seller] = true;

        emit SellerBlocked(_seller, _reason);
    }

    function getSellerDetails(uint _id) public view returns (SellerContact memory) {
        Product storage _product = products[_id];
        require(_product.id > 0 && _product.id <= productCount, "Product does not exist");
        require(_product.buyer == msg.sender, "Only the buyer can view seller details");
        require(_product.isPaid, "Product must be paid for to view seller details");

        return sellerContacts[_product.seller];
    }

    function getProduct(uint _id) public view returns (Product memory) {
        return products[_id];
    }

    function withdrawFees() public onlyOwner{
        payable(owner()).transfer(totalFeesCollected);
        totalFeesCollected = 0;
    }
}
