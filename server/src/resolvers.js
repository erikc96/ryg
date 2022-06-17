module.exports = {
    Query: {
        checkIn: (_, { key }, { dataSources }) => {
            return dataSources.checkInApi.getCheckInByKey({ key });
        },
        aggregateCheckIns: async (_, {dateRange, teamId, userId}, { dataSources }) => {
            dateRange = dateRange.map(d => new Date(d));
            const checkIns = await dataSources.checkInApi.getCheckInsByDateRange({ dateRange, teamId, userId });

            const dayDict = {}

            checkIns.forEach(checkIn => {
                const day = checkIn.Timestamp.toDateString();
                if (!dayDict[day]) {
                    dayDict[day] = {
                        day,
                        red: 0,
                        yellow: 0,
                        green: 0
                    };
                }
                dayDict[day][checkIn.Selection]++;
            });

            return Object.values(dayDict);
        },
        allTeamsSentiment: async (_, {dateRange}, { dataSources }) => {
            const data = await dataSources.checkInApi.getAllTeamsSentiment({dateRange});
            return calculateSentiment(data);
        },
        usersSentimentByTeam: async (_, {dateRange, teamId}, { dataSources }) => {
            const data = await dataSources.checkInApi.getUserSentimentByTeam({dateRange, teamId});
            return calculateSentiment(data);
        },
        topElaborationWords: async (_, {dateRange, teamId, userId}, { dataSources}) => {
            const data = await dataSources.checkInApi.getElaborations({dateRange, teamId, userId});

            const counts = { 
                red: {},
                yellow: {},
                green: {}
            };

            data.forEach(checkIn => {
                checkIn.Elaboration.split(/[\s\W]+/).forEach(word => {
                    word = word.toLowerCase();
                    if (!counts[checkIn.Selection][word]) {
                        counts[checkIn.Selection][word] = 1
                    }
                    else {
                        counts[checkIn.Selection][word]++; 
                    }
                })
            })

            return {
                Red: mapFrequencies(counts.red),
                Yellow: mapFrequencies(counts.yellow),
                Green: mapFrequencies(counts.green)
            }
        }
    }
}

const mapFrequencies = (counts) => {
    return Object.entries(counts).filter(([word, count]) => word.length > 3 && count > 5).map(([word, count]) => ({ Word: word, Frequency: count}));
}

const calculateSentiment = (data) => {
    const sentimentDict = {};

    data.forEach(d => {
        if (!sentimentDict[d.Key]) {
            sentimentDict[d.Key] = { 
                Key: d.Key,
                Sentiment: d.Selection,
                SelectionCount: d.SelectionCount
            }
        }
        else {
            let currentVal = sentimentDict[d.Key];

            if (currentVal.SelectionCount < d.SelectionCount) {
                currentVal.Sentiment = d.Selection;
                currentVal.SelectionCount = d.SelectionCount;
            }
        }
    });

    return Object.values(sentimentDict);
}