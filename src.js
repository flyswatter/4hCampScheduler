function readyFunction(){
	$('#generate').click(function(event){
		event.preventDefault();
		console.log("Generate pressed.");
		$('body').text("Generate pressed.");

		var tribes = ["Tribe A","Tribe B",
			"Tribe C", "Tribe D", "Tribe E",
			"Tribe F", "Tribe G", "Tribe H",
			"Tribe I", "Tribe J"];
		var workshops = [1,2,3,4,5];
		var days = ["sunday", "monday","tuesday","wednesday","thursday","friday"];
		var chores = ["KP", "johnDuty", "campfire"];

		var twoTribesDoNotMeetTwice = function(testSchedule){
			tribes.forEach(tribe){
				tribes.forEach(tribe2){
					var activitiesInCommon = 0;
					testSchedule.forEach(day){
						//Check for campfire in common,
						if($.inArray(tribe, day.campFire && $.inArray(tribe2, day.campFire){
							activitiesInCommon+=1;
						}
						//Check for workshops in common.
						day.workshops.forEach(session){
							session.forEach(workshop){
								if($.inArray(tribe, workshop && $.inArray(tribe2, workshop){
									activitiesInCommon+=1;
								}
							}
						}	
					}
					if (activitiesInCommon > 1) {
						return false;
					}
				}
			}
			return true;
		}

		var eachTribeTakesEachWorkshopOnce= function(testSchedule){
			//Initializing a checklist for all the workshops.
			var tribeChecklist = {};
			tribes.forEach(tribe){
				tribeChecklist[tribe]=false;
			}
			var workshopChecklist = {};
			workshops.forEach(workshop){
				workshopChecklist[workshop]=tribeChecklist;
			}
			//Check tribes off checklist
			testSchedule.forEach(day){
				day.workshops.forEach(session){
					workshops.forEach(workshop){
						workshopChecklist[workshop][session[workshop][0]]=true;
						workshopChecklist[workshop][session[workshop][1]]=true;
					}
				}
			}
			//Check if any workshops are un-taken:
			tribes.forEach(tribe){
				workshops.forEach(workshop){
					if(!workshopChecklist[workshop][tribe]){
						return false;
					}
				}
			}
			return true;
		}

		var criteriaToMeet = [eachTribeTakesEachWorkshopOnce, twoTribesDoNotMeetTwice];

		function checkCriteria(testSchedule){
			criteriaToMeet.forEach(criteria){
				if (criteria(testSchedule)===false){
					return false;
				}
				return true;
			}
		}

		var sampleDaySchedule = [
			{name:"wednesday",
			kp:["Tribe A", "Tribe F"],
			johnDuty:["Tribe B", "Tribe C"],
			campFire:["Tribe D", "Tribe E"],
			workshops:[{
				1:["Tribe J", "Tribe I"],
				2:["Tribe C", "Tribe A"],
				3:["Tribe B", "Tribe F"],
				4:["Tribe D", "Tribe J"],
				5:["Tribe E", "Tribe G"]
			},
			{
				1:["Tribe J", "Tribe I"],
				2:["Tribe C", "Tribe A"],
				3:["Tribe B", "Tribe F"],
				4:["Tribe D", "Tribe J"],
				5:["Tribe E", "Tribe G"]
			}]
		}];

		var permArr = [], usedChars = [], chorePermutations = [], workshopPermutations=[];
		function permute(input) {
		    var i, ch;
		    for (i = 0; i < input.length; i++) {
		        ch = input.splice(i, 1)[0];
		        usedChars.push(ch);
		        if (input.length == 0) {
		            permArr.push(usedChars.slice());
		        }
		        permute(input);
		        input.splice(i, 0, ch);
		        usedChars.pop();
		    }
		    return permArr
		};
		var schedule=[{},{},{},{},{},{}];

		function generateSchedules(){
			var schedules = [];

			//First generate all chore permutations:
			var singleChorePermutations = permute(tribes);


			//Go through all KP permutations:
			singleChorePermutations.forEach(kpPermutation){
				var kpNumber = 0;
				//Add this permutation to the current schedule;
				for (var i = 0; i < days.length; i++){
					schedule[i][name]=days[i];
					//Sunday has no KP
					if (days[i] !== "sunday") {
						schedule[i][kp].push(kpPermutation[kpNumber]);
						kpNumber+=1;
						schedule[i][kp].push(kpPermutation[kpNumber]);
						kpNumber+=1;
					}
				}
				//Next we'll go through all John Duty permutations:
				singleChorePermutations.forEach(jdPermutation){
					var jdNumber = 0;
					//Add this permutation to the current schedule;
					for (var i = 0; i < days.length; i++){
						//Sunday has no jd
						if (days[i] !== "sunday") {
							schedule[i][jd].push(jdPermutation[jdNumber]);
							jdNumber+=1;
							schedule[i][jd].push(jdPermutation[jdNumber]);
							jdNumber+=1;
						}
					}
					//Next we'll go through all Campfire permutations:
					singleChorePermutations.forEach(cfPermutation){
						var cfNumber = 0;
						//Add this permutation to the current schedule;
						for (var i = 0; i < days.length; i++){
							//Wednesday has no cf
							if (days[i] !== "wednesday") {
								schedule[i][cf].push(cfPermutation[cfNumber]);
								cfNumber+=1;
								schedule[i][cf].push(cfPermutation[cfNumber]);
								cfNumber+=1;
							}
						}

						//Last we'll go through all workshop permutations.
						singleChorePermutations.forEach(w1Permutation){
							singleChorePermutations.forEach(w2Permutation){
								singleChorePermutations.forEach(w3Permutation){
									singleChorePermutations.forEach(w4Permutation){
										singleChorePermutations.forEach(w5Permutation){
											var workshops = [w1Permutation,w2Permutation,w3Permutation,w4Permutation,w5Permutation];
											function addWorkshop(wPermutation){
												return {
													1:[wPermutation[0], wPermutation[1]],
													2:[wPermutation[2], wPermutation[3]],
													3:[wPermutation[4], wPermutation[5]],
													4:[wPermutation[6], wPermutation[7]],
													5:[wPermutation[8], wPermutation[9]]
												};
											}
											var workshopNumber = 0;
											schedule.forEach(day){
												day[workshops]=[];
												if (day.name === "monday" ||  day.name === "tuesday"||day.name === "monday"||day.name === "thursday") {
													day.workshops.push(addWorkshop(workshops[workshopNumber]));
													workshopNumber+=1;
												}
												if (day.name === "wednesday") {
													day.workshops.push(addWorkshop(workshops[workshopNumber]));
													workshopNumber+=1;
													day.workshops.push(addWorkshop(workshops[workshopNumber]));
													workshopNumber+=1;
												}
											}
											//All workshops have been added to the schedule.  Time to evaluate it, and add it to the list if it's good.
											if (checkCriteria(schedule)) {
												schedules.push(schedule);
												console.log("Good schedule found!: "+schedule);
											};
										}
									}
								}
							}
						}
					}
				}

			}
			return schedules;	
		}
		var schedules = generateSchedules();
	});
}