const express = require("express");
require("dotenv").config();
const cors = require("cors");

const port = process.env.PORT || 4000;
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

app.use(cors());
app.use(express.json());


const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

app.get("/", (req, res) => {
  res.send("the server is running from port 4000");
});

async function run() {
  try {
    const syne = client.db("synexnova");
    const servicesCollection = syne.collection("services");
    const softwareCollection = syne.collection("software");
    const reviewsCollection = syne.collection("reviews");
    const userCollection = syne.collection("users");
    const emailsCollection = syne.collection("emails");
    const statisticsCollection = syne.collection("statistics");
    const messagesCollection = syne.collection("messages");

    // ─── SERVICES ───────────────────────────────────────────────
    app.get("/services", async (req, res) => {
      try {
        const result = await servicesCollection.find().toArray();
        res.status(200).send(result);
      } catch (error) {
        res.status(500).send({ message: "Failed to fetch services", error });
      }
    });

    app.get("/services/:id", async (req, res) => {
      try {
        const result = await servicesCollection.findOne({ _id: new ObjectId(req.params.id) });
        if (!result) return res.status(404).send({ message: "Service not found" });
        res.status(200).send(result);
      } catch (error) {
        res.status(500).send({ message: "Failed to fetch service", error });
      }
    });

    app.post("/services", async (req, res) => {
      try {
        const result = await servicesCollection.insertOne(req.body);
        res.status(201).send(result);
      } catch (error) {
        res.status(500).send({ message: "Failed to create service", error });
      }
    });

    app.put("/services/:id", async (req, res) => {
      try {
        const result = await servicesCollection.replaceOne(
          { _id: new ObjectId(req.params.id) },
          req.body
        );
        if (result.matchedCount === 0) return res.status(404).send({ message: "Service not found" });
        res.status(200).send(result);
      } catch (error) {
        res.status(500).send({ message: "Failed to replace service", error });
      }
    });

    app.patch("/services/:id", async (req, res) => {
      try {
        const result = await servicesCollection.updateOne(
          { _id: new ObjectId(req.params.id) },
          { $set: req.body }
        );
        if (result.matchedCount === 0) return res.status(404).send({ message: "Service not found" });
        res.status(200).send(result);
      } catch (error) {
        res.status(500).send({ message: "Failed to update service", error });
      }
    });

    app.delete("/services/:id", async (req, res) => {
      try {
        const result = await servicesCollection.deleteOne({ _id: new ObjectId(req.params.id) });
        if (result.deletedCount === 0) return res.status(404).send({ message: "Service not found" });
        res.status(200).send(result);
      } catch (error) {
        res.status(500).send({ message: "Failed to delete service", error });
      }
    });

    // ─── SOFTWARE ────────────────────────────────────────────────
    app.get("/software", async (req, res) => {
      try {
        const result = await softwareCollection.find().toArray();
        res.status(200).send(result);
      } catch (error) {
        res.status(500).send({ message: "Failed to fetch software", error });
      }
    });

    app.get("/software/:id", async (req, res) => {
      try {
        const result = await softwareCollection.findOne({ _id: new ObjectId(req.params.id) });
        if (!result) return res.status(404).send({ message: "Software not found" });
        res.status(200).send(result);
      } catch (error) {
        res.status(500).send({ message: "Failed to fetch software", error });
      }
    });

    app.post("/software", async (req, res) => {
      try {
        const result = await softwareCollection.insertOne(req.body);
        res.status(201).send(result);
      } catch (error) {
        res.status(500).send({ message: "Failed to create software", error });
      }
    });

    app.put("/software/:id", async (req, res) => {
      try {
        const result = await softwareCollection.replaceOne(
          { _id: new ObjectId(req.params.id) },
          req.body
        );
        if (result.matchedCount === 0) return res.status(404).send({ message: "Software not found" });
        res.status(200).send(result);
      } catch (error) {
        res.status(500).send({ message: "Failed to replace software", error });
      }
    });

    app.patch("/software/:id", async (req, res) => {
      try {
        const result = await softwareCollection.updateOne(
          { _id: new ObjectId(req.params.id) },
          { $set: req.body }
        );
        if (result.matchedCount === 0) return res.status(404).send({ message: "Software not found" });
        res.status(200).send(result);
      } catch (error) {
        res.status(500).send({ message: "Failed to update software", error });
      }
    });

    app.delete("/software/:id", async (req, res) => {
      try {
        const result = await softwareCollection.deleteOne({ _id: new ObjectId(req.params.id) });
        if (result.deletedCount === 0) return res.status(404).send({ message: "Software not found" });
        res.status(200).send(result);
      } catch (error) {
        res.status(500).send({ message: "Failed to delete software", error });
      }
    });

    // ─── REVIEWS ─────────────────────────────────────────────────
    app.get("/reviews", async (req, res) => {
      try {
        const result = await reviewsCollection.find().toArray();
        res.status(200).send(result);
      } catch (error) {
        res.status(500).send({ message: "Failed to fetch reviews", error });
      }
    });

    app.get("/reviews/:id", async (req, res) => {
      try {
        const result = await reviewsCollection.findOne({ _id: new ObjectId(req.params.id) });
        if (!result) return res.status(404).send({ message: "Review not found" });
        res.status(200).send(result);
      } catch (error) {
        res.status(500).send({ message: "Failed to fetch review", error });
      }
    });

    app.post("/reviews", async (req, res) => {
      try {
        const result = await reviewsCollection.insertOne(req.body);
        res.status(201).send(result);
      } catch (error) {
        res.status(500).send({ message: "Failed to create review", error });
      }
    });

    app.put("/reviews/:id", async (req, res) => {
      try {
        const result = await reviewsCollection.replaceOne(
          { _id: new ObjectId(req.params.id) },
          req.body
        );
        if (result.matchedCount === 0) return res.status(404).send({ message: "Review not found" });
        res.status(200).send(result);
      } catch (error) {
        res.status(500).send({ message: "Failed to replace review", error });
      }
    });

    app.patch("/reviews/:id", async (req, res) => {
      try {
        const result = await reviewsCollection.updateOne(
          { _id: new ObjectId(req.params.id) },
          { $set: req.body }
        );
        if (result.matchedCount === 0) return res.status(404).send({ message: "Review not found" });
        res.status(200).send(result);
      } catch (error) {
        res.status(500).send({ message: "Failed to update review", error });
      }
    });

    app.delete("/reviews/:id", async (req, res) => {
      try {
        const result = await reviewsCollection.deleteOne({ _id: new ObjectId(req.params.id) });
        if (result.deletedCount === 0) return res.status(404).send({ message: "Review not found" });
        res.status(200).send(result);
      } catch (error) {
        res.status(500).send({ message: "Failed to delete review", error });
      }
    });

    // ─── USERS ───────────────────────────────────────────────────
    app.get("/users", async (req, res) => {
      try {
        const result = await userCollection.find().toArray();
        res.status(200).send(result);
      } catch (error) {
        res.status(500).send({ message: "Failed to fetch users", error });
      }
    });

    app.get("/users/:id", async (req, res) => {
      try {
        const result = await userCollection.findOne({ _id: new ObjectId(req.params.id) });
        if (!result) return res.status(404).send({ message: "User not found" });
        res.status(200).send(result);
      } catch (error) {
        res.status(500).send({ message: "Failed to fetch user", error });
      }
    });

    app.post("/users", async (req, res) => {
      try {
        const result = await userCollection.insertOne(req.body);
        res.status(201).send(result);
      } catch (error) {
        res.status(500).send({ message: "Failed to create user", error });
      }
    });

    app.put("/users/:id", async (req, res) => {
      try {
        const result = await userCollection.replaceOne(
          { _id: new ObjectId(req.params.id) },
          req.body
        );
        if (result.matchedCount === 0) return res.status(404).send({ message: "User not found" });
        res.status(200).send(result);
      } catch (error) {
        res.status(500).send({ message: "Failed to replace user", error });
      }
    });

    app.patch("/users/:id", async (req, res) => {
      try {
        const result = await userCollection.updateOne(
          { _id: new ObjectId(req.params.id) },
          { $set: req.body }
        );
        if (result.matchedCount === 0) return res.status(404).send({ message: "User not found" });
        res.status(200).send(result);
      } catch (error) {
        res.status(500).send({ message: "Failed to update user", error });
      }
    });

    app.delete("/users/:id", async (req, res) => {
      try {
        const result = await userCollection.deleteOne({ _id: new ObjectId(req.params.id) });
        if (result.deletedCount === 0) return res.status(404).send({ message: "User not found" });
        res.status(200).send(result);
      } catch (error) {
        res.status(500).send({ message: "Failed to delete user", error });
      }
    });

    // ─── EMAILS ──────────────────────────────────────────────────
    app.get("/emails", async (req, res) => {
      try {
        const result = await emailsCollection.find().toArray();
        res.status(200).send(result);
      } catch (error) {
        res.status(500).send({ message: "Failed to fetch emails", error });
      }
    });

    app.get("/emails/:id", async (req, res) => {
      try {
        const result = await emailsCollection.findOne({ _id: new ObjectId(req.params.id) });
        if (!result) return res.status(404).send({ message: "Email not found" });
        res.status(200).send(result);
      } catch (error) {
        res.status(500).send({ message: "Failed to fetch email", error });
      }
    });

    app.post("/emails", async (req, res) => {
      try {
        const result = await emailsCollection.insertOne(req.body);
        res.status(201).send(result);
      } catch (error) {
        res.status(500).send({ message: "Failed to save email", error });
      }
    });

    app.put("/emails/:id", async (req, res) => {
      try {
        const result = await emailsCollection.replaceOne(
          { _id: new ObjectId(req.params.id) },
          req.body
        );
        if (result.matchedCount === 0) return res.status(404).send({ message: "Email not found" });
        res.status(200).send(result);
      } catch (error) {
        res.status(500).send({ message: "Failed to replace email", error });
      }
    });

    app.patch("/emails/:id", async (req, res) => {
      try {
        const result = await emailsCollection.updateOne(
          { _id: new ObjectId(req.params.id) },
          { $set: req.body }
        );
        if (result.matchedCount === 0) return res.status(404).send({ message: "Email not found" });
        res.status(200).send(result);
      } catch (error) {
        res.status(500).send({ message: "Failed to update email", error });
      }
    });

    app.delete("/emails/:id", async (req, res) => {
      try {
        const result = await emailsCollection.deleteOne({ _id: new ObjectId(req.params.id) });
        if (result.deletedCount === 0) return res.status(404).send({ message: "Email not found" });
        res.status(200).send(result);
      } catch (error) {
        res.status(500).send({ message: "Failed to delete email", error });
      }
    });

    // ─── STATISTICS ──────────────────────────────────────────────
    app.get("/statistics", async (req, res) => {
      try {
        const result = await statisticsCollection.find().toArray();
        res.status(200).send(result);
      } catch (error) {
        res.status(500).send({ message: "Failed to fetch statistics", error });
      }
    });

    app.get("/statistics/:id", async (req, res) => {
      try {
        const result = await statisticsCollection.findOne({ _id: new ObjectId(req.params.id) });
        if (!result) return res.status(404).send({ message: "Statistic not found" });
        res.status(200).send(result);
      } catch (error) {
        res.status(500).send({ message: "Failed to fetch statistic", error });
      }
    });

    app.post("/statistics", async (req, res) => {
      try {
        const result = await statisticsCollection.insertOne(req.body);
        res.status(201).send(result);
      } catch (error) {
        res.status(500).send({ message: "Failed to create statistic", error });
      }
    });

    app.put("/statistics/:id", async (req, res) => {
      try {
        const result = await statisticsCollection.replaceOne(
          { _id: new ObjectId(req.params.id) },
          req.body
        );
        if (result.matchedCount === 0) return res.status(404).send({ message: "Statistic not found" });
        res.status(200).send(result);
      } catch (error) {
        res.status(500).send({ message: "Failed to replace statistic", error });
      }
    });

    app.patch("/statistics/:id", async (req, res) => {
      try {
        const result = await statisticsCollection.updateOne(
          { _id: new ObjectId(req.params.id) },
          { $set: req.body }
        );
        if (result.matchedCount === 0) return res.status(404).send({ message: "Statistic not found" });
        res.status(200).send(result);
      } catch (error) {
        res.status(500).send({ message: "Failed to update statistic", error });
      }
    });

    app.delete("/statistics/:id", async (req, res) => {
      try {
        const result = await statisticsCollection.deleteOne({ _id: new ObjectId(req.params.id) });
        if (result.deletedCount === 0) return res.status(404).send({ message: "Statistic not found" });
        res.status(200).send(result);
      } catch (error) {
        res.status(500).send({ message: "Failed to delete statistic", error });
      }
    });

    // ─── MESSAGES ────────────────────────────────────────────────
    app.get("/messages", async (req, res) => {
      try {
        const result = await messagesCollection.find().toArray();
        res.status(200).send(result);
      } catch (error) {
        res.status(500).send({ message: "Failed to fetch messages", error });
      }
    });

    app.get("/messages/:id", async (req, res) => {
      try {
        const result = await messagesCollection.findOne({ _id: new ObjectId(req.params.id) });
        if (!result) return res.status(404).send({ message: "Message not found" });
        res.status(200).send(result);
      } catch (error) {
        res.status(500).send({ message: "Failed to fetch message", error });
      }
    });

    app.post("/messages", async (req, res) => {
      try {
        const result = await messagesCollection.insertOne(req.body);
        res.status(201).send(result);
      } catch (error) {
        res.status(500).send({ message: "Failed to send message", error });
      }
    });

    app.patch("/messages/:id", async (req, res) => {
      try {
        const result = await messagesCollection.updateOne(
          { _id: new ObjectId(req.params.id) },
          { $set: req.body }
        );
        if (result.matchedCount === 0) return res.status(404).send({ message: "Message not found" });
        res.status(200).send(result);
      } catch (error) {
        res.status(500).send({ message: "Failed to update message", error });
      }
    });

    app.delete("/messages/:id", async (req, res) => {
      try {
        const result = await messagesCollection.deleteOne({ _id: new ObjectId(req.params.id) });
        if (result.deletedCount === 0) return res.status(404).send({ message: "Message not found" });
        res.status(200).send(result);
      } catch (error) {
        res.status(500).send({ message: "Failed to delete message", error });
      }
    });

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // await client.close();
  }
}

run().catch(console.dir);

app.listen(port, () => {
  console.log(`this server is running on ${port}`);
});

