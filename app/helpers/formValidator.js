import { SubmissionError } from 'redux-form'

export function authValidator (response) {
  if (typeof response !== 'undefined') {
    throw new SubmissionError({
      _error: response.error,
    })
  }
}

export function signUpValidate (values) {
  const errors = {}
  if (!values.displayName) {
    errors.displayName = 'Required'
  } else if (values.displayName.length > 15) {
    errors.displayName = 'Must be 15 characters or less'
  } else if (values.displayName.length < 3) {
    errors.displayName = 'Must be at least 3 characters or more'
  }
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.password) {
    errors.password = 'Required'
  } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(values.password)) {
    errors.password = 'Password must be mnimum eight characters, at least one letter and one number'
  }
  return errors
}

export function loginValidate (values) {
  const errors = {}
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.password) {
    errors.password = 'Required'
  }
  return errors
}
