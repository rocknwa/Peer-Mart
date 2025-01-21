# E-Commerce Smart Contract

This project contains the smart contract code for an e-commerce platform. The smart contract handles transactions, product listings, and user accounts.

## Features

- **Product Listings**: Add, update, and remove product listings.
- **Transactions**: Securely handle transactions between buyers and sellers.
- **User Accounts**: Manage user accounts and authentication.

 // SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ECommerce {
    struct Product {
        uint id;
        string name;
        uint price;
        address payable seller;
        bool isSold;
    }

    uint public productCount = 0;
    mapping(uint => Product) public products;

    event ProductCreated(
        uint id,
        string name,
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

    function createProduct(string memory _name, uint _price) public {
        require(bytes(_name).length > 0, "Product name is required");
        require(_price > 0, "Product price must be greater than zero");

        productCount++;
        products[productCount] = Product(productCount, _name, _price, payable(msg.sender), false);

        emit ProductCreated(productCount, _name, _price, payable(msg.sender), false);
    }

    function purchaseProduct(uint _id) public payable {
        Product memory _product = products[_id];
        address payable _seller = _product.seller;

        require(_product.id > 0 && _product.id <= productCount, "Product does not exist");
        require(msg.value >= _product.price, "Not enough Ether to purchase this product");
        require(!_product.isSold, "Product is already sold");
        require(_seller != msg.sender, "Seller cannot buy their own product");

        _product.seller = payable(msg.sender);
        _product.isSold = true;
        products[_id] = _product;

        _seller.transfer(msg.value);

        emit ProductPurchased(_id, _product.name, _product.price, _seller, payable(msg.sender), true);
    }
}