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
	
	var events = [
		{ 
			id: 0,
			title: 'BU111 Workshop',
			clubSlug: 'sos',
			timePublished: '11/24/15 4:00 PM',
			startDate: 'Friday, July 3rd at 4:00 PM',
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
			imgSrc: 'banners/Laurier-Economics-Club.png',
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
			thumbnail: "thumbnails/SML-Transparent.gif",
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
				title: 'EB Workshop', 
				clubSlug: 'eb',
				timePublished: '11/27/15 4:00 PM',
				startDate:'06/06/15 3:45 PM', 
				endDate: '06/06/15 9:00 PM',
				subheader:'',
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
				thumbnail:"thumbnails/EB-Transparent.gif",
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
				thumbnail:"thumbnails/AdHawk_Logo.jpg",
				tags:["Marketing","Advertising"],
				desc:""
			},
			{
				id: 4,
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
			}
	];
	this.getAllEvents = function(){
		return events;
	}
});
	
