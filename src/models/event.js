export default class EventModel {
  constructor(data) {
    this._destination = data[`destination`];
    this.id = data[`id`];
    this.type = data[`type`];
    this.destination = this._destination[`name`];
    this.options = data[`offers`];
    this.info = this._destination[`description`];
    this.price = +data[`base_price`];
    this.isFavorite = data[`is_favorite`];
    this.fotos = this._destination[`pictures`];
    this.startTime = new Date(data[`date_from`]);
    this.endTime = new Date(data[`date_to`]);
    this.timeDif = this.endTime - this.startTime;
  }

  toRAW() {
    return {
      "id": this.id,
      "type": this.type,
      "offers": this.options,
      "destination": this._destination,
      "base_price": this.price,
      "is_favorite": this.isFavorite,
      "date_from": this.startTime,
      "date_to": this.endTime,
    };
  }

  static parseEvent(data) {
    return new EventModel(data);
  }

  static parseEvents(data) {
    return data.map(EventModel.parseEvent);
  }

  static clone(data) {
    return new EventModel(data.toRAW());
  }
}
