angular.module('sbess.services',['ionic'])
.service('WebAPI',function(){
	var clubs = [
		{
			id: 0,
			name: "LMA",
			slug: "lma",
			desc: "LMA Desc",
			logo: "thumbnails/LMA-Transparent.gif",
			tags: [
			"Sales",
			"Club"
			]
		},
		{
			id: 1,
			name: "LCC",
			slug: "lcc",
			desc: "LCC Desc",
			logo: "thumbnails/LCC-Transparent.gif",
			tags: [
			"LCC",
			"Club"
			]
		},
		{
			id: 2,
			name: "Golden Speakers Club",
			slug: "golden speakers",
			desc: "LAA Desc",
			logo: "thumbnails/GSC.png",
			tags: [
			"Public Speaking",
			"Club"
			]
		},
		{
			id: 3,
			name: "Enactus",
			slug: "enactus",
			desc: "Enactus Desc",
			logo: "thumbnails/Enactus-Transparent.gif",
			tags: [
			"Enactus",
			"Club"
			]
		},
		{
			id: 4,
			name: "DECA",
			slug: "deca",
			desc: "DECA Desc",
			logo: "thumbnails/DECA-Transparent.gif",
			tags: [
			"DECA",
			"Club"
			]
		},
		{
			id: 5,
			name: "AdHawk Laurier",
			slug: "adhawk",
			desc: "Adhawk Desc",
			logo: "thumbnails/AdHawk_logo.jpg",
			tags: [
			"Advertising",
			"Marketing",
			"Club"
			]
		},
		{
			id: 6,
			name: "AIESEC",
			slug: "aiesec",
			desc: "AIESEC Desc",
			logo: "thumbnails/AIESEC-Transparent.gif",
			tags: [
			"AIESEC",
			"Club"
			]
		},
		{
			id: 7,
			name: "Atrium Media Group",
			slug: "atrium",
			desc: "Atrium Desc",
			logo: "thumbnails/Atrium-Transparent.gif",
			tags: [
			"Atrium",
			"Media",
			"Groups",
			"Club"
			]
		},
		{
			id: 8,
			name: "LEC",
			slug: "lec",
			desc: "LEC Desc",
			logo: "thumbnails/LEC-Transparent.gif",
			tags: [
			"Economics",
			"Club"
			]
		},
		{
			id: 9,
			name: "Startup Laurier",
			slug: "startup",
			desc: "Startup Laurier Desc",
			logo: "thumbnails/StartupLaurier-Transparent.gif",
			tags: [
			"Entrepreneurship",
			"Startups",
			"Club"
			]
		},
		{
			id: 10,
			name: "Sports Management Laurier",
			slug: "sml",
			desc: "SML Desc",
			logo: "thumbnails/SML-Transparent.gif",
			tags: [
			"SML",
			"Sports Management",
			"Club"
			]
		},
		{
			id: 11,
			name: "LIFA",
			slug: "lifa",
			desc: "LIFA Desc",
			logo: "thumbnails/LSA.gif",
			tags: [
			"LIFA",
			"Club"
			]
		},
		{
			id: 12,
			name: "Laurier Sales Association",
			slug: "lsa",
			desc: "LSA Desc",
			logo: "thumbnails/SML-Transparent.gif",
			tags: [
			"LSA",
			"Club"
			]
		},
		{
			id: 13,
			name: "HRN",
			slug: "hrn",
			desc: "HRN Desc",
			logo: "thumbnails/HRN-Transparent.gif",
			tags: [
			"HRN",
			"Club"
			]
		},
		{
			id: 14,
			name: "XLerate",
			slug: "xlerate",
			desc: "XLerate Desc",
			logo: "thumbnails/XLerate-Transparent.gif",
			tags: [
			"XLerate",
			"Club"
			]
		},
		{
			id: 15,
			name: "WLU Debate Society",
			slug: "wludebate",
			desc: "WLU Debate Desc",
			logo: "thumbnails/WLUDebate-Transparent.gif",
			tags: [
			"WLU Debate",
			"Club"
			]
		},
		{
			id: 16,
			name: "Women in Leadership Laurier",
			slug: "will",
			desc: "WILL Desc",
			logo: "thumbnails/WILL-Transparent.gif",
			tags: [
			"WILL",
			"Club"
			]
		},
		{
			id: 17,
			name: "Students Offering Support",
			slug: "sos",
			desc: "SOS Desc",
			logo: "thumbnails/SOS-Transparent.gif",
			tags: [
			"SOS",
			"Exam Review",
			"Club"
			]
		},
		{
			id: 18,
			name: "The Link",
			slug: "thelink",
			desc: "The Link Desc",
			logo: "thumbnails/TheLink-Transparent.gif",
			tags: [
			"The Link",
			"Club"
			]
		},
		{
			id: 19,
			name: "EB Laurier",
			slug: "eb",
			desc: "EB Laurier Desc",
			logo: "thumbnails/EB-Transparent.gif",
			tags: [
			"EB Laurier",
			"Club"
			]
		}
	]
	this.getAllClubs = function(){
		return clubs;
	}
	this.getRichard = function(){
		return "Richard";
	}
});
	
