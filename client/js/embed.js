"use strict";
const $ = require("jquery");
const EmbedJS = require("embed-js");

module.exports = {
	embed, getLink
};

function getLink(input) {
	if (!input) {
		return;
	}

	var links = input
		.replace(/\x02|\x1D|\x1F|\x16|\x0F|\x03(?:[0-9]{1,2}(?:,[0-9]{1,2})?)?/g, "")
		.split(" ")
		.filter(w => /^https?:\/\//.test(w));

	return links[0];
}

function embed(id) {
	$("#msg-" + id).addClass("rendered");
	var text = document.querySelector("#msg-" + id + " .text");

	var embedItem = new EmbedJS({
		emoji: false,
		input: text,
		link: false,
		googleAuthKey: "AIzaSyCGg2USk9GjMwb5lAXRXAekWSRYsafLpr8",
		locationEmbed: false,
		codeEmbedHeight: 200,
		tweetsEmbed: true,
		tweetOptions: {
			maxWidth: 100,
			hideMedia: false,
			hideThread: true,
			align: "none",
			lang: "en"
		},
		videoEmbed: true,
		videoHeight: $(window).height() / 4,
		videoWidth: $(window).width() / 3,
		videoDetails: false,
		soundCloudOptions: {
			height: 160,
			themeColor: 202020, // Hex Code of the player theme color
			autoPlay: false,
			hideRelated: true,
			showComments: false,
			showUser: true,
			showReposts: false,
			visual: false, // Show/hide the big preview image
			download: false // Show/Hide download buttons
		},
		plugins: {
			twitter: window.twttr
		}
	});
	embedItem.render();
}
