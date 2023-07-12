const { CartModel } = require("../models/cart.model");





module.exports = {
    addingToCart: async (req, res) => {
        try {
            const { products } = req.body;
            const cartItem = new CartModel({ user: user, products });
            await cartItem.save()
            res.status(200).json({
                status: true,
                msg: 'Item added to the cart.',
                data: cartItem
            })
        } catch {
            res.status(500).json({
                status: false,
                msg: 'Internal Sever Error in Adding to the Cart.'
            })
        }
    },

    fetchingCart: async (req, res) => {
        try {
            let id = req.query.id;
            if (id) {
                const data = await CartModel.find({ _id: id }).populate('user', 'firstName lastName').populate('products.productId');
                res.status(200).json({
                    status: true,
                    msg: `Item as per ID:${id}.`,
                    data: data
                })
            } else {
                const data = await CartModel.find({ user: user }).populate('user', 'firstName lastName').populate('products.productId');
                res.status(200).json({
                    status: true,
                    msg: 'List of your Cart items',
                    data: data
                })
            }
        } catch {
            res.status(500).json({
                status: false,
                msg: 'Internal Server Error Occurred While fetching the cart-items'
            })
        }
    },

    updateItem: async (req, res) => {
        try {
            const id = req.params.id;
            const { quantity } = req.body;
            const cartItem = await CartModel.findOne({ _id: id });
            cartItem.products.quantity = quantity;
            await cartItem.save();
            res.status(200).json({
                status: true,
                msg: `Cart item updated with ID: ${id}`
            });
        } catch (error) {
            res.status(500).json({
                status: false,
                msg: 'Internal Server Error Occurred While Updating the item in the cart'
            });
        }
    },

    deleteItem: async (req, res) => {
        try {
            const id = req.params.id;
            await CartModel.findByIdAndDelete({ _id: id });
            res.status(200).json({
                status: true,
                msg: 'Item removed from the Cart..',
                data: await CartModel.find({ user: user }).populate('user', 'firstName lastName').populate('products.productId')
            })
        } catch {
            res.status(500).json({
                status: false,
                msg: 'Internal Server Error in Deleting the Item.'
            })
        }
    }


}