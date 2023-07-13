const { OrderModel } = require("../models/order.model");
const { UserModel } = require("../models/user.model");





module.exports = {
    addingOrders: async (req, res) => {
        try {
            const { products, totalAmount } = req.body;
            const order = new OrderModel({ user: user, products, totalAmount });
            await order.save();
            res.status(200).json({
                status: true,
                msg: 'Ordered Successfully'
            })
        } catch {
            res.status(500).json({
                status: false,
                msg: 'Internal Server Error Occurred In Orders.'
            })
        }
    },
    deletingOrders: async (req, res) => {
        try {
            const id = req.params.id;
            await OrderModel.findByIdAndDelete({ _id: id });
            res.status(200).json({
                status: true,
                msg: 'Cancelled the Order.'
            })
        } catch {
            res.status(500).json({
                status: false,
                msg: 'Internal Server Error Occurred In Orders.'
            })
        }
    },
    updatingOrders: async (req, res) => {
        try {
            const id = req.params.id;
            const data = req.body;
            await OrderModel.findByIdAndUpdate({ _id: id }, data);
            res.status(200).json({
                status: true,
                msg: 'Order Updated.'
            })
        } catch {
            res.status(500).json({
                status: false,
                msg: 'Internal Server Error Occurred In Orders.'
            })
        }
    },
    fetchingOrders: async (req, res) => {
        try {
            const { id } = req.query;
            const admin = await UserModel.findOne({ _id: user });
            const role = admin.role;
            if (id) {
                const data = await OrderModel.findOne({ _id: id }).populate('user', 'firstName lastName').populate('products.productId');
                res.status(200).json({
                    status: true,
                    data: data
                })
            }
            else if (role != "admin") {
                const data = await OrderModel.find({ user: user }).populate('products.productId');;
                res.status(200).json({
                    status: true,
                    data: data
                })
            }
            else if (role == "admin") {
                const data = await OrderModel.find().populate('user', '-password').populate('products.productId', '-quantity');
                res.status(200).json({
                    status: true,
                    data: data
                })
            }
        } catch {
            res.status(500).json({
                status: false,
                msg: 'Internal Server Error Occurred In Orders.'
            })
        }
    }
}