const Sequelize = require('sequelize');

const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const { BlogPost, Category, PostCategory } = require('../database/models');

const createBlogPost = async ({ id, title, content, categoryIds }) => {
  const findCategories = await Promise.all(categoryIds
  .map((item) => Category.findByPk(item)));

  const existsCategories = findCategories.every((item) => item);

  if (existsCategories === false) {
    return { statusCode: 400, result: { message: '"categoryIds" not found' } };
  }

  const newBlogPost = await sequelize.transaction(async (t) => {
    const newPost = await BlogPost.create({ userId: id, title, content }, { transaction: t });

    await PostCategory
    .bulkCreate(categoryIds
      .map((item) => ({ postId: newPost.dataValues.id, categoryId: item })), { transaction: t });

    return { ...newPost.dataValues };
  });

  return { statusCode: 201, result: newBlogPost };
};

module.exports = {
  createBlogPost,
};