import { Component } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import "./index.css";

class AssessmentHome extends Component {
  state = {
    categoryId: 0,
  };

  handleChange = (selectedOption) => {
    this.setState({ categoryId: selectedOption.value });
  };

  selectItem = () => {
    const { categoryId } = this.state;
    console.log(categoryId);
    const options = [
      { value: "9", label: "General Knowledge" },
      { value: "17", label: "science & Nature" },
      { value: "18", label: "science:Computers" },
      { value: "19", label: "science:Mathematics" },
      { value: "30", label: "science:Gadgets" },
    ];
    return (
      <Select
        placeholder="Select Category"
        value={options.label}
        onChange={this.handleChange}
        options={options}
        className="bg-info w-70 mb-2 select-option "
      />
    );
  };
  render() {
    const { categoryId } = this.state;
    return (
      <div className="">
        <h1 className="text-white quiz-name">Testpress Assessment</h1>
        {this.selectItem()}
        <Link to={`/category/${categoryId}`}>
          <button className="bg-dark text-white start-btn" type="button">
            Start Assessment
          </button>
        </Link>
      </div>
    );
  }
}

export default AssessmentHome;
