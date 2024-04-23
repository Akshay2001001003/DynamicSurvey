
document.addEventListener("DOMContentLoaded", () => {
    let surveyResponse = {}; // Variable to store selected options
  
    const fetchQuestion = async (questionId) => {
      try {
        const response = await fetch(
          `http://localhost:3000/survey/questions/${questionId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch question");
        }
        const questionData = await response.json();
        console.log("Question Data:", questionData); // Log the question data
        return questionData;
      } catch (error) {
        console.error("Error fetching question:", error);
      }
    };
  
    const fetchOptions = async (questionId) => {
      try {
        const response = await fetch(
          `http://localhost:3000/survey/options/${questionId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch options");
        }
        const options = await response.json();
  
        const optionDiv = document.querySelector(".option");
        optionDiv.innerHTML = ""; // Clear previous options
  
        options.forEach((option) => {
          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.value = option.option_id;
          checkbox.id = `option_${option.option_id}`;
  
          const label = document.createElement("label");
          label.textContent = option.option_text;
          label.htmlFor = `option_${option.option_id}`;
  
          const optionContainer = document.createElement("div");
          optionContainer.appendChild(checkbox);
          optionContainer.appendChild(label);
  
          optionDiv.appendChild(optionContainer);
  
          checkbox.addEventListener("change", async() => {
            if (checkbox.checked) {
              // Store selected option in surveyResponse
              const nextQuestionId = option.question_id;
              surveyResponse[questionId] = option.option_id;
              await displayQuestionWithOptions(nextQuestionId);

            } else {
              // Remove deselected option from surveyResponse
              delete surveyResponse[questionId];
            }
          });
        });
        return options;
      } catch (error) {
        console.error("Error fetching options:", error);
        return [];
      }
    };
  
    const displayQuestionWithOptions = async (questionId) => {
      if (!questionId) {
        const sub = document.querySelector(".submit");
        document.querySelector(".Question").textContent = "Thank you!";
        document.querySelector(".option").innerHTML = "";
        const but = document.createElement("button");
        but.textContent = "Submit";
        but.className = "btn";
        sub.appendChild(but);
  
        but.addEventListener("click", async () => {
          await submitSurveyResponse(surveyResponse);
        });
  
        return;
      }
  
      const questionData = await fetchQuestion(questionId);
      const options = await fetchOptions(questionId);
  
      const questionDiv = document.querySelector(".Question");
      questionDiv.textContent = questionData.question_text;
    };
  
    displayQuestionWithOptions(1);
const submitSurveyResponse = async (surveyResponse) => {
      try {
        console.log(surveyResponse);
        const response = await fetch(
          `http://localhost:3000/survey/responses`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ surveyResponse }),
          }
        );
  
        if (!response.ok) {
          throw new Error("Failed to submit survey response");
        }
        console.log("Survey response submitted successfully.");
        location.reload();
      } catch (error) {
        console.error("Error submitting survey response:", error);
      }
    };
});