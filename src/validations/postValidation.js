import Joi from "joi";

export const postValidation = data => {
  const schema = Joi.object({
    title: Joi.string().min(2).max(255).required().messages({
      "string.base": "Заголовок должен быть строкой",
      "string.empty": "Заголовок не должен быть пустым",
      "string.min": "Минимальная длинна Заголовка 2 символа",
      "string.max": "Максимальная длинна Заголовка 255 символа",
      "any.required": "Заголовок обязательное поле",
      "string.trim": "Лишние пробелы в строке",
    }),
    content: Joi.string().min(2).max(255).required().messages({
      "string.base": "Текст должен быть строкой",
      "string.trim": "Лишние пробелы в строке",
      "string.empty": "Текст не должен быть пустым",
      "string.min": "Минимальная длинна Текста 2 символа",
      "string.max": "Максимальная длинна Текста 255 символа",
      "any.required": "Текст обязательное поле",
    }),
    forumId: Joi.number().required().messages({
      "number.epmty": "Тема не должена быть пустой",
      "any.required": "Тема обязательное поле",
    }),
    userId: Joi.number().required().messages({
      "number.epmty": "Имя пользователя не должена быть пустым",
      "any.required": "Имя пользователя обязательное поле",
    }),
  });
  return schema.validate(data);
};
