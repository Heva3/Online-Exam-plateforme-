import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema({
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
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 8,
    select: false
  },
  
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});


// Hide inactive users from queries (optional)
userSchema.pre(/^find/, function(next) {
  this.find({ active: { $ne: false } });
  next();
});

// Instance method to compare passwords
userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Check if password was changed after JWT was issued
userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

const User = mongoose.model('User', userSchema);
export default User;


