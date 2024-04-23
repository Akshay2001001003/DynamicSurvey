import express from "express";
import bodyParser from "body-parser";
import connection from "./connection.js";
import cors from "cors";

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Route to retrieve survey questions
app.get("/survey/questions", async (req, res) => {
  try {
    const client = await connection();
    const result = await client.query("SELECT * FROM surveyquestion");
    res.json(result.rows);
  } catch (err) {
    console.error("Error retrieving survey questions:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.get("/survey/questions/1", async (req, res) => {
  try {
    const client = await connection();
    const result = await client.query(
      "SELECT * FROM surveyquestion WHERE question_id = 1"
    );
    res.json(result.rows[0]); // Assuming there is only one question with ID 1
  } catch (err) {
    console.error("Error retrieving survey question:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.get("/survey/questions/:questionId", async (req, res) => {
  const { questionId } = req.params;
  try {
    const client = await connection();
    const result = await client.query(
      "SELECT * FROM surveyquestion WHERE question_id = $1",
      [questionId]
    );
    if (result.rows.length === 0) {
      // If no question is found for the given ID, return a 404 Not Found response
      res.status(404).json({ error: "Question not found" });
    } else {
      // If a question is found, return it
      res.json(result.rows[0]);
    }
  } catch (err) {
    console.error("Error retrieving survey question:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to retrieve options for a specific question
app.get("/survey/options/:questionId", async (req, res) => {
  const { questionId } = req.params;
  try {
    if (!questionId) {
      return res.json({ message: "Thank you!" });
    }
    const client = await connection();
    const result = await client.query(
      "SELECT * FROM option WHERE option_id = ANY (SELECT unnest(option_ids) FROM surveyquestion WHERE question_id = $1)",
      [questionId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error retrieving options for question:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/survey/responses", async (req, res) => {
    try {
      const { surveyResponse } = req.body;
  
      // Insert the survey response into the database
      const query =
        "INSERT INTO SurveyResponse (response) VALUES ($1)";
      const values = [surveyResponse];
      const client = await connection();
      const result = await client.query(query, values);
    //   client.release();
  
      // Send the inserted response back as the response
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error("Error inserting survey response:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
