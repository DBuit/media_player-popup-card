import { LitElement, html, css } from 'lit-element';
import tinycolor, { TinyColor, isReadable } from '@ctrl/tinycolor';
import { closePopUp } from 'card-tools/src/popup';
import {
  computeStateDisplay
} from 'custom-card-helpers';
class MediaPlayerPopupCard extends LitElement {
  config: any;
  hass: any;
  shadowRoot: any;
  actionRows:any = [];

  static get properties() {
    return {
      hass: {},
      config: {},
      active: {}
    };
  }
  
  constructor() {
    super();
  }
  
  render() {
    
    var entity = this.config.entity;
    var stateObj = this.hass.states[entity];
    var actionsInARow = this.config.actionsInARow ? this.config.actionsInARow : 4;
    var icon = this.config.icon ? this.config.icon : stateObj.attributes.icon ? stateObj.attributes.icon: 'mdi:speaker';
    var borderRadius = this.config.borderRadius ? this.config.borderRadius : '12px';  
    
    //Actions
    var actions = this.config.actions;
    if(actions && actions.length > 0) {
        
        var numberOfRows = Math.ceil(actions.length / actionsInARow);
        for(var i=0;i<numberOfRows;i++) {
          this.actionRows[i] = [];
            for(var j=0;j<actionsInARow;j++) {
                if(actions[(i*actionsInARow)+j]) {
                  this.actionRows[i][j] = actions[(i*actionsInARow)+j];
                }
            }
        }
    }

    var fullscreen = "fullscreen" in this.config ? this.config.fullscreen : true;
    var sliderWidth = this.config.sliderWidth ? this.config.sliderWidth : "150px";
    var sliderHeight = this.config.sliderHeight ? this.config.sliderHeight : "400px";
    var offStates = ['off', 'unavailable', 'paused'];
    var actionRowCount = 0;
    return html`
      <div class="${fullscreen === true ? 'popup-wrapper':''}">
            <div class="popup-inner" @click="${e => this._close(e)}">
                <div class="icon fullscreen${offStates.includes(stateObj.state) ? '' : ' on'}">
                    <ha-icon icon="${icon}" />
                </div>
                <h4 class="${stateObj.state === "off" ? '' : 'brightness'}">${stateObj.state === "off" ? computeStateDisplay(this.hass.localize, stateObj, this.hass.language) : Math.round(stateObj.attributes.volume_level * 100)}</h4>
                <div class="range-holder" style="--slider-height: ${sliderHeight};--slider-width: ${sliderWidth};">
                    <input type="range" style="--slider-width: ${sliderWidth};--slider-height: ${sliderHeight}; --slider-border-radius: ${borderRadius}" .value="${stateObj.state === "off" ? 0 : Math.round(stateObj.attributes.volume_level * 100)}" @change=${e => this._setVolume(stateObj, e.target.value)}>
                </div>

                ${actions && actions.length > 0 ? html`
                <div class="action-holder">

                    ${this.actionRows.map((actionRow) => {
                      actionRowCount++;
                      var actionCount = 0;
                      return html`
                        <div class="action-row">
                        ${actionRow.map((action) => {
                          actionCount++;
                          return html`
                            <div class="action" @click="${e => this._activateAction(e)}" data-service="${actionRowCount}#${actionCount}">
                                <span class="color" style="background-color: ${action.color};border-color: ${action.color};">${action.icon ? html`<ha-icon icon="${action.icon}" />`:html``}</span>
                                ${action.name ? html`<span class="name">${action.name}</span>`: html``}
                            </div>
                          `
                        })}
                        </div>
                      `
                    })}
                </div>` : html ``}
            </div>
        </div>
    `;
  }
  
  updated() { }

  _close(event) {
    if(event && event.target.className === 'popup-inner') {
        closePopUp();
    }
  }

  _createRange(amount) {
    const items: any = [];
    for (let i = 0; i < amount; i++) {
      items.push(i);
    }
    return items;
  }
  
  _setVolume(state, value) {
    this.hass.callService("media_player", "volume_set", {
        entity_id: state.entity_id,
        volume_level: value / 100
    });
  }
  
  _activateAction(e) {
    if(e.target.dataset && e.target.dataset.service) {
      const [row, item] = e.target.dataset.service.split("#", 2);
      const action = this.actionRows[row-1][item-1];
      const [domain, service] = action.service.split(".", 2);
      if(action.service_data.entity_id && action.service_data.entity_id == 'this') {
        action.service_data.entity_id = this.config.entity;
      }

      this.hass.callService(domain, service, action.service_data);
    }
  }
  
  setConfig(config) {
    if (!config.entity) {
      throw new Error("You need to define an entity");
    }
    this.config = config;
  }

  getCardSize() {
    return this.config.entities.length + 1;
  }
  
  static get styles() {
    return css`
        :host {
            background-color:#000!important;
        }
        .popup-wrapper {
            margin-top:64px;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
        }
        .popup-inner {
            height: 100%;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
        }
        .fullscreen {
          margin-top:-64px;
        }
        .icon {
            text-align:center;
            display:block;
            height: 40px;
            width: 40px;
            color: rgba(255,255,255,0.3);
            font-size: 30px;
            padding-top:5px;
        }
        .icon ha-icon {
            width:30px;
            height:30px;
        }
        .icon.on ha-icon {
            fill: #f7d959;
        }
        h4 {
            color: #FFF;
            display: block;
            font-weight: 300;
            margin-bottom: 30px;
            text-align: center;
            font-size:20px;
            margin-top:0;
            text-transform: capitalize;
        }
        h4.brightness:after {
            content: "%";
            padding-left: 1px;
        }
        
        .range-holder {
            height: var(--slider-height);
            width: var(--slider-width);
            position:relative;
            display: block;
        }
        .range-holder input[type="range"] {
            outline: 0;
            border: 0;
            border-radius: var(--slider-border-radius, 12px);
            width: var(--slider-height);
            margin: 0;
            transition: box-shadow 0.2s ease-in-out;
            -webkit-transform:rotate(270deg);
            -moz-transform:rotate(270deg);
            -o-transform:rotate(270deg);
            -ms-transform:rotate(270deg);
            transform:rotate(270deg);
            overflow: hidden;
            height: var(--slider-width);
            -webkit-appearance: none;
            background-color: #ddd;
            position: absolute;
            top: calc(50% - (var(--slider-width) / 2));
            right: calc(50% - (var(--slider-height) / 2));
        }
        .range-holder input[type="range"]::-webkit-slider-runnable-track {
            height: var(--slider-width);
            -webkit-appearance: none;
            color: #ddd;
            margin-top: -1px;
            transition: box-shadow 0.2s ease-in-out;
        }
        .range-holder input[type="range"]::-webkit-slider-thumb {
            width: 25px;
            border-right:10px solid #FFF;
            border-left:10px solid #FFF;
            border-top:20px solid #FFF;
            border-bottom:20px solid #FFF;
            -webkit-appearance: none;
            height: 80px;
            cursor: ew-resize;
            background: #fff;
            box-shadow: -350px 0 0 350px #FFF, inset 0 0 0 80px #ddd;
            border-radius: 0;
            transition: box-shadow 0.2s ease-in-out;
            position: relative;
            top: calc((var(--slider-width) - 80px) / 2);
        }
        
        .action-holder {
            display: flex;
            flex-direction: column;
            margin-top:20px;
        }
        .action-row {
            display:block;
            padding-bottom:10px;
        }
        .action-row:last-child {
            padding:0;
        }
        .action-holder .action {
            display:inline-block;
            margin-right:10px;
            cursor:pointer;
        }
        .action-holder .action:nth-child(4n) {
            margin-right:0;
        }
        .action-holder .action .color {
            width:50px;
            height:50px;
            border-radius:50%;
            display:block;
            border: 1px solid #FFF;
            line-height: 50px;
            text-align: center;
            pointer-events: none;
        }
        .action-holder .action .color ha-icon {
          pointer-events: none;
        }
        .action-holder .action .name {
            width:50px;
            display:block;
            color: #FFF;
            font-size: 9px;
            margin-top:3px;
            text-align:center;
            pointer-events: none;
        }
    `;
  }  
  
}

customElements.define('media_player-popup-card', MediaPlayerPopupCard);
