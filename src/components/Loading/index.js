import React from "react";

import "./styles.css";

export default class Loading extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div id="loading"></div>
                <svg id="ifpb-logo" version="1.1" /*xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"*/ preserveAspectRatio="xMidYMid meet">
                    <svg x="100" y="20">
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
                    </svg>

                
                    <circle cx="132" cy="43" r="0" fill="none" stroke="rgba(200,25,30,1)" stroke-width="2">
                    <animate attributeName="r" repeatCount="indefinite" dur="1s" values="0;40" keyTimes="0;1" keySplines="0 0.2 0.8 1" calcMode="spline" begin="0s"></animate>
                    <animate attributeName="opacity" repeatCount="indefinite" dur="1s" values="1;0" keyTimes="0;1" keySplines="0.2 0 0.8 1" calcMode="spline" begin="0s"></animate>
                    </circle>
                    <circle cx="132" cy="43" r="0" fill="none" stroke="#32a041" stroke-width="2">
                    <animate attributeName="r" repeatCount="indefinite" dur="1s" values="0;40" keyTimes="0;1" keySplines="0 0.2 0.8 1" calcMode="spline" begin="-0.5s"></animate>
                    <animate attributeName="opacity" repeatCount="indefinite" dur="1s" values="1;0" keyTimes="0;1" keySplines="0.2 0 0.8 1" calcMode="spline" begin="-0.5s"></animate>
                    </circle>
              
                </svg>
                
            </div>
        );
    }

    static loading(show = true) {
        if (show) {
            document.querySelector('#loading').style.display = 'block';        
            document.querySelector("#ifpb-logo").style.display = 'block';
            //console.log("showing loading...");
        }
        else {
            document.querySelector("#loading").style.display = 'none';
            document.querySelector("#ifpb-logo").style.display = 'none';
            //console.log("hiding loading...");
        }
    }

}