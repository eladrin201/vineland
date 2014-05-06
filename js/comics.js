"use strict";

angular.module("micro").constant("COMICS", {
	arcs: [
		{title: "Default Arc", chapters:[
			{title: "Default Chapter", pages:[
				{title: "Default Page", image: "comics/1.jpg"},
				{title: "Hello", image:"comics/2.jpg"},
				{title: "World", image:"comics/3.jpg"}
			]},
			{title: "That other chapter", pages:[
				{title: "Sup", image: "comics/4.jpg"},
				{title: "Dawg", image: "comics/5.jpg"}
			]}
		]},
		{title: "Other Arc", chapters:[
			{title: "Chapter Fuckoff", pages: [
				{title: "Yo", image: "comics/3.jpg"}
			]}
		]}
	]
});