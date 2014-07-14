"use strict";

angular.module("micro").constant("COMICS", {
	arcs: [
		{title: "Dennou Alice", chapters:[ //Arc name
			{title: "Chapter 1", pages:[ //chapter name
				{title: "Page 8", image:"comic/Dennou_Alice/8.jpg"},
				{title: "Page 7", image:"comic/Dennou_Alice/7.jpg"},
				{title: "Page 6", image:"comic/Dennou_Alice/6.jpg"},
				{title: "Page 5", image:"comic/Dennou_Alice/5.jpg"},
				{title: "Page 4", image:"comic/Dennou_Alice/4.jpg"},
				{title: "Page 3", image:"comic/Dennou_Alice/3.jpg"},
				{title: "Page 2", image:"comic/Dennou_Alice/2.jpg"}, //put the most recent ontop
				{title: "Page 1", image:"comic/Dennou_Alice/1.jpg"}
			]},
			{title: "Scketches", pages:[ //chapter name
				{title: "Sup", image: "comics/4.jpg"},
				{title: "Dawg", image: "comics/5.jpg"}
			]}
		]},

	]
});
