const mongoose = require("mongoose");

// const dropAutomationCollection = async () => {
//   try {
//     // Make sure to connect to your DB first!
//     if (mongoose.connection.readyState === 0) {
//       await mongoose.connect(process.env.DATABASE_URI);
//     }

//     const db = mongoose.connection.db;
//     const collections = await db
//       .listCollections({ name: "automations" })
//       .toArray();

//     if (collections.length === 0) {
//       console.log("No 'automations' collection found.");
//       return;
//     }

//     await db.dropCollection("automations");
//     console.log("Automation collection dropped successfully.");
//   } catch (error) {
//     console.error("Error dropping Automation collection:", error);
//   } finally {
//     await mongoose.disconnect();
//   }
// };

// module.exports = dropAutomationCollection;

const dropClerkIdIndex = async () => {
  try {
    const db = mongoose.connection.db;
    const indexes = await db.collection("users").indexes();

    const clerkIndex = indexes.find((index) => index.name === "clerkId_1");

    if (clerkIndex) {
      console.log("Dropping index: clerkId_1");
      await db.collection("users").dropIndex("clerkId_1");
      console.log("Index dropped successfully.");
    } else {
      console.log("No clerkId_1 index found.");
    }
  } catch (error) {
    console.error("Error dropping index:", error);
  }
};

module.exports = dropClerkIdIndex;
