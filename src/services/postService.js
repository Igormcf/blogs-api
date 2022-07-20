const { BlogPost, Category, PostCategory, User, Sequelize } = require('../database/models');

const { Op } = Sequelize;

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

const getAllPosts = async () => {
  const response = await BlogPost.findAll({
    include: [{ model: User, as: 'user', attributes: { exclude: 'password' } },
    { model: Category, as: 'categories', through: { attributes: [] } }],
  });

  return { statusCode: 200, result: response };
};

const getPostId = async ({ id }) => {
  const response = await BlogPost.findByPk(id, {
    include: [{ model: User, as: 'user', attributes: { exclude: 'password' } },
    { model: Category, as: 'categories', through: { attributes: [] } }],
  });

  if (!response) {
    return { statusCode: 404, result: { message: 'Post does not exist' } };
  }

  return { statusCode: 200, result: response };
};

const updatePost = async (userId, id, title, content) => {
  if (userId !== Number(id)) {
    return { statusCode: 401, result: { message: 'Unauthorized user' } };
  }

  await BlogPost.update({ title, content }, { where: { id } });

  const response = await BlogPost.findByPk(id, {
    include: [{ model: User, as: 'user', attributes: { exclude: 'password' } },
    { model: Category, as: 'categories', through: { attributes: [] } }],
  });

  return { statusCode: 200, result: response };
};

const deletePost = async (userId, id) => {
  const findPost = await BlogPost.findByPk(id);
  console.log('findPost', findPost);
  if (findPost === null) {
    return { statusCode: 404, result: { message: 'Post does not exist' } };
  }

  if (findPost.dataValues.userId !== userId) {
    return { statusCode: 401, result: { message: 'Unauthorized user' } };
  }

  await BlogPost.destroy({ where: { id } });

  return { statusCode: 204, result: {} };
};

const getQueryAll = async (q) => {
  if (!q) {
    const response = await BlogPost.findAll({
      include: [{ model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category, as: 'categories', through: { attributes: [] } }],
    });
  
    return { statusCode: 200, result: response };
  }

  const getAll = await await BlogPost.findAll({
    where: { [Op.or]: [{ title: { [Op.like]: `%${q}%` } }, { content: { [Op.like]: `%${q}%` } }] },
    include: [{ model: User, as: 'user', attributes: { exclude: 'password' } },
    { model: Category, as: 'categories', through: { attributes: [] } }],
  });

  if (!getAll) {
    return { statusCode: 200, result: [] };
  }

  return { statusCode: 200, result: getAll };
};

module.exports = {
  createBlogPost,
  getAllPosts,
  getPostId,
  updatePost,
  deletePost,
  getQueryAll,
};