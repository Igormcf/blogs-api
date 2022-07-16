const { BlogPost, Category, PostCategory } = require('../database/models');

const createBlogPost = async ({ id, title, content, categoryIds }) => {
  const findCategories = await Promise.all(categoryIds
  .map((item) => Category.findByPk(item)));

  const existsCategories = findCategories.every((item) => item);

  if (existsCategories === false) {
    return { statusCode: 400, result: { message: '"categoryIds" not found' } };
  }

  const newPost = await BlogPost.create({ userId: id, title, content });

  if (newPost) {
    await PostCategory
    .bulkCreate(categoryIds
      .map((item) => ({ postId: newPost.dataValues.id, categoryId: item })));
  }

  return { statusCode: 201, result: newPost };
};

module.exports = {
  createBlogPost,
};