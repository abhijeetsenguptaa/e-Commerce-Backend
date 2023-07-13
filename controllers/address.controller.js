const { AddressModel } = require("../models/address.model");
const { UserModel } = require("../models/user.model");



module.exports = {
    addAddress: async (req, res) => {
        try {
            const { street, city, state, postalCode, country } = req.body;
            const address = new AddressModel({ user: user, street, city, state, postalCode, country })
            await address.save();
            await UserModel.updateOne({ _id: user }, { $set: { address: address._id } })
            res.status(200).json({
                status: true,
                msg: 'Address Successfully Added.'
            })
        } catch (error) {
            res.status(500).json({
                status: false,
                msg: 'Internal Server Error in Address Route.',
                error: error.message
            })
        }
    },
    updateAddress: async (req, res) => {
        try {
            const id = req.params.id;
            const data = req.body;
            await AddressModel.findByIdAndUpdate({ _id: id }, data);
            res.status(200).json({
                status: true,
                msg: `Address with ID:${id} has been updated.`
            })
        } catch (error) {
            res.status(500).json({
                status: false,
                msg: 'Internal Server Error in Address Route.',
                error: error.message
            })
        }
    },
    deleteAddress: async (req, res) => {
        try {
            const id = req.params.id;
            await AddressModel.findByIdAndDelete({ _id: id });
            res.status(200).json({
                status: true,
                msg: `Address with ID:${id} has been deleted.`
            })
        } catch (error) {
            res.status(500).json({
                status: false,
                msg: 'Internal Server Error in Address Route.',
                error: error.message
            })
        }
    },
    getAddress: async (req, res) => {
        try {
            const { id } = req.query;
            const admin = await UserModel.findOne({ _id: user });
            const role = admin.role;
            if (id) {
                const data = await AddressModel.findOne({ _id: id }).populate('user');
                res.status(200).json({
                    status: true,
                    data: data
                })
            }
            else if (role != "admin") {
                const data = await AddressModel.find({ user: user }).populate('user');;
                res.status(200).json({
                    status: true,
                    data: data
                })
            }
            else if (role == "admin") {
                const data = await AddressModel.find().populate('user');
                res.status(200).json({
                    status: true,
                    data: data
                })
            }
        } catch (error) {
            res.status(500).json({
                status: false,
                msg: 'Internal Server Error in Address Route.',
                error: error.message
            })
        }
    }
}