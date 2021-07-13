import React from "react";

import "./styles.css";

import $ from "jquery";

export default class Loading extends React.Component {

    constructor(props) {
        super(props);
        this.intervalAnimationId = undefined;
    }

    render() {
        return (
            <div>
                <div id="loading"></div>
                <svg id="SVG-Circus-74e20725-7c12-018a-eab7-40bdd51ab88d" version="1.1" /*xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"*/ viewBox="0 0 100 120" preserveAspectRatio="xMidYMid meet">
                    <rect id="actor_10" x="42.5" y="69.5" rx="2" ry="2" width="15" height="15" opacity="1" fill="rgba(50,160,65,1)" fill-opacity="1" stroke="" stroke-width="0" stroke-opacity="1" stroke-dasharray=""></rect>
                    <rect id="actor_9" x="24.5" y="69.5" rx="2" ry="2" width="15" height="15" opacity="1" fill="rgba(50,160,65,1)" fill-opacity="1" stroke="" stroke-width="0" stroke-opacity="1" stroke-dasharray=""></rect>
                    <rect id="actor_8" x="60.5" y="51.5" rx="2" ry="2" width="15" height="15" opacity="1" fill="rgba(50,160,65,1)" fill-opacity="1" stroke="" stroke-width="0" stroke-opacity="1" stroke-dasharray=""></rect>
                    <rect id="actor_7" x="42.5" y="51.5" rx="2" ry="2" width="15" height="15" opacity="1" fill="rgba(50,160,65,1)" fill-opacity="1" stroke="" stroke-width="0" stroke-opacity="1" stroke-dasharray=""></rect>
                    <rect id="actor_6" x="24.5" y="51.5" rx="2" ry="2" width="15" height="15" opacity="1" fill="rgba(50,160,65,1)" fill-opacity="1" stroke="" stroke-width="0" stroke-opacity="1" stroke-dasharray=""></rect>
                    <rect id="actor_5" x="42.5" y="33.5" rx="2" ry="2" width="15" height="15" opacity="1" fill="rgba(50,160,65,1)" fill-opacity="1" stroke="" stroke-width="0" stroke-opacity="1" stroke-dasharray=""></rect>
                    <rect id="actor_4" x="24.5" y="33.5" rx="2" ry="2" width="15" height="15" opacity="1" fill="rgba(50,160,65,1)" fill-opacity="1" stroke="" stroke-width="0" stroke-opacity="1" stroke-dasharray=""></rect>
                    <rect id="actor_3" x="60.5" y="15.5" rx="2" ry="2" width="15" height="15" opacity="1" fill="rgba(50,160,65,1)" fill-opacity="1" stroke="" stroke-width="0" stroke-opacity="1" stroke-dasharray=""></rect>
                    <rect id="actor_2" x="42.5" y="15.5" rx="2" ry="2" width="15" height="15" opacity="1" fill="rgba(50,160,65,1)" fill-opacity="1" stroke="" stroke-width="0" stroke-opacity="1" stroke-dasharray=""></rect>
                    <circle id="actor_1" cx="32" cy="23" r="7.5" opacity="1" fill="rgba(200,25,30,1)" fill-opacity="1" stroke="rgba(166,3,17,1)" stroke-width="0" stroke-opacity="1" stroke-dasharray=""></circle>
                    <text fill="#738087" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'" font-size="15px" text-anchor="middle">
                        <tspan x="50" y="110">AGUARDE...</tspan>
                    </text>
                </svg>
            </div>
        );
    }

    static loading(show = true) {
        if (show) {
            $('#loading').show();
            this.intervalAnimationId  = Loading.fadeloop('#SVG-Circus-74e20725-7c12-018a-eab7-40bdd51ab88d', 1500, 1200, true);
            $("#SVG-Circus-74e20725-7c12-018a-eab7-40bdd51ab88d").show();
        }
        else {
            $("#loading").hide();
            clearInterval(this.intervalAnimationId);
            $("#SVG-Circus-74e20725-7c12-018a-eab7-40bdd51ab88d").hide();
        }
    }

    static fadeloop(el, timeout, timein, loop) {
        var $el = $(el), intId, fn = function () {
            $el.fadeOut(timeout).fadeIn(timein);
        };
        fn();
        if (loop) {
            intId = setInterval(fn, timeout + timein + 100);
            return intId;
        }
        return false;
    }
}