import { useWeb3 } from '../context/Web3Context'; // Ensure you import your Web3Context

export const useECommerce = () => {
  const { web3, account, contract } = useWeb3();

  if (!web3 || !contract || !account) {
    console.error("Web3, contract, or account not initialized");
    return {};
  }

  // Register a seller
  const registerSeller = async (name, profileURI, location, phoneNumber) => {
    try {
      await contract.methods.registerSeller(name, profileURI, location, phoneNumber).send({ from: account });
      console.log("Seller registered successfully");
    } catch (error) {
      console.error("Error registering seller:", error);
    }
  };

  // Create a product
  const createProduct = async (name, imageUrl, price, description) => {
    try {
      await contract.methods.createProduct(name, imageUrl, price, description).send({ from: account });
      console.log("Product created successfully");
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  // Fetch all listed products
  const getAllProducts = async () => {
    try {
      const productCount = await contract.methods.getProductCount().call();
      const products = [];
      for (let i = 0; i < productCount; i++) {
        const product = await contract.methods.getProduct(i).call();
        products.push({ id: i, ...product });
      }
      console.log("All Products:", products);
      return products;
    } catch (error) {
      console.error("Error fetching all products:", error);
      return [];
    }
  };

  // Purchase a product
  const purchaseProduct = async (productId, price) => {
    try {
      await contract.methods.purchaseProduct(productId).send({ from: account, value: price });
      console.log("Product purchased successfully");
    } catch (error) {
      console.error("Error purchasing product:", error);
    }
  };

  // Confirm payment
  const confirmPayment = async (productId) => {
    try {
      await contract.methods.confirmPayment(productId).send({ from: account });
      console.log("Payment confirmed successfully");
    } catch (error) {
      console.error("Error confirming payment:", error);
    }
  };

  // Cancel purchase
  const cancelPurchase = async (productId) => {
    try {
      await contract.methods.cancelPurchase(productId).send({ from: account });
      console.log("Purchase canceled successfully");
    } catch (error) {
      console.error("Error canceling purchase:", error);
    }
  };

  // Report a canceled purchase
  const reportCanceledPurchase = async (productId) => {
    try {
      await contract.methods.reportCanceledPurchase(productId).send({ from: account });
      console.log("Purchase reported successfully");
    } catch (error) {
      console.error("Error reporting purchase:", error);
    }
  };

  // Rate a seller
  const rateSeller = async (sellerAddress) => {
    try {
      await contract.methods.rateSeller(sellerAddress).send({ from: account });
      console.log("Seller rated successfully");
    } catch (error) {
      console.error("Error rating seller:", error);
    }
  };

  // Get seller details
  const getSellerDetails = async (productId) => {
    try {
      const details = await contract.methods.getSellerDetails(productId).call({ from: account });
      console.log("Seller details:", details);
      return details;
    } catch (error) {
      console.error("Error fetching seller details:", error);
    }
  };

  // Get product details
  const getProduct = async (productId) => {
    try {
      const product = await contract.methods.getProduct(productId).call();
      console.log("Product details:", product);
      return product;
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  // Withdraw collected fees (only owner)
  const withdrawFees = async () => {
    try {
      await contract.methods.withdrawFees().send({ from: account });
      console.log("Fees withdrawn successfully");
    } catch (error) {
      console.error("Error withdrawing fees:", error);
    }
  };

  return {
    registerSeller,
    createProduct,
    getAllProducts,
    purchaseProduct,
    confirmPayment,
    cancelPurchase,
    reportCanceledPurchase,
    rateSeller,
    getSellerDetails,
    getProduct,
    withdrawFees,
  };
};
