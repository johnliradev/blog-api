export const createArticleSchema = {
  body: {
    type: "object",
    required: ["title", "content"],
    properties: {
      title: {
        type: "string",
        minLength: 3,
        maxLength: 100,
      },
      content: {
        type: "string",
        minLength: 10,
        maxLength: 5000,
      },
    },
  },
  response: {
    201: {
      type: "object",
      properties: {
        message: { type: "string" },
        article: {
          type: "object",
          properties: {
            id: { type: "string" },
            title: { type: "string" },
            content: { type: "string" },
          },
        },
      },
    },
  },
};
export const getAllArticlesSchema = {
  response: {
    200: {
      type: "object",
      properties: {
        articles: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string" },
              title: { type: "string" },
              content: { type: "string" },
            },
            required: ["id", "title", "content"],
          },
        },
      },
      required: ["articles"],
    },
  },
};
