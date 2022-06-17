const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    checkIn(key: ID!): CheckIn
    aggregateCheckIns(dateRange: [String]!, teamId: ID, userId: ID): [DailyCheckIns]
    allTeamsSentiment(dateRange: [String]): [SlackTeam]
    usersSentimentByTeam(dateRange: [String], teamId: ID!): [SlackUser]
    topElaborationWords(dateRange: [String]!, teamId: ID, userId: ID): Frequencies
  }

  type DailyCheckIns {
    day: String! 
    red: Int!
    yellow: Int!
    green: Int!
  }

  type CheckIn {
    Key: ID!
    Timestamp: String
    Elaboration: String
    Emotion: String
    MeetingHours: String
    Platform: Platform
    PrivateElaboration: String
    Reactions: [Reaction]
    Selection: Selection!
    SlackMessageId: ID
    SlackOrg: SlackOrg
    SlackTeam: SlackTeam
    SlackUser: SlackUser
  }

  type Frequencies {
    Red: [WordFrequency]
    Yellow: [WordFrequency]
    Green: [WordFrequency]
  }

  type WordFrequency{
    Word: String!
    Frequency: Int!
  }
  
  enum Selection {
    red
    yellow
    green
  }
  
  enum Platform {
    slack
  }
  
  type Reaction {
    Id: ID!
    SlackUserId: ID!
    Bame: String
  }
  
  type SlackUser {
    Key: ID!
    Sentiment: Selection
  }
  
  type SlackOrg {
    Key: ID! 
  }
  
  type SlackTeam {
    Key: ID!
    Sentiment: Selection
  }
`;

module.exports = typeDefs;