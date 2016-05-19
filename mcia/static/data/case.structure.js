define([],function(){
    return {
        "steps": [
            // step 01
            { desc : "Case Set Up",
              fields : [

                // MCIA Details
                { prompt : "Date of Report", response : "Purposely left blank" },           // set as date when "New Case" is selected, maybe provide option to edit
                { prompt : "Lead Point of Contact for Questions", response : "" },   // text input, should it be separated into name, phone, email
                { prompt : "Personnel Developing this Report", response : [""] },           // multi-select list
                { prompt : "Subject Matter Specialists", response : [""] },               // multi-select list, generated from selected personnel developing

                // Customer Project Details
                { prompt : "Contract Number", response : "" },               // <16 char text field
                { prompt : "Project Name and/or Number", response : "" }     // <64 char text field
              ]
            },

            // step 02
            { desc : "Incident Details and Summary",
              fields : [

                // Conditions 0-4
                { prompt : "Date", response : "" },                    // MM/DD/YYYY input format, use plugin to make idiot-proof
                { prompt : "Weather Conditions at Time of Incident", response : [""] },    // multi-select list
                { prompt : "Time of Incident", response : "" },                    // To the hour, select from defined list of hours in the day
                { prompt : "Location of Incident", response : "" },     // select from dropdown
                { prompt : "JSA Review", response : "" },                      // boolean, file upload available

                // Injury Report(s) 5-11
                { prompt : "Affected Personnel", response : "" },      // Select input, chosen from list provided at org.settings
                { prompt : "Personnel Title", response : "" },          // Select input, chosen from list provided at org.settings
                { prompt : "Age at Date of Incident", response : "" },  // due to non-linear data tracking, a dropdown select is provided
                { prompt : "Working Alone", response : "" },            // yes or no (radio)
                { prompt : "Experience in Industry", response : "" },      // integer input, range of options TBD
                { prompt : "Experience at Company", response : "" },      // integer input, range of options TBD
                { prompt : "Personnel Training", response : [""] },     // multi-select, by system admin, or remote DB

                // Shift Information 12-15
                { prompt : "Shift Schedule", response : "" },         // 1st, 2nd, or 3rd shift (radio)
                { prompt : "Was this the employee's usual shift?", response : "" },     // Yes or No (radio)
                { prompt : "Next Scheduled Time Off", response : "" },  // integer input, range slider 0-30
                { prompt : "Time to Shift's End", response : "" },      // integer input, range slider 0-8

                // Incident Specifics 16-18
                { prompt : "Type of Incident", response : "" },                      // Select input, predefined list
                { prompt : "Body Parts Affected/At Risk", response : "" },                    // Select input, predefined list
                { prompt : "Injury Type", response : "" },    // Select input, predefined list

                // Configuration 19-28
                { prompt : "Operating Division", response : "" },                            // select input, chosen from list provided at org.settings
                { prompt : "Incident Location/Job Site", response : "" },                    // select input, chosen from list provided at org.settings
                { prompt : "Operation Underway at Time of Incident", response : "" },        // select input, chosen from list provided at org.settings
                { prompt : "Job Task Underway", response : "" },                             // single-select, list from settings.org
                { prompt : "Personal Protective Equipment (PPE) in Use", response : [""] },  // mutli-select dropdown, chosen from list provided at org.settings
                { prompt : "Crew Configuration", response : "" },                            // textarea input, <256 chars
                { prompt : "Crew Member's Title", response : "" },                           // textarea input, <256 chars
                { prompt : "Crew Member's Experience", response : "" },                      // textarea input, <256 chars
                { prompt : "Vessel/Equipment Configuration", response : "" },                // textarea input, <256 chars
                { prompt : "Tools/Materials Configuration", response : "" },                // textarea input, <256 chars


                // Recovery Factors 29-30
                { prompt : "Barriers that Worked", response : [""] },         // multi-select checkbox input, chosen from list provided at org.settings
                { prompt : "Failed Barriers", response : "" },                // textarea input, <256 chars

                // Incident Summary 31-32
                { prompt : "Detailed Summary of Incident", response : ""},     // pontentially monstrous tldr wall of text
                { prompt : "Key Potential Contributing Factors from the Incident Summary", response : ""}                                 // I wonder how many scribes will fill this field out?
              ]
            },

            // step 03
            { desc : "Identify Contributing Factors",
              categories : [
                { name : "Operator/Individual(s) Involved",
                  helpText: "This section looks at the many demands crew members face, working alone and with each other.",
                  subCategories : [
                    { name : "Information Exchanged Before, During, and After Job: Job Assignment, Job Safety Briefing, Other",
                      helpQuery : [
                        "Who sent the message? Who received it?",
                        "Where did the communication take place?",
                        "When did the communication take place?",
                        "Was communication verbal or non‐verbal? In person, by radio, or by some other electronic means? Interactive or one‐way?",
                        "What are possible physical interferences or language barriers?",
                        "Did communication follow standard procedures and protocol?",
                        "What were the points of confusion?",
                        "Was there a misunderstanding?",
                        "Was the message inaccurate?",
                        "What were the checks for understanding?"
                      ]
                    },
                    { name : "On-site Work Group",
                      helpQuery : [
                        "How long did the crew work together?",
                        "How well did the crew get along?",
                        "What was the crew's range of experience?",
                        "How were roles assigned? Were those roles clear?",
                        "Did the crew do a risk assessment?",
                        "Job safety briefing: who led, type of interaction, safety component, checks for understanding?",
                        "How did the crew collaborate and make decisions as a team?",
                        "How was work performance consistent with common practice and expectations?",
                        "Were decision points understood and followed?",
                        "Was the original plan of work changed? How?"
                      ]
                    },
                    { name : "Planning and Flexibility",
                      helpQuery : [
                        "How well did the crew plan for the job they thought they were going to do: inspections,hazard analysis, review of job details, communications, channels, other?",
                        "How much crew participation was there in developing the plan?",
                        "How much flexibility was the crew given when dealing with the unexpected?",
                        "How effectively did the crew use that flexibility to deal with the unexpected?"
                      ]
                    },
                    { name : "Rules/Regulations/Procedures",
                      helpQuery : [
                        "Which rules, procedures, and regulations applied to the crew’s job tasks involved in this incident?",
                        "Were they clearly understood?",
                        "Were they consistently complied with and enforced? If no, is noncompliance routine, the exception, or on purpose?",
                        "What qualifications, endorsements, and/or licenses did the crew have?"
                      ]
                    },
                    { name : "Recall",
                      helpQuery : [
                        "What was crew’s familiarity with job?",
                        "What work from incident was memory related?",
                        "Were job tools available? If so, which tools were memory related?",
                        "Why did the crew think their actions were correct?",
                        "What pressures may have been on the crew while trying to remember?"
                      ]
                    },
                    { name : "Attention/Alertness/Fatigue",
                      helpQuery : [
                        "Was the crew ready for duty: rest, clear head, health, medication, PPE required for weather/conditions, sight/hearing?",
                        "What internal and/or external pressures affected the crew?",
                        "What was the crew required to have completed or underway before the incident occurred? Were those tasks routine or not?",
                        "What were the crew’s thoughts and actions before and after incident?",
                        "Did the incident occur between 03:00‐05:00 or 15:00‐17:00?",
                        "Did the incident occur at beginning, middle, or end of shift?",
                        "Did the crew feel time pressure to get the job done?",
                        "How many tasks were being performed at the time of the incident?",
                        "Did tasks require strenuous mental and/or physical activity? If so, for how long?"
                      ]
                    },
                    { name : "Stress",
                      helpQuery : [
                        "What stress was related to incident?",
                        "Were there signs of stress? If so, what were they?",
                        "Did the crew have access to/or make use of stress relievers?"
                      ]
                    },
                    { name : "On-site Work Group Knowledge/Skill/Ability (KSA)",
                      helpQuery : [
                        "What was the crew’s KSA to complete the job?",
                        "What was the specific training provided for the job?",
                        "Was the crew licensed and/or certified to perform the job?",
                        "Was the crew experienced at this location? Were new skills supervised on-site?",
                        "Was the crew experienced with the equipment, tools, and materials?",
                        "Did the crew have access to tools or resources? Did they know where to find them?",
                        "Was the crew able to problem solve in real time?",
                        "When did crew members realize something was wrong?",
                        "What out of the ordinary or unusual events happened just before or at the time of the occurrence?",
                        "How did the crew respond?"
                      ]
                    }
                  ]
                },
                { name : "Supervisory",
                  helpText: "This section looks at the challenges supervisors face and the decisions they make while getting work done safely through other people.",
                  subCategories : [
                    { name : "Information Exchanged Before, During, and After Job: Job Assignment, Job Safety Briefing, Other",
                      helpQuery : [
                        "Who sent the message? Who received it?",
                        "Where did the communication take place?",
                        "When did the communication take place?",
                        "Was communication verbal or non‐verbal? In person, by radio, or by some other electronic means? Interactive or one‐way?",
                        "What are possible physical interferences or language barriers?",
                        "Did communication follow standard procedures and protocol?",
                        "What were the points of confusion?",
                        "Was there a misunderstanding?",
                        "Was the message inaccurate?",
                        "What were the checks for understanding?"
                      ]
                    },
                    { name : "On-property Work Group",
                      helpQuery : [
                        "How long did the supervisor work with the crew?",
                        "How well did the supervisor get along with the crew?",
                        "What was the supervisor's range of experience?",
                        "How were roles assigned? Were those assignments clear?",
                        "Job safety briefing: who led, type of interaction, safety component, checks for understanding?",
                        "Was the supervisor aware of the risks to the crew?",
                        "Was the supervisor’s support for crew‐based decision making appropriate for this situation?",
                        "How was work performance consistent with common practice and expectations?",
                        "Were decision points understood and followed?",
                        "Was the original plan of work changed? How?"
                      ]
                    },
                    { name : "Planning and Flexibility",
                      helpQuery : [
                        "How well did the supervisor plan for the job: inspections, hazard analysis, review of job details,  communications, channels, other?",
                        "How much supervisor participation was there in developing the plan?",
                        "How much flexibility was the supervisor given when dealing with the unexpected?",
                        "How effectively did the supervisor use that flexibility to deal with the unexpected?"
                      ]
                    },
                    { name : "Rules/Regulations/Procedures",
                      helpQuery : [
                        "Which rules, procedures, and regulations applied to the supervisor’s job tasks involved in this incident?",
                        "Were they clearly understood?",
                        "Were they consistently complied with and enforced? If no, is noncompliance routine, the exception, or on purpose?",
                        "What qualifications, endorsements, and/or licenses did the supervisor have?"
                      ]
                    },
                    { name : "Recall",
                      helpQuery : [
                        "What was supervisor’s familiarity with job?",
                        "What work from incident was memory related?",
                        "Were job tools available? If so, which tools were memory related?",
                        "Why did the supervisor think his/her actions were correct?",
                        "What pressures may have been on the supervisor while trying to remember?"
                      ]
                    },
                    { name : "Attention/Alertness/Fatigue",
                      helpQuery : [
                        "Was the supervisor ready for duty: rest, clear head, health, medication, PPE required for weather/conditions, sight/hearing?",
                        "What internal and/or external pressures affected the supervisor?",
                        "What was the supervisor required to have completed or underway before the incident occurred? Were those tasks routine or not?",
                        "What were the supervisor’s thoughts and actions before and after incident?",
                        "Did the incident occur between 03:00‐05:00 or 15:00‐17:00?",
                        "Did the incident occur at beginning, middle, or end of shift?",
                        "Did the supervisor feel time pressure to get the job done?",
                        "How many tasks were being performed at the time of the incident?",
                        "Did tasks require strenuous mental and/or physical activity? If so, for how long?"
                      ]
                    },
                    { name : "Stress",
                      helpQuery : [
                        "What stress was related to incident?",
                        "Were there signs of stress? If so, what were they?",
                        "Did the supervisor have access to/or make use of stress relievers?"
                      ]
                    },
                    { name : "On-property Work Group Knowledge/Skill/Ability (KSA)",
                      helpQuery : [
                        "Did the supervisor have the KSA to do this job?",
                        "Did the supervisor have the training and required licenses/certifications to oversee the job?",
                        "Did the supervisor have a working knowledge of this job at this location?",
                        "Was the supervisor clear on crew expectations for the job and available to assist the crew, if needed?",
                        "Did the supervisor have experience in problem solving, communication, and leadership?"
                      ]
                    }
                  ]
                },
                { name : "Equipment/Tools/Materials",
                  helpText: "This section looks at the safety and design of equipment, tools, and materials along with the physical  requirements for operating them.",
                  subCategories : [
                    { name : "Maintenance/Housekeeping",
                      helpQuery : [
                        "What was the condition of the equipment?",
                        "What maintenance had been performed and documented?",
                        "What are the inspection protocols? Were pre-work inspections performed?",
                        "Were bad orders treated with B/O tags, properly reported, and set out?"
                      ]
                    },
                    { name : "Equipment/Tools Operation",
                      helpQuery : [
                        "Was the equipment in working order?",
                        "Were inspections and audits up to date and documented?",
                        "What physical actions were required for handling the hardware?",
                        "What were physical characteristics of hardware used at this site?",
                        "What safeguards were in place?"
                      ]
                    },
                    { name : "Operating Controls and Displays",
                      helpQuery : [
                        "What equipment, tools, and materials applied to the incident?",
                        "What were the physical characteristics of controls on equipment?",
                        "Were the controls easy to read: brightness, size, and clarity?",
                        "What was the location of the controls from where the operator was positioned?",
                        "Was any new technology in effect at this location? If so, was there proper training at this site?"
                      ]
                    },
                    { name : "Chemical/Biological Substances/Physical Agents",
                      helpQuery : [
                        "What chemicals, biological substances, and physical agents applied to the incident?",
                        "Who was exposed? For how long?",
                        "What was the level of exposure? Were there signs and symptoms?",
                        "What safety protections were in place?",
                        "Was the level of exposure more or less than usual for this job?",
                        "Were there preparations for the unexpected?",
                        "Were safety audits and inspections on hazardous materials current and documented?"
                      ]
                    }
                  ]
                },
                { name : "Work Space/Environment",
                  helpText: "This section looks at the physical and mental connections between people and the work performed in the work space.",
                  subCategories : [
                    { name : "Maintenance/Housekeeping",
                      helpQuery : [
                        "What was the condition of the equipment?",
                        "What maintenance had been performed and documented?",
                        "What are the inspection protocols? Were pre-work inspections performed?"
                      ]
                    },
                    { name : "Work Space Design",
                      helpQuery : [
                        "How was the work space set up?",
                        "How were instructions for the set-up of the work space followed?",
                        "Is the work space accessible and ergonomic?",
                        "Did normal conditions apply? If no, how were adjustments made and communicated?",
                        "If there were adjustments in work space, was a re-briefing held? If so, how was it communicated?",
                        "Were safeguards in place and operable?",
                        "Did customer’s property comply with safety standards?"
                      ]
                    },
                    { name : "Related Off-site Work Environment",
                      helpQuery : [
                        "Did barriers or distractions prevent off-site people from seeing risks to the crew?",
                        "Was the work site clean, ready for work, with safeguards in place?"
                      ]
                    }
                  ]
                },
                { name : "Organizational/Association",
                  helpText: "This section looks at the management of workload, resources, and how different groups work together.",
                  subCategories : [
                    { name : "Organization Framework",
                      helpQuery : [
                        "What were the goals and priorities set out for employees?",
                        "What are the expectations for professional conduct?",
                        "Do budgetary/production priorities overshadow safety issues?",
                        "What is local agreement for compensation? Are there incentives to cut corners?",
                        "Did the chain of command cause communication problems for safety?",
                        "Was the crew provided with the tools and resources they needed?"
                      ]
                    },
                    { name : "Nature of the Work: Supervisor, Crew, and Other Stakeholders",
                      helpQuery : [
                        "What was the standard workload for the job? Was it higher or lower?",
                        "Was there an unexpected change in the work being performed?",
                        "How was the unexpected planned for and communicated?",
                        "Was there flexibility for dealing with the unexpected?"
                      ]
                    },
                    { name : "Production Level",
                      helpQuery : [
                        "What was the standard production level expected for this job?",
                        "Is the production level steady and predictable, or does it vary?",
                        "Did pressure to meet the production level overshadow safety concerns?"
                      ]
                    },
                    { name : "Rules/Regulations/Procedures",
                      helpQuery : [
                        "Which rules, regulations, and procedures applied to this incident?",
                        "Were they good and/or necessary?",
                        "Were they consistently complied with and enforced? If no, is noncompliance routine, the exception, or on purpose?",
                        "What qualifications, endorsements, and/or licenses are required? Were those requirements met?"
                      ]
                    },
                    { name : "Workplace Documentation",
                      helpQuery : [
                        "What paperwork was needed and completed?",
                        "What information was included?",
                        "Was the paperwork available to crew at on-duty point?",
                        "Was the paperwork up-to-date?",
                        "Had crew members been properly trained to handle paperwork?",
                        "What resources were available: rule books, manuals, bulletins, job tools?",
                        "Were those resources up to date and easy to find/use?"
                      ]
                    }
                  ]
                },
                { name : "Outside Influences",
                  helpText: "This section looks at how pressures from beyond the location where the close call happened can affect safe railroad operations.",
                  subCategories : [
                    { name : "Governing Bodies",
                      helpQuery : [
                        "What is the history of regulator activity on this site? With this crew?",
                        "How did union agreements influence the incident?",
                        "What customer agreements or expectations influenced the incident?"
                      ]
                    },
                    { name : "Off-site–Off-property (Corporate/Customer Service/Vendors/Family)",
                      helpQuery : [
                        "Were there off-site pressures, tensions, or expectations?",
                        "Were decision makers aware of the risk to personnel?",
                        "What decisions made off-site contributed?",
                        "How has the industry in contributed?"
                      ]
                    },
                    { name : "Rules/Regulations/Procedures (Regulator/Corporate/Site/Union)",
                      helpQuery : [
                        "Which rules, regulations, and procedures applied to the incident?",
                        "Were they clearly understood?",
                        "Are there unwritten rules that may have applied to the incident?",
                        "Were they consistently complied with and enforced? If no, is noncompliance routine, the exception, or on purpose?",
                        "What qualifications, endorsements, and/or licenses were required? Were those requirements met?"
                      ]
                    }
                  ]
                }
              ],
              contributing_factors : [
                "JSA was not done",
                "Shoreman misunderstood welder’s signal",
                "Change up in job task mid-stream caused loss of situational awareness"
              ]
            },

            // step 04
            { desc : "Identify Root Causes",
                contributing_factors: [
                    { factor : "The battery was dead",
                        root_cause : false,
                        why        : [
                            { factor : "The alternator is not functioning",
                                root_cause : false,
                                why : [
                                    { factor : "The alternator belt has broken",
                                        root_cause : false,
                                        why : [
                                            { factor: "The alternator belt was well beyond its useful service life and not replaced",
                                                root_cause : false,
                                                why : [
                                                    { factor : "The vehicle was not maintained according to the recommended service schedule",
                                                        cause_id   : 1234,
                                                        root_cause : true,
                                                        why        : []
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },

            // step 05
            { desc : "Determine Corrective Actions",
                "task_description"           : "", // textarea field, 256-512 char
                "date"                       : "", // need for backdating, 16 char
                "time_of_day"                : "", // candidate for combination into date, 16 char
                "weather_conditions"         : [], // from settings.list, multi-select array
                "crew_configuration"         : "", // textarea field, 256 char
                "equipment_involved"         : "", // textarea field, 256 char. multi-select list from org.settings would be better, though likely unfeasible
                "equipment_configuration"    : "", // textarea field, 256 char
                "direction_of_movement"      : "", // textarea field, 256 char
                "other_details"              : "", // textarea field, 256 char
                "barriers_that_worked"       : [], // multi-select array from settings.list
                "other_barriers_that_worked" : "", // textarea field, 256 char
                "failed_barriers"            : ""  // 256 textarea, potential for multi-select array import from org.settings
            },

            // step 06
            { desc : "Check for Gaps",
                "Performance Expectations: Sets Performance expectations or makes them clearer": {
                    "Barrier_in_place_that_worked": "", // true or false
                    "Corrective_Actions_to_fill_GAP": ["", ""] // many CAs can be used here, increments "Use" in CA's
                },
                "Necessary Support: Provides support people need in order to get the job done right": {
                    "Barrier_in_place_that_worked": "", // true or false
                    "Corrective_Actions_to_fill_GAP": ["", ""] // many CAs can be used here, increments "Use" in CA's
                },
                "Appropriate Consequences: Reinforces the job done correctly and/or discourages the job not done correctly": {
                    "Barrier_in_place_that_worked": "", // true or false
                    "Corrective_Actions_to_fill_GAP": ["", ""] // many CAs can be used here, increments "Use" in CA's
                },
                "Performance Feedback: Tells people how well they are doing the jon in relation to performance expectations": {
                    "Barrier_in_place_that_worked": "", // true or false
                    "Corrective_Actions_to_fill_GAP": ["", ""] // many CAs can be used here, increments "Use" in CA's
                },
                "Capability: Makes sure people have the physical, mental, and/or emotional ability to do the job": {
                    "Barrier_in_place_that_worked": "", // true or false
                    "Corrective_Actions_to_fill_GAP": ["", ""] // many CAs can be used here, increments "Use" in CA's
                },
                "Knowledge/Skill: Gives people the knowledge, skill, and/or ability to do the job": {
                    "Barrier_in_place_that_worked": "", // true or false
                    "Corrective_Actions_to_fill_GAP": ["", ""] // many CAs can be used here, increments "Use" in CA's
                 }
            },


            // step 07
            { desc : "Verify Corrective Actions"
            }
        ],
        'notes': "notes string"
    };

});



