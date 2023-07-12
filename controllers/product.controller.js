const { ProductModel } = require("../models/product.model");




// All the productRoute functions are here ------------------------
module.exports = {
    addingProduct: async (req, res) => {
        try {
            const { name, description, price, quantity, category, image } = req.body;
            const item = new ProductModel({ seller: user, name, description, price, quantity, category, image });
            await item.save();
            res.status(200).json({
                status: true,
                msg: 'New Product Added!',
                data: item
            })
        } catch {
            res.status(500).json({
                status: false,
                msg: 'Internal Server Error Occurred While Adding New Product.'
            })
        }
    },

    updateProduct: async (req, res) => {
        try {
            const id = req.query.id;
            const data = req.body;
            await ProductModel.findByIdAndUpdate({ _id: id }, data);
            res.status(200).json({
                status: true,
                msg: `Product with ID: ${id} has been updated`,
                updateItem: await ProductModel.find({ _id: id }),
                data: await ProductModel.find({ seller: user })
            })
        } catch {
            res.status(500).json({
                status: false,
                msg: 'Internal Server Error While Updating the Product.'
            })
        }
    },

    deleteProduct: async (req, res) => {
        try {
            const id = req.query.id;
            await ProductModel.findByIdAndDelete({ _id: id });
            res.status(200).json({
                status: true,
                msg: `Item with ID: ${id} has been deleted.`,
                data: await ProductModel.find({ seller: user })
            })
        } catch {
            res.status(500).json({
                status: false,
                msg: 'Internal Server Error Occurred While deleting product.'
            })
        }
    },

    // ?category=Electronics&name=phone&sortBy=price&sortOrder=asc&page=2&limit=10
    fetchingProduct: async (req, res) => {
        try {
            const { category, name, sortBy, sortOrder, page, limit } = req.body;
            const query = {};

            if (category) {
                query.category = category;
            }

            if (name) {
                const nameRegex = new RegExp(name, 'i');
                query.name = nameRegex;
            }

            const sortOptions = {};
            if (sortBy) {
                sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
            }


            const pageNumber = parseInt(page) || 1;
            const pageSize = parseInt(limit) || 10;
            const skip = (pageNumber - 1) * pageSize;


            const products = await ProductModel.find(query)
                .sort(sortOptions)
                .skip(skip)
                .limit(pageSize);


            const totalCount = await ProductModel.countDocuments(query);

            res.status(200).json({
                products: products,
                totalCount: totalCount,
                currentPage: pageNumber,
                totalPages: Math.ceil(totalCount / pageSize)
            });
        } catch {
            res.status(500).json({
                status: false,
                msg: 'Internal Server Error Occurred in Fetching Products.'
            })
        }
    }
}