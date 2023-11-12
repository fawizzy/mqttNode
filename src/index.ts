import * as mqtt from "mqtt";
const client = mqtt.connect("mqtt://test.mosquitto.org");
import express from "express";
import { connectionSource } from "./db/data-source";
import { gas_scale, Users } from "./db/entities";
const app = express();
const port = 3000;

connectionSource
  .initialize()
  .then(async () => {
    console.log("Database Connected");
  })
  .catch((error) => console.log(error));

client.on("connect", () => {
  client.subscribe("real_unique_topic", (err) => {
    if (!err) {
      client.publish("presence", "Hello mqtt");
    }
  });
});

client.on("message", async (topic, message) => {
  // message is Buffer
  const messageString = String(message.toString());
  const messageJSON = JSON.parse(messageString);

  const gasRepository = connectionSource.getRepository(gas_scale);

  if (connectionSource.isInitialized) {
    const scaleExist = await gasRepository.findOne({
      where: { id: messageJSON.id },
    });
    if (scaleExist) {
      console.log(scaleExist);
      scaleExist.weight.push(messageJSON.weight);
      scaleExist.time.push(new Date(messageJSON.time));
      const saved = await gasRepository.save(scaleExist);
      console.log(saved);
    } else {
      const newGasData = new gas_scale();
      newGasData.id = messageJSON.id;
      newGasData.weight = [messageJSON.weight];
      newGasData.time = [new Date(messageJSON.time)];
      await gasRepository.save(newGasData);
    }
  }

  //client.end();
});

// Define a route
app.get("/", async (req, res) => {
  const gasRepository = connectionSource.getRepository(gas_scale);

  if (connectionSource.isInitialized) {
    const record = await gasRepository.find();
    res.status(200).json(record);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
