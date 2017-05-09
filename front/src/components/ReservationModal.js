import React, { Component } from 'react';
import { SkyLightStateless } from 'react-skylight';

import ReservationForm from './ReservationForm';


class ReservationModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: this.props.data.title,
      start: this.props.data.start,
      end: this.props.data.end
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleTitleChange(title) {
    this.setState({title: title});
  }

  handleStartChange(start) {
    this.setState({start: start});
  }

  handleEndChange(end) {
    this.setState({end: end});
  }

  handleCreate() {
    this.props.onCreate(this.state.title, this.state.start, this.state.end);
  }

  handleUpdate() {
    this.props.onUpdate(this.props.data.id, this.state.title,
                        this.state.start, this.state.end);
  }

  handleRemove() {
    this.props.onRemove(this.props.data.id);
  }

  handleCancel() {
    this.props.onCancel();
  }

  render() {
    let modalTitle;
    let modalButtons;
    switch (this.props.type) {
      case 'new':
        modalTitle = "Nouvelle réservation";
        modalButtons = (
          <div className="resa-buttons">
            <button className="reserve-btn" onClick={this.handleCreate}>Réserver</button>
            <button className="cancel-btn" onClick={this.handleCancel}>Annuler</button>
          </div>
        );
        break;

      case 'update':
        modalTitle = "Edition d'une réservation";
        modalButtons = (
          <div className="resa-buttons">
            <button className="remove-btn" onClick={this.handleRemove}>Supprimer</button>
            <button className="submit-btn" onClick={this.handleUpdate}>Modifier</button>
            <button className="cancel-btn" onClick={this.handleCancel}>Annuler</button>
          </div>
        );
        break;

      default:
        modalTitle = "";
        modalButtons = (
          <div className="resa-buttons">
            <button className="cancel-btn" onClick={this.handleCancel}>Annuler</button>
          </div>
        );
    }

    return (
      <SkyLightStateless
        title={modalTitle}
        onCloseClicked={this.props.onCancel}
        isVisible
      >
        <ReservationForm title={this.state.title}
                         start={this.state.start}
                         end={this.state.end}
                         onTitleChange={this.handleTitleChange}
                         onStartChange={this.handleStartChange}
                         onEndChange={this.handleEndChange}/>
        {modalButtons}
      </SkyLightStateless>
    );
  }
}


ReservationModal.propTypes = {
  data: React.PropTypes.object.isRequired,
  type: React.PropTypes.string.isRequired,
  onCancel: React.PropTypes.func.isRequired,
  onCreate: React.PropTypes.func.isRequired,
  onUpdate: React.PropTypes.func.isRequired,
  onRemove: React.PropTypes.func.isRequired,
};


export default ReservationModal;
