import mongoose from 'mongoose';
import isEmpty from 'lodash/isEmpty';

/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    match: [
      /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
    ]
  },
  password: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
UserSchema.method({});

/**
 * Statics
 */
UserSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then(user => {
        if (user) {
          return user;
        }
        return Promise.reject({ error: 'nope' });
      });
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  },

  /**
   * @param {string} email
   * @param {string} password
   * @param {string} confirmPassword
   * @param {string} username
   * @param {string} mobileNumber
   * @returns {Boolean}
   */
  validateUser({ email, password, confirmPassword, username, mobileNumber }) {
    let errors = {};
    !email && (errors.email = 'Email is required.');
    !password && (errors.password = 'Password is required.');
    !confirmPassword && (errors.password = 'Confirm password is required.');
    !errors.password &&
      !errors.confirmPassword &&
      password !== confirmPassword &&
      (errors.isPasswordMatch = "Password doesn't match.");
    !username && (errors.username = 'User name is required.');
    !mobileNumber && (errors.mobileNumber = 'Mobile number is required.');
    //If valid return false
    if (isEmpty(errors)) return { valid: true, errors: null };
    //If errors
    return { valid: false, errors };
  },

  /**
   * @param {string} email
   * @param {string} password
   * @returns {Boolean}
   */
  validateLoginData({ email, password }) {
    let errors = {};
    !email && (errors.email = 'Email is required.');
    !password && (errors.password = 'Password is required.');
    //If valid return false
    if (isEmpty(errors)) return { valid: true, errors: null };
    //If errors
    return { valid: false, errors };
  },

  /**
   * @param {ObjectId} id
   * @param {string} username
   * @param {string} email
   * @param {Date} createdAt
   * @returns {Object}
   */
  sanitizeUserData({ id, username, email, createdAt }) {
    return {
      id,
      username,
      email,
      createdAt
    };
  }
};

/**
 * @typedef User
 */
export default mongoose.model('User', UserSchema);
