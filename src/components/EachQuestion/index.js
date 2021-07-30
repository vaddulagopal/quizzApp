import React from "react";
import "./index.css";
function EachQuestion(props) {
  const {
    updateQuestionIndex,
    updateScore,
    showAnswers,
    questionData,
    selectedOption,
  } = props;
  const { answers, correct_answer, question } = questionData;
  const getNextQuestion = () => {
    updateQuestionIndex();
  };

  const validateResult = (value) => {
    if (!showAnswers) {
      updateScore(value.target.value);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center p-5">
      <h1
        dangerouslySetInnerHTML={{ __html: question }}
        className="text-dark question"
      ></h1>
      <div className="d-flex flex-wrap options-container ">
        {answers.map((answer, index) => {
          console.log(showAnswers);
          let textColor;
          if (showAnswers) {
            if (answer === correct_answer) {
              textColor = "bg-success text-white";
            } else if (answer === selectedOption) {
              textColor = "bg-danger text-white";
            } else textColor = "bg-white text-purple-800";
          } else textColor = "bg-white text-purple-800";
          return (
            <button
              dangerouslySetInnerHTML={{ __html: answer }}
              className={`${textColor} option mr-5 p-2 `}
              key={index}
              type="radio"
              onClick={validateResult}
              value={answer}
              name="question"
            ></button>
          );
        })}
      </div>
      {showAnswers && (
        <button
          type="button"
          onClick={getNextQuestion}
          className="bg-info border-0 next-btn align-self-end"
        >
          Next Question
        </button>
      )}
    </div>
  );
}

export default EachQuestion;
