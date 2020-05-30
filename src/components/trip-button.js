import AbstractSmartComponent from "./abstract-smart-component";

export default class TripButtonComponent extends AbstractSmartComponent {
  constructor() {
    super();

    this.disabledValue = false;
    this._newEventHandler = null;
  }

  getTemplate() {
    return (
      `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button" id = "control__new-event"${this.disabledValue ? `disabled` : ``}>New event</button>`
    );
  }

  setDisableValue(value) {
    this.disabledValue = value;
  }

  setDefaultValue() {
    this.disabledValue = false;
  }

  recoveryListeners() {
    this.setNewEventClickHandler(this._newEventHandler);
  }

  setNewEventClickHandler(handler) {
    this._newEventHandler = handler;
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      if (evt.target.tagName !== `BUTTON`) {
        return;
      }
      const disabledValue = evt.target.disabled;

      this.setDisableValue(!disabledValue);
      handler(this.disabledValue);
    });
  }
}
