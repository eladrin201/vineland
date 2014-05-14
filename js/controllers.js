'use strict';

//We give you a basic controller to get you up and running.
//This controller just serves static pages for you, giving you in essence a
//simple 'static' CMS.
angular.module('micro').controller('pages', function($scope, $routeParams, $log){
	$scope.title = '';

	$scope.loadPage = function(){

		$scope.title = $routeParams.page;

		if(!$scope.title){
			$scope.title = 'home';
		}

		return 'views/pages/'+$scope.title+'.html';
		//$scope.$apply();
	}

}).controller('comics', function($scope, $routeParams, $log, $location, COMICS){
	$scope.comics = COMICS;
	//start at the latest entry
	$scope.current = {arc: 0, chapter: 0, page: 0};
	//accept any params info
	if($routeParams.arc){
		$scope.current['arc'] = Number($routeParams.arc);
	}
	if($routeParams.chapter){
		$scope.current['chapter'] = Number($routeParams.chapter);
	}
	if($routeParams.page){
		$scope.current['page'] = Number($routeParams.page);
	}

	//save our arc-chapter-page
	$scope.arc = $scope.comics.arcs[$scope.current.arc];
	$scope.chapter = $scope.arc.chapters[$scope.current.chapter];
	$scope.page = $scope.chapter.pages[$scope.current.page];

	//first possible page
	$scope.latest = function(){
		return {arc: 0, chapter: 0, page: 0};
	}
	//Determine 'next' page
	$scope.nextPage = function(){
		var location = $scope.current;
		var ret = {arc: false, chapter: false, page: false};
		if(location.page > 0){
			ret.arc = Number(location.arc);
			ret.chapter = Number(location.chapter);
			ret.page = Number(location.page - 1);
			return ret;
		}else{
			if(location.chapter > 0){
				ret.arc = Number(location.arc);
				ret.chapter = Number(location.chapter - 1);
				ret.page = Number($scope.comics.arcs[ret.arc].chapters[ret.chapter].pages.length - 1);
				return ret;
			}else if(location.arc > 0){
				ret.arc = Number(location.arc - 1);
				ret.chapter = Number($scope.comics.arcs[ret.arc].chapters.length - 1);
				ret.page = Number($scope.comics.arcs[ret.arc].chapters[ret.chapter].pages.length - 1);
				return ret;
			}else{
				return false;
			}
		}
	}

	//determine prev page
	$scope.prevPage = function(){
		var location = $scope.current;
		var ret = {arc: false, chapter: false, page: false};
		if(location.page < $scope.comics.arcs[location.arc].chapters[location.chapter].pages.length - 1){
			ret.arc = Number(location.arc);
			ret.chapter = Number(location.chapter);
			ret.page = Number(location.page + 1);
			return ret;
		}else{
			if(location.chapter < $scope.comics.arcs[location.arc].chapters.length - 1){
				ret.arc = Number(location.arc);
				ret.chapter = Number(location.chapter + 1);
				ret.page = Number($scope.comics.arcs[ret.arc].chapters[ret.chapter].pages.length - 1);
				return ret;
			}else if(location.arc < $scope.comics.arcs.length - 1){
				ret.arc = Number(location.arc + 1);
				ret.chapter = Number($scope.comics.arcs[ret.arc].chapters.length - 1);
				ret.page = Number($scope.comics.arcs[ret.arc].chapters[ret.chapter].pages.length - 1);
				return ret;
			}else{
				return false;
			}
		}
	}
	//last possible page
	$scope.first = function(){
		var arc = $scope.comics.arcs.length - 1;
		var chapter = $scope.comics.arcs[arc].chapters.length - 1;
		var page = $scope.comics.arcs[arc].chapters[chapter].pages.length - 1;
		return {arc: arc, chapter: chapter, page: page};
	}
	//turn a comic vector into a meaningful link
	$scope.formLink = function(vector){
		if(vector != false){
			if(!vector.arc){
				vector.arc = 0;
			}
			if(!vector.chapter){
				vector.chapter = 0;
			}
			if(!vector.page){
				vector.page = 0;
			}
			return '#/comics/'+vector.arc+'/'+vector.chapter+'/'+vector.page;
		}else{
			return "";
		}
	}

	//generates the archive object
	//I apologize - this is some pretty scary code
	$scope.buildArchiveDescending = function(){
		var archive = [];
		for(var a = 0; a < $scope.comics.arcs.length; a++){
			var vector = {arc:a, chapter: $scope.comics.arcs[a].chapters.length-1, page: $scope.comics.arcs[a].chapters[$scope.comics.arcs[a].chapters.length-1].pages.length-1}
			archive.push({type: 'arc', vector: vector, link: $scope.formLink(vector), title: $scope.comics.arcs[a].title});
			for(var c = 0; c < $scope.comics.arcs[a].chapters.length;c++){
				var vector = {arc:a, chapter:c, page: $scope.comics.arcs[a].chapters[c].pages.length-1}
				archive.push({type: 'chapter', vector: vector, link: $scope.formLink(vector), title: $scope.comics.arcs[a].chapters[c].title});
				for(var p = 0; p < $scope.comics.arcs[a].chapters[c].pages.length;p++){
					var vector = {arc:a, chapter: $scope.comics.arcs[a].chapters[c], page: $scope.comics.arcs[a].chapters[c].pages[p]}
					archive.push({type: 'page', vector: vector, link: $scope.formLink(vector), title: $scope.comics.arcs[a].chapters[c].pages[p].title});
				}
			}
		}
		return archive;
	}

	$scope.buildArchiveAscending = function(){
		var archive = [];
		for(var a = $scope.comics.arcs.length-1; a >= 0; a--){
			var vector = {arc:a, chapter: $scope.comics.arcs[a].chapters.length-1, page: $scope.comics.arcs[a].chapters[$scope.comics.arcs[a].chapters.length-1].pages.length-1}
			archive.push({type: 'arc', vector: vector, link: $scope.formLink(vector), title: $scope.comics.arcs[a].title});
			for(var c = $scope.comics.arcs[a].chapters.length-1; c >= 0; c--){
				var vector = {arc:a, chapter:c, page: $scope.comics.arcs[a].chapters[c].pages.length-1}
				archive.push({type: 'chapter', vector: vector, link: $scope.formLink(vector), title: $scope.comics.arcs[a].chapters[c].title});
				for(var p = $scope.comics.arcs[a].chapters[c].pages.length - 1; p >= 0 ;p--){
					var vector = {arc:a, chapter: c, page: p}
					archive.push({type: 'page', vector: vector, link: $scope.formLink(vector), title: $scope.comics.arcs[a].chapters[c].pages[p].title});
				}
			}
		}
		return archive;
	}

	//keep our links so they are easily accessible from themes
	$scope.links = {first: $scope.formLink($scope.first()), next: $scope.formLink($scope.nextPage()), prev: $scope.formLink($scope.prevPage()), latest: $scope.formLink($scope.latest())};
	$scope.archive = $scope.buildArchiveAscending();
	$log.log($scope.archive);
	//some helpful debugging
	/*
	$log.log($scope.arc);
	$log.log($scope.chapter);
	$log.log($scope.page);
	$log.log($scope.links);
	*/

	//adds arrow key and click navigation
	$('div#comicpost > img').click(function(){
		console.log($scope.links.next);
		$location.path($scope.links.next); // path not hash
	});
});
