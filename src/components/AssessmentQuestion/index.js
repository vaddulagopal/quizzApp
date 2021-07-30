import { Component } from "react";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import "./index.css";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import EachQuestion from "../EachQuestion";

class AssessmentQuestion extends Component {
  state = {
    data: "",
    questionIndex: 0,
    score: 0,
    showAnswers: false,
    isLoaderDisplayed: true,
    selectedOption: "",
  };

  componentDidMount() {
    this.getQuestionsData();
  }

  getQuestionsData = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const dataUrl = `https://opentdb.com/api.php?amount=10&category=${id}&type=multiple`;
    const response = await fetch(dataUrl);
    const jsonData = await response.json();
    const data = jsonData.results.map((question) => ({
      ...question,
      answers: [question.correct_answer, ...question.incorrect_answers].sort(
        () => Math.random() - 0.5
      ),
    }));

    const startDate = new Date();
    const startHours = startDate.getHours();
    const startMinutes = startDate.getMinutes();
    const startSeconds = startDate.getSeconds();
    const startTimeSeconds =
      startHours * 60 * 60 + startMinutes * 60 + startSeconds;
    this.setState({
      data: data,
      time: startTimeSeconds,
      isLoaderDisplayed: false,
    });
  };

  updateQuestionIndex = () => {
    this.setState((prevState) => ({
      questionIndex: prevState.questionIndex + 1,
      showAnswers: false,
    }));
  };

  updateScore = (value) => {
    const { showAnswers, data, questionIndex } = this.state;
    if (!showAnswers) {
      if (value === data[questionIndex].correct_answer) {
        this.setState((prevState) => ({ score: prevState.score + 1 }));
      }
    }
    this.setState({ showAnswers: true, selectedOption: value });
  };

  getScoreAndTime = (score) => {
    const { time } = this.state;
    const endDateTime = new Date();
    const endHours = endDateTime.getHours();
    const endMinutes = endDateTime.getMinutes();
    const endSeconds = endDateTime.getSeconds();

    const endTimeSeconds = endHours * 60 * 60 + endMinutes * 60 + endSeconds;
    const testTimeInSeconds = endTimeSeconds - time;
    let testTimeHours = Math.floor(testTimeInSeconds / 3600);
    const secondsForMinutes = testTimeInSeconds % 3600;
    let testTimeMinutes = Math.floor(secondsForMinutes / 60);
    const secondsForSeconds = secondsForMinutes % 60;
    let testTimeSeconds = Math.floor(secondsForSeconds);
    if (testTimeHours < 10) {
      testTimeHours = "0" + testTimeHours;
    }
    if (testTimeMinutes < 10) {
      testTimeMinutes = "0" + testTimeMinutes;
    }
    if (testTimeSeconds < 10) {
      testTimeMinutes = "0" + testTimeSeconds;
    }

    const timeTaken = `${testTimeHours} :${testTimeMinutes} :${testTimeSeconds}`;
    return (
      <div className="d-flex flex-column justify-content-center align-items-center">
        <h1 className="text-white score-result">{`Your Score is :${score}`}</h1>
        <h1 className="text-warning time-taken">{`time taken ${timeTaken}`}</h1>
        <Link to="/" className="hone-link">
          <button className="return-home-btn text-center">Home</button>
        </Link>
      </div>
    );
  };

  render() {
    const {
      data,
      questionIndex,
      score,
      showAnswers,
      isLoaderDisplayed,
      selectedOption,
    } = this.state;
    return (
      <div>
        {isLoaderDisplayed ? (
          <Loader type="TailSpin" color="#ffffff" height={50} width={50} />
        ) : (
          <>
            {questionIndex < data.length ? (
              <EachQuestion
                questionData={data[questionIndex]}
                updateQuestionIndex={this.updateQuestionIndex}
                updateScore={this.updateScore}
                showAnswers={showAnswers}
                selectedOption={selectedOption}
              />
            ) : (
              this.getScoreAndTime(score)
            )}
          </>
        )}
      </div>
    );
  }
}

export default AssessmentQuestion;
