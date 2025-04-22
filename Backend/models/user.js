const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // From your registration form
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  nom: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true
  },
  prenom: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  date_naissance: {
    type: Date,
    required: [true, 'Birth date is required']
  },
  sexe: {
    type: String,
    required: [true, 'Gender is required'],
    enum: ['homme', 'femme']
  },
  filiere: {
    type: String,
    required: [true, 'Field of study is required'],
    enum: ['informatique', 'maths', 'physique']
  },
  etablissement: {
    type: String,
    required: [true, 'Institution is required'],
    trim: true
  },
  
  // For authentication
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function(el) {
        return el === this.password;
      },
      message: 'Passwords do not match!'
    }
  },
  role: {
    type: String,
    enum: ['student', 'teacher', 'admin'],
    default: 'student'
  },
  passwordChangedAt: Date,
  active: {
    type: Boolean,
    default: true,
    select: false
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Password encryption middleware
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

// Instance method to check password
userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Check if password was changed after token issued
userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

const User = mongoose.model('User', userSchema);
module.exports = User;