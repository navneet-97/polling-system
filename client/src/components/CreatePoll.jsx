import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { createPoll } from '../store/actions';

class CreatePoll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      options: ['', ''],
      showModal: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.addAnswer = this.addAnswer.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.createNewPoll = this.createNewPoll.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  addAnswer() {
    this.setState({ options: [...this.state.options, ''] });
  }

  handleAnswer(e, index) {
    const options = [...this.state.options];
    options[index] = e.target.value;
    this.setState({ options });
  }

  async handleSubmit(e) {
    e.preventDefault();
    await this.props.createPoll(this.state);
    this.setState({ showModal: true, question: '', options: ['', ''] });
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  createNewPoll() {
    this.setState({
      question: '',
      options: ['', ''],
      showModal: false,
    });
  }

  render() {
    const options = this.state.options.map((option, i) => (
      <Fragment key={i}>
        <label className="form-label">Option</label>
        <input
          className="form-input"
          type="text"
          value={option}
          onChange={e => this.handleAnswer(e, i)}
        />
      </Fragment>
    ));

    return (
      <Fragment>
        <form className="form" onSubmit={this.handleSubmit}>
          <label className="form-label" htmlFor="question">
            Question
          </label>
          <input
            className="form-input"
            type="text"
            name="question"
            value={this.state.question}
            onChange={this.handleChange}
          />
          <div className="container">{options}</div>
          <div className="buttons_center">
            <button className="button" type="button" onClick={this.addAnswer}>
              Add options
            </button>
            <button className="button" type="submit">
              Submit
            </button>
          </div>
        </form>

        {this.state.showModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>Poll Created!</h2>
              <p>Your poll has been successfully created.</p>
              <div className="modal-buttons">
                <button className="button" onClick={this.createNewPoll}>
                  Create New Poll
                </button>
                <button className="button" onClick={this.closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}

export default connect(() => ({}), { createPoll })(CreatePoll);
