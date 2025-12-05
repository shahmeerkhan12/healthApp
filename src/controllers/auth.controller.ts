import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.model';

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      console.log('Registration attempt:', req.body);
      const { email, password, name, age, gender, height, weight, healthGoals } = req.body;

      if (!email || !password || !name) {
        return res.status(400).json({ message: 'Email, password, and name are required' });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Filter out empty strings and undefined values
      const userData: any = { email, password, name };
      if (age) userData.age = age;
      if (gender && gender !== '') userData.gender = gender;
      if (height) userData.height = height;
      if (weight) userData.weight = weight;
      if (healthGoals && healthGoals.length > 0) userData.healthGoals = healthGoals;

      const user = new User(userData);
      await user.save();
      console.log('User created successfully:', user._id);

      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '7d' }
      );

      res.status(201).json({
        message: 'User registered successfully',
        token,
        user: { id: user._id, email: user.email, name: user.name }
      });
    } catch (error: any) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Registration failed', error: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      console.log('Login attempt:', req.body.email);
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '7d' }
      );

      res.json({
        message: 'Login successful',
        token,
        user: { id: user._id, email: user.email, name: user.name }
      });
    } catch (error: any) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Login failed', error: error.message });
    }
  }
}
