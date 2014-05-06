"use strict";

angular.module("micro").constant("COMICS", {
	arcs: [
		{title: "Vineland", chapters:[ //Arc name
			{title: "Sample Chapter", pages:[ //chapter name
				{title: "Page 7", image:"comic/Dennou_Alice/7.jpg"},
				{title: "Page 6", image:"comic/Dennou_Alice/6.jpg"},
				{title: "Page 5", image:"comic/Dennou_Alice/5.jpg"},
				{title: "Page 4", image:"comic/Dennou_Alice/4.jpg"},
				{title: "Page 3", image:"comic/Dennou_Alice/3.jpg"},
				{title: "Page 2", image:"comic/Dennou_Alice/2.jpg"}, //pages, put the most recent on the top!!
				{title: "Page 1", image:"comic/Dennou_Alice/1.jpg"}
			]},
			{title: "That other chapter", pages:[ //chapter name
				{title: "Sup", image: "comics/4.jpg"},
				{title: "Dawg", image: "comics/5.jpg"}
			]}
		]},

	]
});
