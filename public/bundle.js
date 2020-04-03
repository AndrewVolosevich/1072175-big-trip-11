/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/components/trip-event-form.js":
/*!*******************************************!*\
  !*** ./src/components/trip-event-form.js ***!
  \*******************************************/
/*! exports provided: createTripEventForm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTripEventForm", function() { return createTripEventForm; });
const createTripEventForm = () => {
  return (
    `<form class="trip-events__item  event  event--edit" action="#"   method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="../markup/img/icons/bus.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden"  id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Transfer</legend>

              <div class="event__type-item">
                <input id="event-type-taxi-1" class="event__type-input    visually-hidden" type="radio" name="event-type" value="taxi">
                <label class="event__type-label  event__type-label--taxi"   for="event-type-taxi-1">Taxi</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-bus-1" class="event__type-input   visually-hidden" type="radio" name="event-type" value="bus"  checked>
                <label class="event__type-label  event__type-label--bus"  for="event-type-bus-1">Bus</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-train-1" class="event__type-input   visually-hidden" type="radio" name="event-type" value="train">
                <label class="event__type-label  event__type-label--train"  for="event-type-train-1">Train</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-ship-1" class="event__type-input    visually-hidden" type="radio" name="event-type" value="ship">
                <label class="event__type-label  event__type-label--ship"   for="event-type-ship-1">Ship</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-transport-1" class="event__type-input   visually-hidden" type="radio" name="event-type" value="transport">
                <label class="event__type-label  event__type-label--transport"  for="event-type-transport-1">Transport</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-drive-1" class="event__type-input   visually-hidden" type="radio" name="event-type" value="drive">
                <label class="event__type-label  event__type-label--drive"  for="event-type-drive-1">Drive</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-flight-1" class="event__type-input    visually-hidden" type="radio" name="event-type" value="flight">
                <label class="event__type-label  event__type-label--flight"   for="event-type-flight-1">Flight</label>
              </div>
            </fieldset>

            <fieldset class="event__type-group">
              <legend class="visually-hidden">Activity</legend>

              <div class="event__type-item">
                <input id="event-type-check-in-1" class="event__type-input    visually-hidden" type="radio" name="event-type" value="check-in">
                <label class="event__type-label  event__type-label--check-in"   for="event-type-check-in-1">Check-in</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-sightseeing-1" class="event__type-input   visually-hidden" type="radio" name="event-type"  value="sightseeing">
                <label class="event__type-label  event__type-label--sightseeing"  for="event-type-sightseeing-1">Sightseeing</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-restaurant-1" class="event__type-input    visually-hidden" type="radio" name="event-type" value="restaurant">
                <label class="event__type-label  event__type-label--restaurant"   for="event-type-restaurant-1">Restaurant</label>
              </div>
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output"   for="event-destination-1">
            Bus to
          </label>
          <input class="event__input  event__input--destination"  id="event-destination-1" type="text" name="event-destination" value=""   list="destination-list-1">
          <datalist id="destination-list-1">
            <option value="Amsterdam"></option>
            <option value="Geneva"></option>
            <option value="Chamonix"></option>
            <option value="Saint Petersburg"></option>
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1"   type="text" name="event-start-time" value="18/03/19 00:00">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1"   type="text" name="event-end-time" value="18/03/19 00:00">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1"   type="text" name="event-price" value="">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
      </header>
    </form>`
  );
};


/***/ }),

/***/ "./src/components/trip-event-item.js":
/*!*******************************************!*\
  !*** ./src/components/trip-event-item.js ***!
  \*******************************************/
/*! exports provided: createTripEventItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTripEventItem", function() { return createTripEventItem; });
const createTripEventItem = () => {
  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="../markup/img/icons/drive.png" alt="Event type icon">
        </div>
        <h3 class="event__title">Drive to Chamonix</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T14:30">14:30</ time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-18T16:05">16:05</time>
          </p>
          <p class="event__duration">1H 35M</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">160</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          <li class="event__offer">
            <span class="event__offer-title">Rent a car</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">200</span>
           </li>
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};


/***/ }),

/***/ "./src/components/trip-filters.js":
/*!****************************************!*\
  !*** ./src/components/trip-filters.js ***!
  \****************************************/
/*! exports provided: createTripFilters */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTripFilters", function() { return createTripFilters; });
const createTripFilters = () => {
  return (
    `<form class="trip-filters" action="#" method="get">
      <div class="trip-filters__filter">
        <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>
        <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
      </div>

      <div class="trip-filters__filter">
        <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">
        <label class="trip-filters__filter-label" for="filter-future">Future</label>
      </div>

      <div class="trip-filters__filter">
        <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past">
        <label class="trip-filters__filter-label" for="filter-past">Past</label>
      </div>

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};


/***/ }),

/***/ "./src/components/trip-info.js":
/*!*************************************!*\
  !*** ./src/components/trip-info.js ***!
  \*************************************/
/*! exports provided: createTripInfo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTripInfo", function() { return createTripInfo; });
const createTripInfo = () => {
  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</  h1>

        <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
      </p>
    </section>`
  );
};


/***/ }),

/***/ "./src/components/trip-moki-days.js":
/*!******************************************!*\
  !*** ./src/components/trip-moki-days.js ***!
  \******************************************/
/*! exports provided: createMokiTripDays */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createMokiTripDays", function() { return createMokiTripDays; });
const createMokiTripDays = () => {
  return (
    `<ul class="trip-days">
      <li class="trip-days__item  day">
        <div class="day__info"></div>
        <ul class="trip-events__list">
        </ul>
      </li>
    </ul>`
  );
};


/***/ }),

/***/ "./src/components/trip-sorting.js":
/*!****************************************!*\
  !*** ./src/components/trip-sorting.js ***!
  \****************************************/
/*! exports provided: createTripSorting */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTripSorting", function() { return createTripSorting; });
const createTripSorting = () => {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      <span class="trip-sort__item  trip-sort__item--day"></span>

      <div class="trip-sort__item  trip-sort__item--event">
        <input id="sort-event" class="trip-sort__input  visually-hidden"  type="radio" name="trip-sort" value="sort-event">
        <label class="trip-sort__btn" for="sort-event">Event</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--time">
        <input id="sort-time" class="trip-sort__input  visually-hidden"   type="radio" name="trip-sort" value="sort-time" checked>
        <label class="trip-sort__btn  trip-sort__btn--active    trip-sort__btn--by-increase" for="sort-time">
          Time
        </label>
      </div>

      <div class="trip-sort__item  trip-sort__item--price">
        <input id="sort-price" class="trip-sort__input  visually-hidden"  type="radio" name="trip-sort" value="sort-price">
        <label class="trip-sort__btn" for="sort-price">
          Price
        </label>
      </div>
      <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
    </form>`
  );
};


/***/ }),

/***/ "./src/components/trip-tabs.js":
/*!*************************************!*\
  !*** ./src/components/trip-tabs.js ***!
  \*************************************/
/*! exports provided: createTripTabs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTripTabs", function() { return createTripTabs; });
const createTripTabs = () => {
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
      <a class="trip-tabs__btn" href="#">Stats</a>
    </nav>`
  );
};


/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_trip_info__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/trip-info */ "./src/components/trip-info.js");
/* harmony import */ var _components_trip_tabs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/trip-tabs */ "./src/components/trip-tabs.js");
/* harmony import */ var _components_trip_filters__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/trip-filters */ "./src/components/trip-filters.js");
/* harmony import */ var _components_trip_sorting__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/trip-sorting */ "./src/components/trip-sorting.js");
/* harmony import */ var _components_trip_event_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/trip-event-form */ "./src/components/trip-event-form.js");
/* harmony import */ var _components_trip_moki_days__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/trip-moki-days */ "./src/components/trip-moki-days.js");
/* harmony import */ var _components_trip_event_item__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/trip-event-item */ "./src/components/trip-event-item.js");








const MAX_ITEMS = 3;

const renderTemplate = (container, template, position = `beforeend`) => {
  container.insertAdjacentHTML(position, template);
};

const mainTripElem = document.querySelector(`.trip-main`);
const tripControlsElem = document.querySelector(`.trip-controls`);
const tripEventsElem = document.querySelector(`.trip-events`);

renderTemplate(mainTripElem, Object(_components_trip_info__WEBPACK_IMPORTED_MODULE_0__["createTripInfo"])(), `afterbegin`);
renderTemplate(tripControlsElem.querySelector(`h2`), Object(_components_trip_tabs__WEBPACK_IMPORTED_MODULE_1__["createTripTabs"])(), `afterend`);
renderTemplate(tripControlsElem, Object(_components_trip_filters__WEBPACK_IMPORTED_MODULE_2__["createTripFilters"])());
renderTemplate(tripEventsElem, Object(_components_trip_sorting__WEBPACK_IMPORTED_MODULE_3__["createTripSorting"])());
renderTemplate(tripEventsElem, Object(_components_trip_event_form__WEBPACK_IMPORTED_MODULE_4__["createTripEventForm"])());
renderTemplate(tripEventsElem, Object(_components_trip_moki_days__WEBPACK_IMPORTED_MODULE_5__["createMokiTripDays"])());

const tripEventsListElem = document.querySelector(`.trip-events__list`);

for (let i = 1; i <= MAX_ITEMS; i++) {
  renderTemplate(tripEventsListElem, Object(_components_trip_event_item__WEBPACK_IMPORTED_MODULE_6__["createTripEventItem"])());
}


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map