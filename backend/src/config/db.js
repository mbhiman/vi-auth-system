const mongoose = require("mongoose");

module.exports = async function connectDB() {
  try {
    // Hide password in logs for security
    const uri = process.env.MONGO_URI;
    const safeUri = uri.replace(/:[^:]*@/, ':****@');
    console.log(`🔗 Connecting to MongoDB: ${safeUri}`);
    
    // For Mongoose 6+ (remove deprecated options)
    await mongoose.connect(uri);
    
    console.log("✅ MongoDB connected successfully");
    console.log(`📁 Database: ${mongoose.connection.name}`);
    console.log(`🏠 Host: ${mongoose.connection.host}`);
    
    // Connection event listeners
    mongoose.connection.on('error', (err) => {
      console.error(`❌ MongoDB connection error: ${err.message}`);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('⚠️  MongoDB disconnected');
    });
    
    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('Mongoose connection closed through app termination');
      process.exit(0);
    });
    
  } catch (err) {
    console.error("❌ DB connection failed:", err.message);
    
    // More specific error messages
    if (err.message.includes("Authentication failed")) {
      console.log("🔑 Authentication failed - check username/password");
    } else if (err.message.includes("getaddrinfo")) {
      console.log("🌐 Network/DNS issue - check internet connection");
    } else if (err.message.includes("querySrv")) {
      console.log("🎯 IP not whitelisted - add IP in MongoDB Atlas Network Access");
    }
    
    // Don't exit in development
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};