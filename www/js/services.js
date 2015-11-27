angular.module('sbess.services',['ionic'])
.service('WebAPI',function(){
	var clubs = [
		{
			name:"LMA",
			logo:"thumbnails/LMA_Logo.jpg"
		},
		{
			name:"LEC",
			logo:"thumbnails/LEC_Logo.jpg"
		},
		{
			name:"SML",
			logo:"thumbnails/SML.jpg"
		}
	]
	this.getAllClubs = function(){
		return clubs;
	}
	this.getRichard = function(){
		return "Richard";
	}
});
	
