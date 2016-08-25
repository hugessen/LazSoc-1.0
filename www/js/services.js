angular.module('sbess.services',['ionic','sbess.utils'])
.service('EventPageBack', ['$http', function($http) {
	this.filterBy = 'custom';
	this.filterByTime = 'thisweek';
}])
.service('DiscountAPI', ['$http', function($http) {
	this.getSponsors = function() {
		return [
		{
			name: "Quick Sandwiches",
			logo: "thumbnails/discount_program/Quick_Sandwiches_Logo.png",
			discount: "-10% Storewide"
		},
		{
			name: "Shoeless Joes",
			logo: "thumbnails/discount_program/Shoeless_Joes_Logo.png",
			discount: "-25% Food with the Purchase of a Drink"
		},
		{
			name: "Noon Moment",
			logo: "thumbnails/discount_program/Noon_Moment_Logo.png",
			discount: "-10% Storewide"
		},
		{
			name: "Huether Hotel",
			logo: "thumbnails/discount_program/Huether_Hotel_Logo.png",
			discount: "TBD"
		},
		{
			name: "Capri Salon",
			logo: "thumbnails/discount_program/Capri_Salon_Logo.png",
			discount: "-10% Storewide"
		},
		{
			name: "Wordsworth Books",
			logo: "thumbnails/discount_program/Words_Worth_Books_Logo.png",
			discount: "-10% Storewide"
		},
		{
			name: "Caliburger",
			logo: "thumbnails/discount_program/Caliburger_Logo.png",
			discount: "-10% Storewide"
		},
		{
			name: "Menchies",
			logo: "thumbnails/discount_program/Menchies_Logo.png",
			discount: "-10% Storewide"
		},
		{
			name: "Holy Guacamole",
			logo: "thumbnails/discount_program/Holy_Guacamole_Logo.png",
			discount: "Free Upgrade to a Large Burrito"
		},
		{
			name: "Staples",
			logo: "thumbnails/discount_program/Staples_Logo.png",
			discount: "-20% Copy and Print Services"
		}
		];
	}
}])
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
				name: "Laurier Marketing Association",
				shortname: "LMA",
				slug: "lma",
				desc: "The Laurier Marketing Association is a student organization dedicated to undergraduates interested in marketing. We’ve teamed up with the best resources Wilfrid Laurier has to offer: world-renowned faculty, successful alumni, industry leaders, and recruiters from the world’s top companies. You may want to know if marketing is right for you, or you may already be on your way into the real marketing world. Either way, we’ll help you get your head start. Ultimately, our mission is to help our members attain the level of marketing experience they desire by providing comprehensive resources that span the academic, professional, and social faces of marketing.",
				logo: "LMA.png",
                banner:"banners/LMABanner.png",
				email: "president@lauriermarketing.com",
				website: "http://lauriermarketing.com",
				tags: [
                "Marketing",
                "Networking",
                "Case Competitions"
				],
                social: {
                    facebook:"https://www.facebook.com/lauriermarketing/",
                    linkedin:"https://www.linkedin.com/company/2911388?trk=tyah&trkInfo=tarId%3A1409684615987%2Ctas%3Alaurier%20marketing%20association%2Cidx%3A1-1-1",
                    twitter:"https://twitter.com/wlumarketing",
                    youtube:"https://www.youtube.com/user/LaurierMarketing",
                    intsagram:"https://www.instagram.com/wlumarketing/",
                }
			},
			{
				id: 1,
				name: "Laurier Consulting Club",
				shortname: "LCC",
				slug: "lcc",
				desc: "Since 2009, the Laurier Consulting Club has continued to grow both in membership numbers as well as in quality – here’s how:We operate with the intentions of improving the knowledge and technical skills of the students of SBE at Wilfrid Laurier University. Through our two portfolios – engagement and the Laurier Consulting Program (LCP) we aim to provide unique and tangible opportunities that can help students grow on a professional level making them able to compete in the consulting landscape. Through ‘Engagement’, we offer workshops, networking events, info sessions and a large-scale case competition to allow for learning about the industry, learning techniques that can be used to get hired, and finally, case practice – an industry essential. The ‘Laurier Consulting Program’ is unique to LCC and seamlessly complements our engagement portfolio by allowing students to deploy what they have learned at our events in real consulting engagements setup and managed by our executive team.",
				logo: "LCC.png",
                banner:"banners/LCCBanner.png",
                website: "http://www.laurierconsulting.ca",
				tags: [
                "Consulting",
                "Networking"
				],
                social: {
                    facebook:"http://www.facebook.com/LaurierConsultingClub",
                    linkedin:"https://www.linkedin.com/company/laurier-consulting-club",
                    twitter:"https://twitter.com/wluconsulting",
                    instagram: "https://www.instagram.com/laurierconsulting/"
                }
			},
			{
				id: 2,
				name: "Golden Speakers Club",
				shortname: "GSC",
				slug: "gsc",
				desc: "The Golden Speakers Club was created to change the way students think about and perform when Public Speaking. The Golden Speakers Club’s flagship event is the Public Speaking Competition in which students can put their public speaking abilities to the test in front of a panel of judges.",
				logo: "GoldenSpeakers.png",
				website: "http://www.goldenspeakersclub.com",
                banner:"banners/GSBanner.png",
				tags: [
                    "Public Speaking",
                    "First Year",
                    "Networking"
				],
                social: {
                    facebook:"https://www.facebook.com/goldenspeakersclub",
                    linkedin:"https://www.linkedin.com/company/golden-speakers-club",
                    twitter:"https://twitter.com/speakgolden",
                    youtube:"https://www.youtube.com/channel/UCx6vgUGFfx1haFRmxdQ3G6Q",
                    instagram:"https://www.instagram.com/goldenspeakers/"
                }
			},
			{
				id: 3,
				name: "Enactus",
				shortname: "Enactus",
				slug: "enactus",
				desc: "Enactus is a non-profit global organization dedicated to inspiring students to improve the world through entrepreneurial action. There are over 1700 university programs running Enactus in 36 countries, with over 70,500 participating students and building 550 partnerships with corporate organizations and individuals. We provide a platform for teams of outstanding university and college students to create community development projects that put people’s own ingenuity and talents at the centre of improving their livelihoods. Guided by educators and supported by business leaders, our students take the kind of entrepreneurial approach that empowers people to be a part of their own success. Our work transforms both the lives of the people we serve, and in turn, the lives of our students as they develop into more effective, values-driven leaders.An annual series of Regional and National Competitions provides a forum for teams to showcase the impact of their outreach efforts and to be evaluated by executives serving as judges. National champion teams advance to the prestigious Enactus World Cup to experience excellence in competition, collaboration, and celebration.",
				logo: "Enactus.png",
				website: "http://enactuslaurier.ca",
                banner:"banners/EnactusBanner.png",
				tags: [
                    "Entrepreneurship",
                    "Social Change"
				],
                social: {
                    facebook:"https://www.facebook.com/enactuswlu",
                    linkedin:"https://www.linkedin.com/company/enactus-laurier",
                    twitter:"https://twitter.com/enactuslaurier",
                    instagram:"https://www.instagram.com/enactuslaurier/"
                }
			},
			{
				id: 4,
				name: "DECA",
				shortname: "DECA",
				slug: "deca",
				desc: "DECA Laurier is a student-run organization that provides students with the essential skills needed to survive and excel in the corporate world. These skills are enhanced in the field of marketing, entrepreneurship, finance and business management through the use of business simulations and case studies. Each year, competitions are held regionally, provincially and internationally to further challenge and engage our members beyond what they think they are capable of, pushing them to exceed expectations and limits. DECA Laurier strives to create a bridge between the knowledge acquired at school and the practical skills needed at the work place. It is an experience that provides a platform for students to learn, compete and succeed in today’s vastly changing environment.",
				logo: "Deca.png",
				website: "http://www.decawlu.ca",
                banner:"banners/DECABanner.png",
				tags: [
                    "Public Speaking",
                    "Case Competitions",
                    "Networking"
				],
                social: {
                    facebook:"https://www.facebook.com/decalaurier",
                    linkedin:"https://www.linkedin.com/company/deca-u-laurier",
                    twitter:"https://twitter.com/decalaurier",
                    youtube:"https://www.youtube.com/user/DecaLaurier",
                    instagram:"https://www.instagram.com/deca_laurier/"
                }
			},
			{
				id: 5,
				name: "The Advertising Project",
				shortname: "TAP",
				slug: "theAdProject",
				desc: "The Advertising Project is dedicated to providing eye-catching, dynamic advertising for local enterprises and not-for-profits through digital and print media to help businesses soar above the competition. All advertising is created and designed by students looking to gain experience in the industry as graphic designers, copywriters, and account executives.",
				logo: "TAP.png",
				website: "http://www.theadvertisingproject.com",
                banner:"banners/TAPBanner.png",
				tags: [
				"Advertising",
				"Marketing",
				"Case Competitions"
				],
                social: {
                    facebook:"https://www.facebook.com/theadvertisingproject"
                }
			},
			{
				id: 6,
				name: "AIESEC",
				shortname: "AIESEC",
				slug: "aiesec",
				desc: "AIESEC is the world’s largest student run organization present in over 128 countries and 2800 universities. AIESEC is focused on leadership development through the facilitation of international exchange. We provide students opportunities to develop themselves personally and professionally through our various programs such as campus involvement and exchange. AIESEC has the ability to send Laurier students on exchange to different countries for various internships and provide an incredible international experience.",
				logo: "Aiesec.png",
				website: "http://aiesec.ca",
                banner:"banners/AIESECBanner.png",
				tags: [
                    "International"
				],
                social: {
                    facebook:"https://www.facebook.com/AIESECLaurier/",
                    linkedin:"https://www.linkedin.com/company/aiesec-laurier",
                    twitter:"https://twitter.com/aieseclaurier",
                    youtube:"https://www.youtube.com/channel/UCKJqaocNZ_RpR7hWjyfAyvg",
                    instagram:"https://www.instagram.com/aieseclaurier/"
                }
			},
			{
				id: 7,
				name: "Atrium Media Group",
				shortname: "AMG",
				slug: "atrium",
				desc: "The Atrium Media Group is a dynamic and innovative media organization that provides rewarding opportunities for students to showcase their creativity and talent through various initiatives including; the trademark Atrium Magazine that is published thrice a year, the new multi-functional blog featuring articles and editorials not found in our magazine, and the rapidly growing Atrium Photography/Videography Team. AMG has been a part of SBE’s history for over 20 years, during which it has aimed to represent the students of SBE by bringing light to the current issues, concerns, and interests of our community.",
				logo: "AMG.png",
				website: "http://sbeatrium.com",
                banner:"banners/AMGBanner.png",
				tags: [
				"Marketing",
				"Media",
				"Journalism",
				],
                social: {
                    facebook:"https://www.facebook.com/sbeatrium",
                    linkedin:"https://www.linkedin.com/company/929812?trk=prof-exp-company-name",
                    twitter:"https://twitter.com/sbeatrium",
                    youtube:"https://www.youtube.com/channel/UCiBLuhg1VXPn-UtGikIBKWA",
                    instagram:"https://www.instagram.com/sbeatrium/"
                }
			},
			{
				id: 8,
				name: "Laurier Economics Club",
				shortname: "LEC",
				slug: "lec",
				desc: "he Laurier Economics Club (LEC) is Laurier’s only economics-focused club on campus. Our goal is to provide resources to students who are interested in the field of economics. Through our speaker engagements, mock midterm sessions, and our annual conference, we expose our members to a diverse range of economic knowledge and experience. We strive to enhance each member’s academic journey while providing them with tools to help them realize their full potential and value in a degree/minor in economics.",
				logo: "LEC.png",
				website: "http://lauriereconomics.club",
                banner:"banners/LECBanner.png",
				tags: [
				"Economics",
				"Mock Midterm",
                "Networking"
				],
                social: {
                    facebook:"https://www.facebook.com/LaurierEconClub/",
                    linkedin:"https://www.linkedin.com/company/laurier-economics-club",
                    twitter:"https://twitter.com/laurierecon",
                    youtube:"https://www.youtube.com/channel/UCN1p50AHX2Hj-pMD7PHZhsA"
                }
			},
			{
				id: 9,
				name: "Startup Laurier",
				shortname: "Startup",
				slug: "startup",
				desc: "Startups and Waterloo are two words that fit perfectly together. Startup Laurier (formerly know as the Laurier Innovation and Technology Club) brings that entrepreneurial culture to campus. Our events, programs, and initiatives are meant to empower Laurier students to explore and pursue their entrepreneurial ambitions. Whether it be starting your own business, working for a startup, growing a skill, or wanting to learn more about Kitchener-Waterloo’s entrepreneurship community, we provide students with the resources and connections to make it happen.",
				logo: "SL.png",
				website: "http://www.startuplaurier.com",
                banner:"banners/StartupBanner.png",
				tags: [
				"Entrepreneurship",
				"Startups",
				"Technology",
                "Networking"
				],
                social: {
                    facebook:"https://www.facebook.com/startuplaurier/",
                    linkedin:"https://www.linkedin.com/company/startup-laurier",
                    twitter:"https://twitter.com/startuplaurier",
                    youtube:"https://www.youtube.com/channel/UCrMbYqEUQNVcMuj1w6jY0kQ",
                    instagram:"https://www.instagram.com/startuplaurier/"
                }
			},
			{
				id: 10,
				name: "Sports Management Laurier",
				shortname: "SML",
				slug: "sml",
				desc: "Sports Management Laurier (SML) provides students the chance to connect with prominent professionals in the sports management industry. SML makes it possible for individuals to pursue their dream career within the Brand, Agency, and Broadcast sectors of the industry. SMLs flagship events include a speaker series and various social events with industry professionals. SML has a proud partnership with TSN.",
				logo: "SML.png",
				website: "http://www.smlaurier.com",
                banner:"banners/SMLBanner.png",
				tags: [
				"Marketing",
				"Sports Management",
				"Networking"
				],
                social: {
                    facebook:"https://www.facebook.com/smlaurier/",
                    linkedin:"https://www.linkedin.com/company/sports-management-laurier",
                    twitter:"https://twitter.com/smlaurier",
                    instagram:"https://www.instagram.com/smlaurier/"
                }
			},
			{
				id: 11,
				name: "Laurier Investment & Finance Association",
				shortname: "LIFA",
				slug: "lifa",
				desc: "Laurier Investment & Finance Association’s (LIFA) mission is to develop, educate and inspire students into exploring the different roles within the finance industry. Our commitment to the Laurier community is to offer valuable opportunities, including unique and instructive events for students to interact, network and learn from today’s industry leaders.",
				logo: "LIFA.png",
				website: "http://www.lifawlu.ca",
                banner:"banners/LIFABanner.png",
				tags: [
				"Finance",
				"Networking",
                "Capital Markets",
                "Investing",
                "Economics"
				],
                social: {
                    facebook:"https://www.facebook.com/LIFApage/",
                    linkedin:"https://www.linkedin.com/in/laurier-investment-and-finance-association-5a415556",
                    twitter:"https://twitter.com/LIFA_wlu"
                }
			},
			{
				id: 12,
				name: "Laurier Sales Association",
				shortname: "LSA",
				slug: "lsa",
				desc: "The key to success in ANY business career is simple: increase your sales skills. No matter what your role is, selling is part of your job. Sales is not about manipulating or pressuring your client, it is about effectively communicating the benefits and logic behind a decision. Most importantly, it is about selling YOURSELF. The Laurier Sales Association prides itself in being one of Canada’s first and only clubs focused entirely on sales. We work with our sponsors to provide a hands-on- approach through workshops, sales competitions and networking events. Join us today to learn more about careers in sales and enhance the skill set to excel in any profession.",
				logo: "LSA.png",
				website: "http://www.lauriersales.com",
                banner:"banners/LSABanner.png",
				tags: [
				"Sales",
				"Public Speaking",
                "Marketing"
				],
                social: {
                    facebook:"https://www.facebook.com/LaurierSales/?fref=ts",
                    linkedin:"https://www.linkedin.com/company/laurier-sales-association",
                    twitter:"https://twitter.com/lauriersales",
                    instagram:"https://www.instagram.com/lauriersalesassociation/"
                }
			},
			{
				id: 13,
				name: "JDCC",
				shortname: "JDCC",
				slug: "jdcc",
				desc: "JDC Central is a team-based, academic case study competition that will attract more than 500 of the brightest students in Eastern Canada to participate in the most prestigious event of its kind. JDC competitors participate in rigorous academic case simulations, a debate competition, athletic, social, and spirit events throughout a fast-paced and competitive weekend. JDC Laurier’s pride, dedication, and wealth of superior talent has resulted in seven straight championships in seven years of competition.",
				logo: "JDCC.png",
				tags: [
				"Public Speaking",
				"Case Competitions"
				],
                social: {
                    facebook:"https://www.facebook.com/JDCCLaurier/?fref=ts",
                    linkedin:"https://www.linkedin.com/company/laurier-sales-association",
                    twitter:"https://twitter.com/jdcclaurier",
                    instagram:"https://www.instagram.com/jdcclaurier/"
                }
			},
			{
				id: 14,
				name: "XLerate",
				shortname: "XLerate",
				slug: "xlerate",
				desc: "XLerate is a club run exclusively for first year Laurier Business and Economics students to help ease the transition from high school to university. We aim to help each student maintain a balance of academic success, community involvement and social development; all needed to help you survive and thrive in your first year at Laurier!",
				logo: "XL.png",
				website: "http://www.xleratewlu.ca",
                banner:"banners/XLBanner.png",
				tags: [
				"1st Year",
				"Exam Review",
                "Case Competitions",
                "Public Speaking",
                "Networking"
				],
                social: {
                    facebook:"https://www.facebook.com/XLerateWLU/",
                    linkedin:"https://www.linkedin.com/company/xlerate-laurier"
                }
			},
			{
				id: 15,
				name: "WLU Debate Society",
				shortname: "WLU Debate",
				slug: "wludebate",
				desc: "The WLU Debating Society is Laurier’s Waterloo campus debate club. We hold meetings weekly and attend tournaments regularly. To join, all you have to do is participate by coming out to our meetings! You do not need any previous debating experience, and are welcomed to attend any time throughout the year. At our meetings, an experienced member of the club will give a brief debating lesson, and you will be able to participate in practice rounds.",
				logo: "Debate.png",
				website: "http://www.wludebating.com",
                banner:"banners/DebateBanner.png",
				tags: [
				"Public Speaking",
				"Debate"
				],
                social: {
                    facebook:"https://www.facebook.com/WLUdebating/",
                    twitter:"https://twitter.com/wludebating"
                }
			},
			{
				id: 16,
				name: "Women in Leadership Laurier",
				shortname: "WILL",
				slug: "will",
				desc: "Women In Leadership Laurier (WILL) is an innovative business club at Wilfrid Laurier University. Our mission focuses on promoting equal opportunity and continuous learning. WILL strives to provide leadership skills, resources, information and support needed to succeed in today’s professional environment. By embracing knowledge from experienced speakers, the Waterloo community and our peers, we encourage growth without any boundaries.",
				logo: "WILL.png",
				website: "http://www.willaurier.org",
                banner:"banners/WILLBanner.png",
				tags: [
				"Women in Business",
				"Networking",
                "Leadership"
				],
                social: {
                    facebook:"https://www.facebook.com/WomeninLeadershipLaurier/",
                    twitter:"https://twitter.com/WILLaurier",
                    instagram: "https://www.instagram.com/willaurier/",
                    linkedin:"https://www.linkedin.com/groups/4926207/profile"
                }
			},
			{
				id: 17,
				name: "Students Offering Support",
				shortname: "SOS",
				slug: "sos",
				desc: "Students Offering Support is a national network of student volunteers who offer comprehensive Exam-AID review sessions right before midterms and finals to raise money for sustainable education projects in Latin America. Students who attend the session donate $20 to review the course content with a senior student who has taken the course before. After the session, students are ready to ace the exam! The money raised funds our outreach trips, which take groups of students to countries such as Costa Rica, Peru, and Nicaragua to contribute to the construction projects that SOS is funding.",
				logo: "SOS.png",
				website: "http://laurier.soscampus.com/index.php?lm_slug=lm_index",
                banner:"banners/SOSBanner.png",
				tags: [
				"International",
				"Exam Review",
				"Tutoring",
                "Social Enterprise"
				],
                social: {
                    facebook:"https://www.facebook.com/lauriersos",
                    twitter:"https://twitter.com/LaurierSOS",
                    instagram: "https://www.instagram.com/studentsofferingsupport/",
                    youtube: "https://www.youtube.com/channel/UCSv4Sn_Xun59ecixQcM8qNA",
                    linkedin:"https://www.linkedin.com/company/students-offering-support"
                }
			},
			{
				id: 18,
				name: "The Link",
				shortname: "The Link",
				slug: "thelink",
				desc: "The Link’s mission is dedicated to connecting past, present and future students within Wilfrid Laurier University’s School of Business and Economics, the community and internationally by promoting leadership and networking opportunities in a professional manner. The Link strives to create an environment where students can grow on an academic, professional and personal level. Since its establishment in April 2002, The Link has provided Wilfrid Laurier Business & Economics students the chance to connect and network with future students, past students, and university faculty. Our first event was The Leadership in Business Conference, which allowed university students to teach high school students business skills in a friendly yet competitive environment. Today, The Link has grown into a diverse and unique business organization, which carries forth the values of leadership, networking and development. The Link executive team consists of creative, energetic and innovative individuals who strive to be a positive influence in their school, community, and international business world.",
				logo: "Link.png",
				website: "http://thelinkonline.org/update/",
                banner:"banners/LinkBanner.png",
				tags: [
				"Networking",
				"International",
                "Leadership"
				],
                social: {
                    facebook:"https://www.facebook.com/TheLinkWLU/",
                    twitter:"https://twitter.com/thelinkwlu",
                    instagram: "https://www.instagram.com/thelinkwlu/",
                    youtube: "https://www.youtube.com/channel/UC8xLVjBN2FPqj5VIdJfs05g",
                    linkedin:"https://www.linkedin.com/company/the-link-wlu"
                }
			},
			{
				id: 19,
				name: "Technology Management Laurier",
				shortname: "TML",
				slug: "tml",
				desc: "Technology Management Laurier (TML) connects students to the growing global technology sector. Technology Management Laurier strives to provide each member with the opportunity to succeed in the technology sector, or enhance their business-tech abilities. From insights into the industry from technical and corporate perspectives, to partnered events with local tech incubators like the Communitech Hub, we empower innovation. As Laurier’s only tech-business club, TML has grown rapidly since its inception by issuing improved member services in the form of a Speaker Series with large-scale technology companies, tech-incubator tours, networking opportunities and the Consumer Electronic Demo. Additionally, TML has assisted local businesses and startups through its Consultech (Consulting Division), and continues to provide technological implementation services (Social Media, Web Development, and much more). Most recently, Tech-Management Laurier has also partnered with the Laurier Startup Fund course to further develop the Consultech division.",
				logo: "TML.png",
				website: "http://www.lauriertech.com",
                banner:"banners/TMLBanner.png",
				tags: [
				"Technology",
				"Networking",
				],
                social: {
                    facebook:"https://www.facebook.com/EBusinessLaurier/",
                    twitter:"https://twitter.com/LaurierTech_",
                    instagram: "https://www.instagram.com/lauriertech/"
                }
			},
			{
				id: 20,
				name: "Laurier Accounting Association",
				shortname: "LAA",
				slug: "laa",
				desc: "We’re in a unique position – we have the ears of the recruitment departments of top domestic and international accounting firms, and the attention of Laurier business students holding the largest member base of any WLU club. Let us use it to help each individual set and achieve career goals. We’re here to organize events, provide resources, and create connections that result in success and achievement for both sides of the table. Above all, our end goal is to educate Laurier students on the various accounting career paths that are available to them.",
				logo: "LAA.png",
				website:"http://laurieraccounting.com",
                banner:"banners/LAABanner.png",
				tags: [
				"Accounting",
				"Finance",
                "Networking"
				],
                social: {
                    facebook:"https://www.facebook.com/LaurierAccounting/",
                    twitter:"https://twitter.com/WLUaccounting",
                    instagram: "https://www.instagram.com/wluaccounting/",
                    linkedin:"https://www.linkedin.com/company/laurier-accounting-association"
                }
			},
            {
				id: 21,
				name: "5 Days for the Homeless",
				shortname: "5 Days",
				slug: "5days",
				desc: "5 Days for the Homeless is a national charity that is run annually by the Lazaridis School of Business and Economics. This campaign raises money and awareness for two youth shelters in the Kitchener/Waterloo area. Each campaign, five Laurier students give up basic luxuries and live outside on campus with only a sleeping bag and the clothes on their backs.",
				logo: "5days.png",
				website: "http://5days.ca/schools/wilfrid-laurier-university/",
				banner: "banners/5DaysBanner.png",
				tags: [
				"Social Change"
				],
                social: {
                    facebook:"https://www.facebook.com/5DaysLaurier",
                    twitter:"https://twitter.com/5DAYSLAURIER",
                    instagram: "https://www.instagram.com/5dayslaurier/",
                    youtube: "https://www.youtube.com/channel/UCKGPVYRibnlDM5uUxuydP0g"
                }
			},
            {
				id: 22,
				name: "Lazaridis Students' Society",
				shortname: "LazSoc",
				slug: "lazsoc",
				desc: "The Lazaridis Students’ Society strives to enhance the student experience of every Lazaridis student by providing opportunities for students to discover and pursue their passions.",
				logo: "LazSoc.png",
				website: "http://lazsoc.ca",
				banner: "banners/LazSocBanner.png",
				tags: [
                    "Leadership"
				],
                social: {
                    facebook:"https://www.facebook.com/LazSoc",
                    twitter:"https://twitter.com/LazSoc",
                    instagram: "https://www.instagram.com/LazSoc/",
                    linkedin: "https://www.linkedin.com/company/lazaridis-students%27-society?trk=biz-companies-cym",
                    youtube: "https://www.youtube.com/user/LazSoc",
                    snapchat: "lazsoc"
                }
			}
			
		];

		if (!isEmptyObject(clubs) && !isEmptyObject(APIresult)) { // Has local preferences saved, reconcile club data and API returned
			var reconciled = reconcileClubs(APIresult, clubs);
			$localstorage.setObject('sbess-app-clubPrefs', reconciled);
		    return reconciled;
		} else if ( !isEmptyObject(APIresult) ) { // No local storage but API returned
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
			console.log("API Call Made for Events");
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
			console.log("Local storage loaded for Events");
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
	
