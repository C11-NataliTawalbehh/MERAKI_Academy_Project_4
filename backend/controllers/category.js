const categoryModel = require("../models/categorySchema");

const createCategory = (req ,res)=>{
    const {name} = req.body;
    const newCategory = new categoryModel({
        name,
    })

    newCategory
    .save()
    .then((result)=>{
        res.status(201).json({success: true,
            message: "category created",
            category:result})
    })
    .catch((error)=>{
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
         })
    })
}

const getAllCategory = (req, res) => {
    categoryModel
      .find()
      .then((category) => {
          res.status(200).json({
            success: true,
            message: `All the category`,
            category: category,
          });
        }) 
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: `Server Error`,
          err: err.message,
        });
      });
  };

const getCategoryById = (req, res) => {
    let id = req.params.id;
    categoryModel
      .findById(id)
      .then((category) => {
        if (!category) {
          return res.status(404).json({
            success: false,
            message: `The category with id => ${id} not found`,
          });
        }
        res.status(200).json({
          success: true,
          message: `The category ${id} `,
          category: category,
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: `Server Error`,
          err: err.message,
        });
      });
  };
  
  const deleteCategoryById = (req, res) => {
    const id = req.params.id;
    categoryModel
      .findByIdAndDelete(id)
      .then((result) => {
        if (!result) {
          return res.status(404).json({
            success: false,
            message: `The category with id => ${id} not found`,
          });
        }
        res.status(200).json({
          success: true,
          message: `category deleted`,
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: `Server Error`,
          err: err.message,
        });
      });
  };

module.exports = {createCategory ,getCategoryById , getAllCategory ,deleteCategoryById}