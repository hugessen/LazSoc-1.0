angular.module('sbess.services',['ionic','sbess.utils'])
.service('WebAPI',['$localstorage','$http', '$ionicPopup',function($localstorage,$http, $ionicPopup){
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
			name:"Management"
		},
		{
			id:4,
			name:"Exam Review"
		},
		{
			id:5,
			name:"Information Technology"
		},
		{
			id:6,
			name:"Networking"
		},
		{
			id:7,
			name:"First-year"
		},
		{
			id:8,
			name:"International Business"
		},
		{
			id:9,
			name:"Advertising"
		}
        ];

		if (!isEmptyObject(userPrefs) && !isEmptyObject(apiResult)){ //If we have saved data and the API is responsive
			while (userPrefs.length > apiResult.length) { // Do not remove in the for loop
				for(var x = 0; x < userPrefs.length; x++) { // Remove locally saved preferences that's removed from the API
					var found = false;
					for(var y = 0; y < apiResult.length; y++ ) {
						if(apiResult[y]["id"] == userPrefs[x]["id"] && apiResult[y]["name"] == userPrefs[x]["name"]) {
							found = true;
						}
					}
					if (!found) {
						delete userPrefs.splice(x, 1);
						break;
					}
				}
			}

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

	function reconcileClubs(APIresult, localClubs) {
		// Clubs API has a garantee that it will not decerase in length, if a club is removed, it's ID will not be reused and 
		// it's index in the clubs array will be replaced by removed: true, i.e. if club with the id 10 is removed then the
		// API response will contain the following at index 10:
		// APIresponse[10] = { removed: true }
		// The reasoning behind this is that at this time clubs are removed so rarely that it does not justify a re-write of the
		// logic to deal with clubs
		for(var x = 0; x < APIresult.length; x++) {
			if(APIresult[x].hasOwnProperty("removed") && APIresult[x]["removed"]) {
				// Club is removed
				localClubs[x] = APIresult[x];
			} else if (x > localClubs.length - 1) {
				// New club
				localClubs.push(APIresult[x]);
			} else {
				// Existing club in both API and local result, so load its new stuff
				var selected = localClubs[x]["selected"];
				Object.keys(APIresult[x]).forEach(function(key,index) {
					localClubs[x][key] = APIresult[x][key];
				});
				localClubs[x]["selected"] = selected;
			}
		}
		return localClubs;
	}

	this.getAllClubs = function(){
        var clubs = $localstorage.getObject('sbess-app-clubPrefs');
		var APIresult = [
			{
				id: 0,
				name: "LMA",
				slug: "lma",
				desc: "The Laurier Marketing Association is a student organization dedicated to undergraduates interested in marketing. We’ve teamed up with the best resources Wilfrid Laurier has to offer: world-renowned faculty, successful alumni, industry leaders, and recruiters from the world’s top companies. You may want to know if marketing is right for you, or you may already be on your way into the real marketing world. Either way, we’ll help you get your head start. Ultimately, our mission is to help our members attain the level of marketing experience they desire by providing comprehensive resources that span the academic, professional, and social faces of marketing.",
				logo: "LMA.png",
                banner:"banners/LMABanner.png",
				email: "president@lauriermarketing.com",
				website: "http://www.lauriermarketing.com",
				tags: [
                "Marketing",
                "Networking",
                "Case Competitions"
				]
			},
			{
				id: 1,
				name: "LCC",
				slug: "lcc",
				desc: "Since 2009, the Laurier Consulting Club has continued to grow both in membership numbers as well as in quality – here’s how:We operate with the intentions of improving the knowledge and technical skills of the students of SBE at Wilfrid Laurier University. Through our two portfolios – engagement and the Laurier Consulting Program (LCP) we aim to provide unique and tangible opportunities that can help students grow on a professional level making them able to compete in the consulting landscape. Through ‘Engagement’, we offer workshops, networking events, info sessions and a large-scale case competition to allow for learning about the industry, learning techniques that can be used to get hired, and finally, case practice – an industry essential. The ‘Laurier Consulting Program’ is unique to LCC and seamlessly complements our engagement portfolio by allowing students to deploy what they have learned at our events in real consulting engagements setup and managed by our executive team.",
				logo: "LCC.png",
                banner:"banners/LCCBanner.png",
				tags: [
                "Consulting",
                "Networking"
				]
			},
			{
				id: 2,
				name: "Golden Speakers Club",
				slug: "gsc",
				desc: "It’s easy. Changing the way young people do Public Speaking. Trust us, you'll have a good time",
				logo: "GoldenSpeakers.png",
                banner:"banners/GSBanner.png",
				tags: [
                    "Public Speaking",
                    "First Year",
                    "Networking"
				]
			},
			{
				id: 3,
				name: "Enactus",
				slug: "enactus",
				desc: "Enactus is a non-profit global organization dedicated to inspiring students to improve the world through entrepreneurial action. There are over 1700 university programs running Enactus in 36 countries, with over 70,500 participating students and building 550 partnerships with corporate organizations and individuals. We provide a platform for teams of outstanding university and college students to create community development projects that put people’s own ingenuity and talents at the centre of improving their livelihoods. Guided by educators and supported by business leaders, our students take the kind of entrepreneurial approach that empowers people to be a part of their own success. Our work transforms both the lives of the people we serve, and in turn, the lives of our students as they develop into more effective, values-driven leaders.An annual series of Regional and National Competitions provides a forum for teams to showcase the impact of their outreach efforts and to be evaluated by executives serving as judges. National champion teams advance to the prestigious Enactus World Cup to experience excellence in competition, collaboration, and celebration.",
				logo: "Enactus.png",
                banner:"banners/EnactusBanner.png",
				tags: [
                    "Entrepreneurship",
                    "Social Change"
				]
			},
			{
				id: 4,
				name: "DECA",
				slug: "deca",
				desc: "DECA Laurier is a student-run organization that provides students with the essential skills needed to survive and excel in the corporate world. These skills are enhanced in the field of marketing, entrepreneurship, finance and business management through the use of business simulations and case studies. Each year, competitions are held regionally, provincially and internationally to further challenge and engage our members beyond what they think they are capable of, pushing them to exceed expectations and limits. DECA Laurier strives to create a bridge between the knowledge acquired at school and the practical skills needed at the work place. It is an experience that provides a platform for students to learn, compete and succeed in today’s vastly changing environment.",
				logo: "Deca.png",
                banner:"banners/DECABanner.png",
				tags: [
                    "Public Speaking",
                    "Case Competitions",
                    "Networking"
				]
			},
			{
				id: 5,
				name: "The Advertising Project",
				slug: "theAdProject",
				desc: "The Advertising Project is a student-run club organized out of Wilfrid Laurier University, created by students with a passion for advertising and design. TAP is dedicated to providing eye-catching, dynamic advertising for local enterprises and non-for-profits through digital and print media to help businesses soar above the competition. All advertising provided by the Advertising Project is created and designed by students looking to gain experience in the industry as graphic designers, copywriters, and account executives, and is completely free of charge!",
				logo: "TAP.png",
                banner:"banners/TAPBanner.png",
				tags: [
				"Advertising",
				"Marketing",
				"Case Competitions"
				]
			},
			{
				id: 6,
				name: "AIESEC",
				slug: "aiesec",
				desc: "AIESEC is the world’s largest student run organization present in over 128 countries and 2800 universities. AIESEC is focused on leadership development through the facilitation of international exchange. We provide students opportunities to develop themselves personally and professionally through our various programs such as campus involvement and exchange. AIESEC has the ability to send Laurier students on exchange to different countries for various internships and provide an incredible international experience.",
				logo: "Aiesec.png",
                banner:"banners/AIESECBanner.png",
				tags: [
                    "International"
				]
			},
			{
				id: 7,
				name: "Atrium Media Group",
				slug: "atrium",
				desc: "The Atrium Media Group is a dynamic and innovative media organization that provides rewarding opportunities for students to showcase their creativity and talent through various initiatives including; the trademark Atrium Magazine that is published thrice a year, the new multi-functional blog featuring articles and editorials not found in our magazine, and the rapidly growing Atrium Photography/Videography Team. AMG has been a part of SBE’s history for over 20 years, during which it has aimed to represent the students of SBE by bringing light to the current issues, concerns, and interests of our community.",
				logo: "AMG.png",
                banner:"banners/AMGBanner.png",
				tags: [
				"Marketing",
				"Media",
				"Journalism",
				]
			},
			{
				id: 8,
				name: "Laurier Economics Club",
				slug: "lec",
				desc: "he Laurier Economics Club (LEC) is Laurier’s only economics-focused club on campus. Our goal is to provide resources to students who are interested in the field of economics. Through our speaker engagements, mock midterm sessions, and our annual conference, we expose our members to a diverse range of economic knowledge and experience. We strive to enhance each member’s academic journey while providing them with tools to help them realize their full potential and value in a degree/minor in economics.",
				logo: "LEC.png",
                banner:"banners/LECBanner.png",
				tags: [
				"Economics",
				"Mock Midterm",
                "Networking"
				]
			},
			{
				id: 9,
				name: "Startup Laurier",
				slug: "startup",
				desc: "Startups and Waterloo are two words that fit perfectly together. Startup Laurier (formerly know as the Laurier Innovation and Technology Club) brings that entrepreneurial culture to campus. Our events, programs, and initiatives are meant to empower Laurier students to explore and pursue their entrepreneurial ambitions. Whether it be starting your own business, working for a startup, growing a skill, or wanting to learn more about Kitchener-Waterloo’s entrepreneurship community, we provide students with the resources and connections to make it happen.",
				logo: "SL.png",
                banner:"banners/StartupBanner.png",
				tags: [
				"Entrepreneurship",
				"Startups",
				"Technology",
                "Networking"
				]
			},
			{
				id: 10,
				name: "Sports Management Laurier",
				slug: "sml",
				desc: "Sports Management Laurier was established in 2014 as an undergraduate organization that provides students the chance to connect with prominent professionals in the sports management industry. SML makes it possible for individuals to peruse their dream career within brand Brand, Agency and Broadcast sectors of the industry. In 2015, SML won the most improved SBESS club of the year by offering various flagship events such as a speaker series, a proud partnership with TSN and several social events. Students are provided ample opportunities to connect with high-level professionals, as SML looks to help and guide those who may be interested in pursuing a job in the industry.",
				logo: "SML.png",
                banner:"banners/SMLBanner.png",
				tags: [
				"Marketing",
				"Sports Management",
				"Networking"
				]
			},
			{
				id: 11,
				name: "LIFA",
				slug: "lifa",
				desc: "Laurier Investment & Finance Association’s (LIFA) mission is to develop, educate and inspire students into exploring the different roles within the finance industry. Our commitment to the Laurier community is to offer valuable opportunities, including unique and instructive events for students to interact, network and learn from today’s industry leaders.",
				logo: "LIFA.png",
                banner:"banners/LIFABanner.png",
				tags: [
				"Finance",
				"Networking",
                "Capital Markets",
                "Investing",
                "Economics"
				]
			},
			{
				id: 12,
				name: "Laurier Sales Association",
				slug: "lsa",
				desc: "The key to success in ANY business career is simple: increase your sales skills. No matter what your role is, selling is part of your job. Sales is not about manipulating or pressuring your client, it is about effectively communicating the benefits and logic behind a decision. Most importantly, it is about selling YOURSELF. The Laurier Sales Association prides itself in being one of Canada’s first and only clubs focused entirely on sales. We work with our sponsors to provide a hands-on- approach through workshops, sales competitions and networking events. Join us today to learn more about careers in sales and enhance the skill set to excel in any profession.",
				logo: "LSA.png",
                banner:"banners/LSABanner.png",
				tags: [
				"Sales",
				"Public Speaking",
                "Marketing"
				]
			},
			{
				id: 13,
				name: "JDCC",
				slug: "jdcc",
				desc: "JDCC Desc",
				logo: "JDCC.png",
				tags: [
				"Public Speaking",
				"Case Competitions"
				]
			},
			{
				id: 14,
				name: "XLerate",
				slug: "xlerate",
				desc: "XLerate is a club run exclusively for first year Laurier Business and Economics students to help ease the transition from high school to university. We aim to help each student maintain a balance of academic success, community involvement and social development; all needed to help you survive and thrive in your first year at Laurier!",
				logo: "XL.png",
                banner:"banners/XLBanner.png",
				tags: [
				"1st Year",
				"Exam Review",
                "Case Competitions",
                "Public Speaking",
                "Networking"
				]
			},
			{
				id: 15,
				name: "WLU Debate Society",
				slug: "wludebate",
				desc: "The WLU Debating Society is Laurier’s Waterloo campus debate club. We hold meetings weekly and attend tournaments regularly. To join, all you have to do is participate by coming out to our meetings! You do not need any previous debating experience, and are welcomed to attend any time throughout the year. At our meetings, an experienced member of the club will give a brief debating lesson, and you will be able to participate in practice rounds.",
				logo: "Debate.png",
                banner:"banners/DebateBanner.png",
				tags: [
				"Public Speaking",
				"Debate"
				]
			},
			{
				id: 16,
				name: "Women in Leadership Laurier",
				slug: "will",
				desc: "Women In Leadership Laurier (WILL) is an innovative business club at Wilfrid Laurier University. Our mission focuses on promoting equal opportunity and continuous learning. WILL strives to provide leadership skills, resources, information and support needed to succeed in today’s professional environment. By embracing knowledge from experienced speakers, the Waterloo community and our peers, we encourage growth without any boundaries.",
				logo: "WILL.png",
                banner:"banners/WILLBanner.png",
				tags: [
				"Women in Business",
				"Networking",
                "Leadership"
				]
			},
			{
				id: 17,
				name: "Students Offering Support",
				slug: "sos",
				desc: "Students Offering Support is a national network of student volunteers who offer comprehensive Exam-AID review sessions right before midterms and finals to raise money for sustainable education projects in Latin America. Students who attend the session donate $20 to review the course content with a senior student who has taken the course before. After the session, students are ready to ace the exam! The money raised funds our outreach trips, which take groups of students to countries such as Costa Rica, Peru, and Nicaragua to contribute to the construction projects that SOS is funding.",
				logo: "SOS.png",
                banner:"banners/SOSBanner.png",
				tags: [
				"International",
				"Exam Review",
				"Tutoring",
                "Social Enterprise"
				]
			},
			{
				id: 18,
				name: "The Link",
				slug: "thelink",
				desc: "The Link’s mission is dedicated to connecting past, present and future students within Wilfrid Laurier University’s School of Business and Economics, the community and internationally by promoting leadership and networking opportunities in a professional manner. The Link strives to create an environment where students can grow on an academic, professional and personal level. Since its establishment in April 2002, The Link has provided Wilfrid Laurier Business & Economics students the chance to connect and network with future students, past students, and university faculty. Our first event was The Leadership in Business Conference, which allowed university students to teach high school students business skills in a friendly yet competitive environment. Today, The Link has grown into a diverse and unique business organization, which carries forth the values of leadership, networking and development. The Link executive team consists of creative, energetic and innovative individuals who strive to be a positive influence in their school, community, and international business world.",
				logo: "Link.png",
                banner:"banners/LinkBanner.png",
				tags: [
				"Networking",
				"International",
                "Leadership"
				]
			},
			{
				id: 19,
				name: "Technology Management Laurier",
				slug: "tml",
				desc: "Technology Management Laurier (TML) connects students to the growing global technology sector. Technology Management Laurier strives to provide each member with the opportunity to succeed in the technology sector, or enhance their business-tech abilities. From insights into the industry from technical and corporate perspectives, to partnered events with local tech incubators like the Communitech Hub, we empower innovation. As Laurier’s only tech-business club, TML has grown rapidly since its inception by issuing improved member services in the form of a Speaker Series with large-scale technology companies, tech-incubator tours, networking opportunities and the Consumer Electronic Demo. Additionally, TML has assisted local businesses and startups through its Consultech (Consulting Division), and continues to provide technological implementation services (Social Media, Web Development, and much more). Most recently, Tech-Management Laurier has also partnered with the Laurier Startup Fund course to further develop the Consultech division.",
				logo: "TML.png",
                banner:"banners/TMLBanner.png",
				tags: [
				"Technology",
				"Networking",
				]
			},
			{
				id: 20,
				name: "Laurier Accounting Association",
				slug: "laa",
				desc: "We’re in a unique position – we have the ears of the recruitment departments of top domestic and international accounting firms, and the attention of Laurier business students holding the largest member base of any WLU club. Let us use it to help each individual set and achieve career goals. We’re here to organize events, provide resources, and create connections that result in success and achievement for both sides of the table. Above all, our end goal is to educate Laurier students on the various accounting career paths that are available to them.",
				logo: "LAA.png",
                banner:"banners/LAABanner.png",
				tags: [
				"Accounting",
				"Finance",
                "Networking"
				]
			},
            {
				id: 21,
				name: "5 Days for the Homeless",
				slug: "5days",
				desc: "5 Days Desc",
				logo: "5days.png",
				banner: "banners/5DaysBanner.png",
				tags: [
				"Social Change"
				]
			},
            {
				id: 22,
				name: "Lazaridis Students' Society",
				slug: "lazsoc",
				desc: "Lazsoc Desc",
				logo: "LazSoc.png",
				banner: "banners/LazSocBanner.png",
				tags: [
                    "Leadership"
				]
			}
			
		];

		if (!isEmptyObject(clubs) && !isEmptyObject(reconcileClubs)) { // Has local preferences saved, reconcile club data and API returned
			var reconciled = reconcileClubs(APIresult, clubs);
			$localstorage.setObject('sbess-app-clubPrefs', reconciled);
		    return reconciled;
		} else if ( !isEmptyObject(reconcileClubs) ) { // No local storage but API returned
			for(var x = 0; x < APIresult.length; x++) {
				APIresult[x]["selected"] = false;
			}
			$localstorage.setObject('sbess-app-clubPrefs', APIresult);
			return APIresult;
		} else if ( !isEmptyObject(clubs) ) { // No API result but has local preferneces saved
			$ionicPopup.alert({
				title:"Oh snap!",
				template: "For some reason we couldn't get the latest list of clubs, please verify your internet connection and try again. We've loaded a previously saved list of clubs for now."
			});
			return clubs;
		} else { // No API result and no local preferences
			$ionicPopup.alert({
				title:"Oh snap!",
				template: "For some reason we couldn't get the latest list of clubs, please verify your internet connection and try again."
			});
			return [];
		}
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
	
	this.getCustomFeed = function(allEvents){
		var customFeed = []; // The array to return
		var inClubs = false;
        var inPrefs = false;
		var clubPrefs = this.getClubPrefs(); //Get all clubs where selected = true
		var userPrefs = this.getUserPrefs();
		for(var x = 0; x < allEvents.length; x++){ // Loop through all events
			for(var y = 0; y < clubPrefs.length && !inClubs; y++){ // Loop through all clubs
				if (allEvents[x].club.slug == clubPrefs[y].slug){ // Checking if the event is hosted by a club the user follows
					customFeed.push(allEvents[x]); // Adding that event to the custom feed
					allEvents[x].notes = allEvents[x].club.name;
					inClubs = true; // we're finished with this event, we don't need to do anything else
				} 
			}
			if (!inClubs){ // Checking whether the event's "tags" match preferences
				var selected = false;
				for (var i = 0; i< allEvents[x].tags.length; i++) { //Events have multiple "tags", must go through all of them
    		        for (var j = 0; j < userPrefs.length && !inPrefs; j++) { //All the user's prefs
    					if (allEvents[x].tags[i] == userPrefs[j].name && !selected) { 
	    						customFeed.push(allEvents[x]); // Push it into the array
	    						allEvents[x].notes = userPrefs[j].name; //To tell the user why they're seeing this event   
	                            inPrefs = true;
	                            selected = true;
						} // if they match, add the event
					}
					inPrefs = false;
				}
			} 
			inClubs = false; // Have to reset this upon each iteration
		} return customFeed;
	}

    this.getAllEvents = function(){
		var clubevents = $localstorage.getObject('sbess-club-events');
		var stale_time = 5 * 60 * 1000; // 5 minutes stale time

		if(isEmptyObject(clubevents) || !clubevents || (((new Date) - clubevents.load_time) >= stale_time)) {
			// If nothing is stored in local storage OR the stored data is stale, then re-load from the api
			console.log("API Call Made");
			that = this; // Need to do this to call any this.function within the callback, i.e. to call this.getClub in the callback, you need to set this then you go that.getClub
			return $http.get('https://lazsoc.ca/app_info.php').then(function(APIresult) {
				// After the API call returns, then loop through the result and load in each club
				for(var i = 0; i < APIresult.data.length; i++) {
					APIresult.data[i].club = that.getClub(APIresult.data[i].clubRef);
				}
				APIresult.load_time = new Date().getTime();
				$localstorage.setObject('sbess-club-events', APIresult);
				return APIresult;
			}, function (APIresult) {
				$ionicPopup.alert({
					title:"Oh snap!",
					template: "For some reason we couldn't get the latest list of events, please verify your internet connection and try again."
				});
			});
		} else  {
			// Data is stored locally and not stale, so return that
			// The calls expect a callback, so return a 'fake' promise so that the getAllEvents.then will still work even though no API call is made
			console.log("Local storage loaded");
			return new Promise(function (resolve, reject) {
					resolve(clubevents);
				}
			);
			//return clubevents;
		}
	}

	this.getEvent = function(id){
        var allEvents;
		this.getAllEvents().then(function(APIresult){
             allEvents = APIresult.data;
             return allEvents[id];
        });  
	}
}]);
	
