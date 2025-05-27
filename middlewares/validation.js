const { celebrate, Joi } = require("celebrate");
const validator = require("validator");

// Custom URL validator using the 'validator' package
const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

// Middleware to log validation errors globally
module.exports.logValidationErrors = (err, req, res, next) => {
  if (err.joi) {
    console.error("Validation error details:", err.joi.details);
  }
  next(err);
};

module.exports.validateSignup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
    }),
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'The "email" field must be a valid email',
    }),
    password: Joi.string()
      .required()
      .min(8)
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-])[A-Za-z\d!@#$%^&*-]{8,}$/
      )
      .messages({
        "string.empty": 'The "password" field must be filled in',
        "string.min": "Password must be at least 8 characters long",
        "string.pattern.base":
          "Password must contain at least: one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*-)",
      }),
  }),
});

// Validate login credentials (signin)
module.exports.validateSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'The "email" field must be a valid email',
    }),
    password: Joi.string()
      .required()
      .min(8)
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-])[A-Za-z\d!@#$%^&*-]{8,}$/
      )
      .messages({
        "string.empty": 'The "password" field must be filled in',
        "string.min": "Password must be at least 8 characters long",
        "string.pattern.base":
          "Password must contain at least: one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*-)",
      }),
  }),
});

// ✅ New: Validate updating user profile (PATCH /users/me)
module.exports.validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
    }),
  }),
});

// ✅ New: Validate article body (POST /articles)
module.exports.validateArticleBody = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().messages({
      "string.empty": "Keyword is required",
    }),
    title: Joi.string().required().messages({
      "string.empty": "Title is required",
    }),
    description: Joi.string().required().messages({
      "string.empty": "Description is required",
    }),
    publishedAt: Joi.string()
      .isoDate()
      .required()
      .messages({
        "string.empty": "Published date is required",
        "string.isoDate": "Published date must be a valid ISO date string",
      }),
    source: Joi.object()
      .keys({
        name: Joi.string().required().messages({
          "string.empty": "Source name is required",
        }),
      })
      .required()
      .messages({
        "object.base": "Source must be an object",
        "any.required": "Source is required",
      }),
    urlToImage: Joi.string().required().custom(validateURL).messages({
      "string.empty": "Image URL is required",
      "string.uri": "Image URL must be valid",
    }),
  }),
});

// ✅ Validate articleId for DELETE /articles/:articleId
module.exports.validateId = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().hex().length(24).required().messages({
      "string.hex": "Article ID must be a valid hex string",
      "string.length": "Article ID must be 24 characters long",
      "any.required": "Article ID is required",
    }),
  }),
});

