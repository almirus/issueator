import {DOM_ELEMENTS_PREFIX} from "./const";

export function addCSS() {
    let style = document.createElement("style");
    style.innerHTML = `
        @media print {
            #${DOM_ELEMENTS_PREFIX}submit_error_button, #${DOM_ELEMENTS_PREFIX}error_message {
                display: none !important;
            }
        }
        #${DOM_ELEMENTS_PREFIX}result {
          position: absolute;
          top: 50%;
          left: 50%;
          margin-top: -25px;
          margin-left: -150px;
          width: 300px;
          height: 50px;
          padding: 10px;
          color: white;
          font: 15px/1.5 Helvetica, Verdana, sans-serif;
          background-color: #1ebee6;
          border-radius: 10px 10px 10px 10px;
          -moz-border-radius: 10px 10px 10px 10px;
          -webkit-border-radius: 10px 10px 10px 10px;
          border: 1px solid #000000;
        }
        #${DOM_ELEMENTS_PREFIX}result .close {
            position: relative;
            border-radius: 50%;
            background-color: #f40024;
            padding: 0 8px;
            cursor: pointer;
            color: white;
            height: 16px;
            float: right;
        }
        #${DOM_ELEMENTS_PREFIX}result .close:before, .close:after {
            position: absolute;
            content: ' ';
            height: 10px;
            margin-top: 3px;
            margin-left: -1px;
            width: 2px;
            background-color: white;
        }
        #${DOM_ELEMENTS_PREFIX}result .close:before {
            transform: rotate(45deg);
        }
        #${DOM_ELEMENTS_PREFIX}result .close:after {
            transform: rotate(-45deg);
        }
        #${DOM_ELEMENTS_PREFIX}result .close:hover {
            opacity: 1;
        }
        #${DOM_ELEMENTS_PREFIX}error_description {
          min-width:235px;min-height:100px;
        }
        #${DOM_ELEMENTS_PREFIX}submit_error_button {
          font: 15px/1.5 Helvetica, Verdana, sans-serif;
          position: fixed; top: 40px; left: 5px; z-index:100;
          padding:5px;
          color:white;
          background-color: #0095ff;
          border-color: #07c;
          box-shadow: inset 0 1px 0 #66bfff;
          cursor:pointer;
          opacity: 0.4;
        }
        #${DOM_ELEMENTS_PREFIX}error_message {
          position: fixed; top: 80px; left: 5px; z-index:100;
          padding-top : 40px;
          color:white;
        }
        #${DOM_ELEMENTS_PREFIX}submit_error_button span {
          max-width: 0;
          -webkit-transition: max-width 1s;
          transition: max-width 1s;
          display: inline-block;
          vertical-align: top;
          white-space: nowrap;
          overflow: hidden;
        }
        #${DOM_ELEMENTS_PREFIX}submit_error_button:hover {opacity: 1;}
        #${DOM_ELEMENTS_PREFIX}submit_error_button:hover span {max-width: 15rem;}`;
    document.body.appendChild(style);
}