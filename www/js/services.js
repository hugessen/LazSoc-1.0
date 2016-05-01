angular.module('sbess.services',['ionic','sbess.utils'])
.service('WebAPI',['$localstorage',function($localstorage){
	this.getPrefOptions = function(){
		var userPrefs = $localstorage.getObject('sbess-app-prefs');
		var apiResult = [
		{
			id:0,
			name:"Accounting"
		},
		{
			id:1,
			name:"Economics"
		},
		{
			id:2,
			name:"Finance"
		},
		{
			id:3,
			name:"LazSoc"
		},
		{
			id:4,
			name:"Management"
		},
		{
			id:5,
			name:"Exam Review"
		},
		{
			id:6,
			name:"Information Technology"
		},
		{
			id:7,
			name:"Networking"
		},
		{
			id:8,
			name:"First-year"
		},
		{
			id:9,
			name:"International Business"
		},
		{
			id:10,
			name:"Advertising"
		},
		{
			id: 11,
			name: "eerqqrwwqrqwr"
		}];

		if (!isEmptyObject(userPrefs) && !isEmptyObject(apiResult)){ //If we have saved data and the API is responsive
			for(var x = 0; x < apiResult.length; x++) { //Parse through the API generated list
				var found = false; //Check if we have a match
				for(var y = 0; y < userPrefs.length; y++) { //Parse the saved data
					if(apiResult[x]["id"] == userPrefs[y]["id"] && apiResult[x]["name"] == userPrefs[y]["name"]) { //Check if it matches the API data
						found = true; //If so, we're done
					} else if (apiResult[x]["id"] == userPrefs[y]["id"]) { //If the ids match, but names don't
						userPrefs[y]["name"] = apiResult[x]["name"]; //Put the name in
						found = true;
					}
				}
				if(! found) {
					userPrefs.push( { id: apiResult[x]["id"], name : apiResult[x]["name"] } );
				}
			}
			return userPrefs;
		} else if (isEmptyObject(apiResult)) {
			alert("Could not get API Response");
		} else {
			for(var x = 0; x < apiResult.length; x++) {
				apiResult[x]["selected"] = false;
			}
			return apiResult;
		}
	}
	
	function isEmptyObject(obj){
		return JSON.stringify(obj) == '{}' || obj == null;
	}
	this.getAllClubs = function(){
        var clubs = $localstorage.getObject('sbess-app-clubPrefs');
		if (!isEmptyObject(clubs)){
			return clubs;
		}
		clubs = [
			{
				id: 0,
				name: "LMA",
				slug: "lma",
				desc: "LMA Desc",
				logo: "LMA-Transparent.gif",
				email: "president@lauriermarketing.com",
				website: "http://www.lauriermarketing.com",
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
				logo: "LCC-Transparent.gif",
				tags: [
				"LCC",
				"Club"
				]
			},
			{
				id: 2,
				name: "Golden Speakers Club",
				slug: "golden speakers",
				desc: "It’s easy. Changing the way young people do Public Speaking. Trust us, you’ll have a good time.",
				logo: "GSC-vectored.png",
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
				logo: "Enactus_JPEG.jpg",
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
				logo: "DECA-Transparent.gif",
				tags: [
				"DECA",
				"Club"
				]
			},
			{
				id: 5,
				name: "The Advertising Project",
				slug: "adhawk",
				desc: "The Ad Project Desc",
				logo: "TheAdProject-vectored.png",
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
				logo: "AIESEC-vectored.png",
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
				logo: "Atrium-Transparent.gif",
				tags: [
				"Atrium",
				"Media",
				"Groups",
				"Club"
				]
			},
			{
				id: 8,
				name: "Laurier Economics Club",
				slug: "lec",
				desc: "LEC Desc",
				logo: "LEC-Transparent.gif",
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
				logo: "Startup-Transparent.gif",
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
				logo: "SML-vectored.png",
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
				logo: "LIFA_JPEG.jpg",
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
				logo: "LSA-vectored.jpg",
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
				logo: "HRN-Transparent.gif",
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
				logo: "XL.jpg",
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
				logo: "WLUDebate-vectored.png",
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
				logo: "WILL-Transparent.gif",
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
				logo: "SOS-Transparent.gif",
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
				logo: "TheLink-Transparent.gif",
				tags: [
				"The Link",
				"Club"
				]
			},
			{
				id: 19,
				name: "Technology Management Laurier",
				slug: "tml",
				desc: "TML Desc",
				logo: "TML-vectored.png",
				tags: [
				"Technology",
				"E-Business",
				"Club"
				]
			},
			{
				id: 20,
				name: "Laurier Accounting Association",
				slug: "laa",
				desc: "LAA Desc",
				logo: "LAA-vectored.png",
				tags: [
				"LAA",
				"Club"
				]
			}
			
		];
		for(var x = 0; x < clubs.length; x++) {
			clubs[x]["selected"] = false;
		}
		return clubs;
	}
	this.getClub = function(id){
		var allClubs = this.getAllClubs();
		return allClubs[id];
	}
	
	//This returns an array of the user's club preferences
	this.getClubPrefs = function(){
		var allClubs = this.getAllClubs();
		var clubPrefs = [];
		for (var x = 0; x < allClubs.length; x++){
			if (allClubs[x].selected){
				clubPrefs.push(allClubs[x]);
			}
		}
		return clubPrefs;
	}
	
	//This returns an array of the user's categorical preferences
	this.getUserPrefs = function(){
		var prefOptions = this.getPrefOptions();
			var chosenPrefs = []
			for (var x = 0; x < prefOptions.length; x++){
				if (prefOptions[x].selected){
					chosenPrefs.push(prefOptions[x]);
				}
			}
			return chosenPrefs;
	}
	
	this.getCustomFeed = function(){
		var allEvents = this.getAllEvents();
		var customFeed = []; // The array to return
		var inClubs = false;
        var inPrefs = false;
		var clubPrefs = this.getClubPrefs(); //Get all clubs where selected = true
		var userPrefs = this.getUserPrefs();
		for(var x = 0; x < allEvents.length; x++){ // Loop through all events
			for(var y = 0; y < clubPrefs.length && !inClubs; y++){ // Loop through all clubs
				if (allEvents[x].clubSlug == clubPrefs[y].slug){ // Checking if the event is hosted by a club the user follows
					customFeed.push(allEvents[x]); // Adding that event to the custom feed
					inClubs = true; // we're finished with this event, we don't need to do anything else
				} 
			}
			if (!inClubs){ // Checking whether the event's "tags" match preferences
				for (var i = 0; i< allEvents[x].tags.length && !inPrefs; i++) { //Events have multiple "tags", must go through all of them
    		        for (var j = 0; j < userPrefs.length && !inPrefs; j++) { //All the user's prefs
    					if (allEvents[x].tags[i] == userPrefs[j].name) { 
    						customFeed.push(allEvents[x]); // Push it into the array
    						allEvents[x].notes = userPrefs[j].name; //To tell the user why they're seeing this event   
                            inPrefs = true;
							} // if they match, add the event
						}
					}
			} inClubs = false; // Have to reset this upon each iteration
		} return customFeed;
	}
	
	var events = [
		{ 
			id: 0,
			title: 'BU111 Workshop',
			clubSlug: 'sos',
			timePublished: '11/24/15 4:00 PM',
			startDate: '03/07/15 4:00 PM',
			subheader:'Everything you need to know for the final',
			location: "BA301, Bricker Academic",
			imgSrc: 'banners/SOS-Laurier.jpg',
			thumbnail: "thumbnails/SOS-Transparent.gif",
			facebookEvent: "https://www.facebook.com/events/1443513392633675/",
			sponsors: [
			{
				title: "Bank of Montreal",
				imgSrc: "sponsors/BMO/BMO.jpg"
			},
			{
				title: "Procter and Gamble",
				imgSrc: "sponsors/ProcterGamble.png"

			}],
			tags:["Business","First-year","Exam Review"],
			desc:"Business can be a real hassle for first year students. That's why we've compiled a group of the smartest business students around to show you the ropes. After you've seen this presentation, you'll be ready for anything they throw at you. Come join if you want to learn everything there is to know about accrued liabilities, financial investments, the Diamond-E model and other useless drivel you'll never use again! Disclaimer: We have not seen the exam, and cannot offer insider hints! " 
		},
		{ 
			id: 1,
			title: 'EC140 Mock Midterm',
			clubSlug: 'lec',
			timePublished: '11/25/15 4:00 PM',
			startDate:'08/11/15 3:45 PM',
			endDate: '08/11/15 9:00 PM',
			subheader:'Get prepared for the EC140 midterm',
			location: "P2001, Peters Building",
			imgSrc: 'banners/LEC-Banner.png',
			thumbnail:"thumbnails/LEC-Transparent.gif",
			facebookEvent:"https://www.facebook.com/events/1443513392633675/",
			sponsors:[
			{
				title: "Bank of Montreal",
				imgSrc: "sponsors/BMO/BMO.jpg"
			},
			{
				title: "Procter and Gamble",
				imgSrc: "sponsors/ProcterGamble.png"

			}],
			tags:["Economics","Exam Review"],
			desc:"This midterm is incredibly important! We promise that we'll provide you with a difficult midterm that replicates anything and everything that could be found on the March EC120 Midterm! The admission cost is $5 for non members, and members get in free. We promise your economics marks will never be higher, so come on out and get your econ on!"
		},
		{ 
			id: 2, 
			title: 'Sports Management Workshop',
			clubSlug: 'sml',
			timePublished: '11/26/15 4:00 PM',
			startDate:'03/05/15 11:00 AM',
			endDate: '03/05/15 3:00PM',
			subheader:'Learn from industry pros',
			location: "BA202, Bricker Academic",
			imgSrc: "",
			thumbnail: "thumbnails/SML-vectored.png",
			facebookEvent:'',
			sponsors:[
			{
				title: "Bank of Montreal",
				imgSrc: "sponsors/BMO/BMO.jpg"
			},
			{
				title: "Procter and Gamble",
				imgSrc: "sponsors/ProcterGamble.png"

			},
			{
				title: "Ernst and Young",
				imgSrc: "sponsors/ernstandyoung/ErnstYoung.png"

			}],
			tags:["Sports","Management"],
			desc:"" },

			{
				id: 3,
				title: 'Tech Analysis Workshop', 
				clubSlug: 'tml',
				timePublished: '11/27/15 4:00 PM',
				startDate:'06/06/15 3:45 PM', 
				endDate: '06/06/15 9:00 PM',
				subheader:'Listen to our guest speaker!',
				location: "P2006",
				imgSrc:"",
				facebookEvent:'',
				sponsors:[
				{
					title: "Bank of Montreal",
					imgSrc: "sponsors/BMO/BMO.jpg"
				},
				{
					title: "Procter and Gamble",
					imgSrc: "sponsors/ernstandyoung/ErnstYoung.png"

				}],
				thumbnail:"thumbnails/TML-vectored.png",
				tags:["Information Technology"],
				desc:""
			},
			{
				id: 4,
				title: 'Marketing Conference', 
				clubSlug: 'adhawk',
				timePublished: '11/28/15 4:00 PM',
				startDate:'06/06/15 3:45 PM', 
				endDate: '06/06/15 9:00 PM',
				subheader:'Showcasing the top marketers',
				location: "P2006",
				imgSrc:"",
				facebookEvent:'',
				sponsors:[
				],
				thumbnail:"thumbnails/TheAdProject-vectored.png",
				tags:["Marketing","Advertising"],
				desc:""
			},
			{
				id: 5,
				title: 'Networking Conference', 
				clubSlug: 'thelink',
				timePublished: '11/29/15 4:00 PM',
				startDate:'06/06/15 3:45 PM', 
				endDate: '06/06/15 9:00 PM',
				subheader:'Learn to integrate yourselves as a team!',
				location: "P2006",
				imgSrc:"",
				facebookEvent:'',
				sponsors:[],
				thumbnail:"thumbnails/TheLink-Transparent.gif",
				tags:["Networking","Marketing"],
				desc:""
			},			
			{
				id: 6,
				title: 'Startup Talk at Communitech', 
				clubSlug: 'startup',
				timePublished: '11/29/15 4:00 PM',
				startDate:'06/06/15 3:45 PM', 
				endDate: '06/06/15 9:00 PM',
				subheader:'Learn from a true entrepreneurial veteran!',
				location: "P2006",
				imgSrc:"",
				facebookEvent:'',
				sponsors:[],
				thumbnail:"thumbnails/Startup-Transparent.gif",
				tags:["Networking","Marketing"],
				desc:""
			},			
			{
				id: 7,
				title: 'Pitch Competition', 
				clubSlug: 'gsc',
				timePublished: '11/29/15 4:00 PM',
				startDate:'06/06/15 3:45 PM', 
				endDate: '06/06/15 9:00 PM',
				subheader:'Learn to give a killer pitch!',
				location: "P2006",
				imgSrc:"",
				facebookEvent:'',
				sponsors:[],
				thumbnail:"thumbnails/GSC-vectored.png",
				tags:["Networking","Marketing"],
				desc:""
			}
	];
    for(var x = 0; x < events.length; x++) {
        events[x]["notes"] = "";
	}
	this.getAllEvents = function(){
		return events;
	}
	this.getEvent = function(id){
		var allEvents = this.getAllEvents();
		return allEvents[id];
	}
}]);
	
