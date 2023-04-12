import validator from 'validator'

export const loginValidator = (body) => {
  const errors = {}
  if (validator.isEmpty(body.email)) {
    errors.email = 'Email is required!'
  } else if (!validator.isEmail(body.email)) {
    errors.email = 'This is not a valid email format!'
  }
  if (validator.isEmpty(body.password)) {
    errors.password = 'Password is required!'
  }

  return errors
}

export const registerValidator = (body) => {
  const errors = {}
  const nameRegex = /^(?=.{1,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/
  if (validator.isEmpty(body.name)) {
    errors.name = 'Name is required!'
  } else if (!nameRegex.test(body.name)) {
    errors.name = 'This is not a valid name!'
  }
  if (validator.isEmpty(body.email)) {
    errors.email = 'Email is required!'
  } else if (!validator.isEmail(body.email)) {
    errors.email = 'This is not a valid email format!'
  }
  if (validator.isEmpty(body.password)) {
    errors.password = 'Password is required!'
  } else if (body.password !== body.confirm) {
    errors.confirm = 'Passwords must match!'
  }

  return errors
}
