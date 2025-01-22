// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ECommerce is Ownable(msg.sender) {
    IERC20 public usdtToken;

    struct Product {
        uint id;
        string name;
        string imageUrl;
        uint price;
        address payable seller;
        bool isSold;
        address payable buyer;
    }

    uint public productCount = 0;
    mapping(uint => Product) public products;
    uint public feePercentage = 5;  // 1%
    uint public penaltyPercentage = 3;
    uint public cancellationPenaltyPercentage = 10;  // 10%
    uint public totalFeesCollected = 0;

    event ProductCreated(
        uint id,
        string name,
        string imageUrl,
        uint price,
        address payable seller,
        bool isSold
    );

    event ProductPurchased(
        uint id,
        string name,
        uint price,
        address payable seller,
        address payable buyer,
        bool isSold
    );

    event PaymentConfirmed(
        uint id,
        string name,
        uint price,
        address payable seller,
        address payable buyer,
        bool isSold
    );

    constructor(address _usdtTokenAddress) {
        usdtToken = IERC20(_usdtTokenAddress);
    }

    function createProduct(string memory _name, string memory _imageUrl, uint _price) public {
        require(bytes(_name).length > 0, "Product name is required");
        require(bytes(_imageUrl).length > 0, "Product image URL is required");
        require(_price > 0, "Product price must be greater than zero");

        productCount++;
        products[productCount] = Product(productCount, _name, _imageUrl, _price, payable(msg.sender), false, payable(address(0)));

        emit ProductCreated(productCount, _name, _imageUrl, _price, payable(msg.sender), false);
    }

    function purchaseProduct(uint _id) public {
        Product storage _product = products[_id];
        address payable _seller = _product.seller;

        require(_product.id > 0 && _product.id <= productCount, "Product does not exist");
        require(_product.price <= usdtToken.allowance(msg.sender, address(this)), "Not enough USDT allowance to purchase this product");
        require(!_product.isSold, "Product is already sold");
        require(_seller != msg.sender, "Seller cannot buy their own product");

        _product.isSold = true;
        _product.buyer = payable(msg.sender);

        // Transfer USDT to the contract
        usdtToken.transferFrom(msg.sender, address(this), _product.price);

        emit ProductPurchased(_id, _product.name, _product.price, _seller, payable(msg.sender), true);
    }

    function confirmPayment(uint _id) public {
        Product storage _product = products[_id];
        require(_product.buyer == msg.sender, "Only the buyer can confirm the payment");

        uint fee = (_product.price * feePercentage) / 100;
        uint paymentToSeller = _product.price - fee;

        totalFeesCollected += fee;

        // Transfer USDT to the seller
        usdtToken.transfer(_product.seller, paymentToSeller);

        emit PaymentConfirmed(_id, _product.name, _product.price, _product.seller, _product.buyer, true);
    }

    function cancelPurchase(uint _id) public {
        Product storage _product = products[_id];
        require(_product.buyer == msg.sender, "Only the buyer can cancel the purchase");

        uint penalty = (_product.price * cancellationPenaltyPercentage) / 100;
        uint refundToBuyer = _product.price - penalty;
        uint fee = (penalty * penaltyPercentage) / 100;
        uint paymentToSeller = penalty - fee;

        totalFeesCollected += fee;

        // Transfer USDT back to the buyer and to the seller as penalty
        usdtToken.transfer(_product.buyer, refundToBuyer);
        usdtToken.transfer(_product.seller, paymentToSeller);

        _product.isSold = false;
        _product.buyer = payable(address(0));
    }

      function getProduct(uint _id) public view returns (Product memory) {
        return products[_id];
    }

    function withdrawFees() public onlyOwner {
        usdtToken.transfer(owner(), totalFeesCollected);
        totalFeesCollected = 0;
    }
}