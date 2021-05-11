import React, {Component} from "react";
import ConnectionError from "./connectionError";
// import NoContent from "./NoContent";

class ErrorBoundary extends Component {
  state = {
    hasError: false,
    errorMessage: "",
  };

  componentDidCatch = (error, info) => {
    this.setState({hasError: true, errorMessage: error});
  };

  render() {
    if (this.state.hasError) {
      return <ConnectionError msg={this.state.errorMessage} />;
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
