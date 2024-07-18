const addToCartModel = require("../../models/cartProduct");

const checkCartController = async (req, res) => {
    try {
        const { productId } = req.params; // Get productId from URL params
        const currentUser = req.userId; // Assuming userId is stored in req.userId

        // Check if the product is already in the cart
        const isProductAvailable = await addToCartModel.findOne({ productId, userId: currentUser });
        console.log("Product is already in the cart", isProductAvailable);
        console.log("Product is already in the cart productId", productId);
        console.log("Product is already in the cart currentUser", currentUser);
        if (isProductAvailable) {
            res.json({
                isInCart: true,
                message: "Product is already in the cart",
                success: true,
                error: false,
            });
        } else {
            res.json({
                isInCart: false,
                message: "Product is not in the cart",
                success: true,
                error: false,
            });
        }
    } catch (err) {
        res.status(500).json({
            message: err.message || "Internal Server Error",
            error: true,
            success: false,
        });
    }
};

const checkCartCountController = async (req, res) => {
    try {
        const currentUser = req.userId; // Assuming userId is stored in req.userId

        // Count the number of items in the cart for the current user
        const cartItemCount = await addToCartModel.countDocuments({ userId: currentUser });

        res.json({
            cartItemCount: cartItemCount,
            message: "Cart item count retrieved successfully",
            success: true,
            error: false,
        });
    } catch (err) {
        res.status(500).json({
            message: err.message || "Internal Server Error",
            error: true,
            success: false,
        });
    }
};

module.exports = {
    checkCartController,
    checkCartCountController,
};
