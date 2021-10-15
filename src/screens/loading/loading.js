import React from "react";
import { Screen } from "@components";
import styles from "./loading.style";
import { WebView } from "react-native-webview";

const firstHtml =
  "<html><head><style>html, body { margin:0; padding:0; overflow:hidden } svg { position:fixed; top:0; left:0; height:100%; width:100% }</style></head><body>";
const lastHtml = "</body></html>";
const contentSvg = `<?xml version="1.0" encoding="utf-8"?>
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 458.4 157.3" style="enable-background:new 0 0 458.4 157.3;" xml:space="preserve">
<style type="text/css">
	.st0{clip-path:url(#SVGID_2_);}
	.st1{fill:url(#first)}
	.st4{fill:url(#last)}
	.st2{clip-path:url(#SVGID_4_);}
	.st3{clip-path:url(#luz_1_);fill:none; stroke: url(#center); stroke-width: 40; }
	#p, #o
	{
		animation: circ 1s ease-in forwards; 
		transform-origin: center;
		transform-box: fill-box;
	}
	@keyframes circ
	{
		from
		{
			transform: scale(0);
		}
	}
	.iXCqFfmJ_0{stroke-dasharray:800 802;stroke-dashoffset:801;
		animation:iXCqFfmJ_draw 1s linear forwards 0s;}
	@keyframes iXCqFfmJ_draw{100%{stroke-dashoffset:0;}}
</style>
<defs>
	<linearGradient id="first" x1="0" x2="100%" y1="0" y2="0">
		<stop stop-color="#2ef9f4" offset="0%"/>
		<stop stop-color="#3ae0f5" offset="100%"/> 
	</linearGradient>
</defs>
<defs>
	<linearGradient id="center" x1="0" x2="100%" y1="0" y2="0" >
		<stop stop-color="#3bddf5" offset="0%"/>
		<stop stop-color="#58a0f6" offset="100%"/> 
	</linearGradient>
</defs>
<defs>
	<linearGradient id="last" x1="0" x2="100%" y1="0" y2="0">
		<stop stop-color="#599ef6" offset="0%"/>
		<stop stop-color="#6585f7" offset="100%"/> 
	</linearGradient>
</defs>
<g>
	<defs>
		<path id="SVGID_1_" d="M451.8,54.9c-4.4-7.2-10.6-13.1-18.1-17c-16.4-8.1-35.6-8.1-52,0c-7.5,3.9-13.8,9.8-18.2,17
			c-4.4,7.4-6.7,16-6.6,24.6c-0.1,8.7,2.1,17.2,6.6,24.6c4.4,7.2,10.7,13.1,18.2,17c16.4,8.1,35.6,8.1,52,0
			c7.5-3.9,13.8-9.8,18.1-17c4.4-7.4,6.7-16,6.6-24.6C458.5,70.9,456.2,62.4,451.8,54.9z M422.1,95.6c-3.7,3.9-8.9,6.1-14.3,5.9
			c-5.4,0.2-10.7-1.9-14.4-5.9c-3.8-4-5.7-9.2-5.7-16s1.9-12.1,5.7-16c3.7-3.9,9-6.1,14.4-5.9c5.4-0.2,10.6,1.9,14.3,5.9
			c3.8,4,5.6,9.2,5.6,16.1S425.9,91.6,422.1,95.6z"/>
	</defs>
	<clipPath id="SVGID_2_">
		<use xlink:href="#SVGID_1_"  style="overflow:visible;"/>
	</clipPath>
	<g class="st0">
		<circle id="o" class="st4" cx="407" cy="77.9" r="88"/>
	</g>
</g>
<g>
	<defs>
		<path id="SVGID_3_" d="M77.6,37.8c-7.2-4-15.2-6-23.4-5.9H0v125.4h30.3v-37.8c6.3,5,14.4,7.5,24,7.5c8.2,0.1,16.3-2,23.4-5.9
			c7-3.9,12.8-9.7,16.7-16.7c4-7.1,6-15.5,6-24.9s-2-17.8-6-24.9C90.4,47.5,84.6,41.8,77.6,37.8z M64.1,95.4
			c-3.7,3.9-8.9,6.1-14.3,5.8c-5.4,0.2-10.6-1.9-14.3-5.8c-3.6-3.8-5.5-8.9-5.6-15.3l0,0c0-0.2,0-0.4,0-0.6s0-0.4,0-0.6V57.6h19.9
			c5.9,0,10.5,1.9,14.3,5.8s5.6,9.2,5.6,16S67.9,91.5,64.1,95.4z"/>
	</defs>
	<clipPath id="SVGID_4_">
		<use xlink:href="#SVGID_3_"  style="overflow:visible;"/>
	</clipPath>
	<g class="st2">
		<circle id="p" class="st1" cx="48" cy="77.9" r="107"/>
	</g>
</g>
<g>
	<defs>
		<path id="luz" d="M157.6,98.7l1.5,25.5l-1.8,0.6c-4.5,1.5-9.2,2.3-14,2.2c-10.5,0-18.8-2.9-24.8-8.6s-9.1-13.8-9.1-24.2V0h30.2
			v92.8c0,3.1,0.7,5.3,2.2,6.9s3.5,2.3,6.3,2.3c1.2,0,2.3-0.2,3.4-0.4c0.9-0.2,1.7-0.5,2.5-0.9L157.6,98.7z M310.5,101.3h43.3v24.4
			h-83v-18.6l41.9-49.5h-40.7V33.2h80.4v18.6L310.5,101.3z M249.5,33.2h9.8v92.5h-53.7c-12.1,0-21.9-3.5-29-10.5
			s-10.8-17.3-10.8-30.8V33.2H196v47.5c0,12.6,4.9,18.5,15.3,18.5h17.8v-66H249.5L249.5,33.2z"/>
	</defs>
	<use xlink:href="#luz"  style="overflow:visible;fill:none;"/>
	<clipPath id="luz_1_">
		<use xlink:href="#luz"  style="overflow:visible;"/>
	</clipPath>
	<path id="path" class="st3 iXCqFfmJ_0" d="M122-22.1l4,121c0,0,12.5,24.5,26,19s29-116,29-116s-4,101,14,108s52,3,52,3l-2-70l101,1l-66,71
		l91,1"/>
</g>
</svg>`;

const Loading: () => React$Node = props => {
  return (
    <Screen hasGradient style={styles.container}>
      <WebView
        source={{ html: `${firstHtml}${contentSvg}${lastHtml}` }}
        containerStyle={styles.webContainer}
        style={styles.webView}
      />
    </Screen>
  );
};

export default Loading;
