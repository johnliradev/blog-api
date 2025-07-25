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
      tags: {
        type: "array",
        items: { type: "string" },
        default: [],
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
            createdAt: { type: "string", format: "date-time" },
            tags: {
              type: "array",
              items: { type: "string" },
            },
          },
          required: ["id", "title", "content", "createdAt", "tags"],
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
              createdAt: { type: "string", format: "date-time" },
              tags: {
                type: "array",
                items: { type: "string" },
              },
            },
            required: ["id", "title", "content", "createdAt", "tags"],
          },
        },
      },
      required: ["articles"],
    },
  },
};
export const deleteArticleSchema = {
  params: {
    type: "object",
    properties: {
      id: { type: "string" },
    },
    required: ["id"],
  },
  response: {
    200: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
      required: ["message"],
    },
  },
};
export const getArticleByIdSchema = {
  params: {
    type: "object",
    properties: {
      id: { type: "string" },
    },
    required: ["id"],
  },
  response: {
    200: {
      type: "object",
      properties: {
        article: {
          type: "object",
          properties: {
            id: { type: "string" },
            title: { type: "string" },
            content: { type: "string" },
            createdAt: { type: "string", format: "date-time" },
            tags: {
              type: "array",
              items: { type: "string" },
            },
          },
          required: ["id", "title", "content", "createdAt", "tags"],
        },
      },
      required: ["article"],
    },
  },
};
export const updateArticleSchema = {
  params: {
    type: "object",
    properties: {
      id: { type: "string" },
    },
    required: ["id"],
  },
  body: {
    type: "object",
    properties: {
      title: { type: "string", minLength: 3, maxLength: 100 },
      content: { type: "string", minLength: 10, maxLength: 5000 },
      tags: {
        type: "array",
        items: { type: "string" },
      },
    },
    required: ["title", "content"],
    additionalProperties: false,
  },
  response: {
    200: {
      type: "object",
      properties: {
        message: { type: "string" },
        article: {
          type: "object",
          properties: {
            id: { type: "string" },
            title: { type: "string" },
            content: { type: "string" },
            createdAt: { type: "string", format: "date-time" },
            tags: {
              type: "array",
              items: { type: "string" },
            },
          },
          required: ["id", "title", "content", "createdAt", "tags"],
        },
      },
      required: ["message", "article"],
    },
  },
};
export const getArticlesByDateRangeSchema = {
  querystring: {
    type: "object",
    required: ["start", "end"],
    properties: {
      start: { type: "string", format: "date-time" },
      end: { type: "string", format: "date-time" },
    },
  },
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
              createdAt: { type: "string", format: "date-time" },
              tags: {
                type: "array",
                items: { type: "string" },
              },
            },
            required: ["id", "title", "content", "createdAt", "tags"],
          },
        },
      },
      required: ["articles"],
    },
  },
};
export const getArticlesByTagsSchema = {
  querystring: {
    type: "object",
    required: ["tags"],
    properties: {
      tags: { type: "string" },
    },
  },
  response: getAllArticlesSchema.response,
};
