const { PaymentModel } = require("../models/payment.model");



module.exports = {
    payingOrder: async (req, res) => {
        try {
            const { paymentMethod, cardNumber, amount } = req.body;
            const payment = new PaymentModel({ user: user, order: req.params.id, paymentMethod, cardNumber, amount });
            await payment.save()
            res.status(200).json({
                status: true,
                msg: 'Payment Successful'
            })
        } catch (error) {
            res.status(500).json({
                status: false,
                msg: error.msg
            })
        }
    },
    fetchingPayments: async (req, res) => {
        try {
            const { id, status, paymentMethod } = req.query;
            if (id) {
                const data = await PaymentModel.find({ _id: id });
                res.status(200).json({
                    status: true,
                    data: data
                })
            } else {
                let query = {};
                if (status) {
                    query.status = status
                }

                if (paymentMethod) {
                    query.paymentMethod = paymentMethod
                }

                const data = await PaymentModel.find(query);
                res.status(200).json({
                    status: true,
                    data: data
                })
            }
        } catch (error) {
            res.status(500).json({
                status: false,
                msg: error.msg
            })
        }

    },

    allPayments: async (req, res) => {
        try {
            const data = await PaymentModel.find({ user: user });
            res.status(200).json({
                status: true,
                data: data
            })
        } catch (error) {
            res.status(500).json({
                status: true,
                msg: error.message
            })
        }
    },
    updatingPayments: async (req, res) => {
        try {
            const payment = await PaymentModel.findByIdAndUpdate({ _id: req.params.id }, req.body);
            if (!payment) {
                res.status(404).json({
                    status: false,
                    error: 'Payment not found'
                });
            }
            else {
                res.status(200).json({
                    status: true,
                    msg: 'Payment updated',
                    payment
                });
            }
        } catch (error) {
            res.status(500).json({
                status: false,
                error: error.message
            });
        }
    },
    deletingPayments: async (req, res) => {
        try {
            const payment = await PaymentModel.findByIdAndDelete({ _id: req.params.id });
            if (!payment) {
                res.status(404).json({
                    status: false,
                    error: 'Payment not found'
                });
            }
            else {
                res.status(200).json({
                    status: true,
                    msg: 'Payment deleted',
                    payment
                });
            }
        } catch (error) {
            res.status(500).json({
                status: false,
                error: error.message
            });
        }
    },
}