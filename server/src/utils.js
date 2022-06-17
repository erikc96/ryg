const {Sequelize} = require('sequelize');
const {parse} = require('csv-parse');
const fs = require('fs');

const clearDb = () => {
    try {
        fs.unlinkSync("./store.sqlite");
    } catch(err) {
        if (err.errno === -2) {
            // file isn't there, not a problem
        } else {
            console.error(err);
        }
    }
}

const readData = (db) => {
    const fileStream = fs.createReadStream('./rygs.csv');

    const parser = parse({
        delimiter: ',',
        columns: true
    });

    parser.on('data', async (checkIn) => {
        // Sequelize wasn't playing nice with a string Id field
        checkIn.Key = checkIn.Id;
        delete checkIn.Id;

        for (const [key, value]  of Object.entries(checkIn)) {
            if (value === 'null' || value.trim().length === 0) {
                delete checkIn[key];
            }
        }

        checkIn.Timestamp = new Date(checkIn.Timestamp * 1000);

        try {
            await db.models.checkIn.create(checkIn);
        }
        catch (err) {
            console.error(err);
        }
    });

    fileStream.pipe(parser);
}

module.exports.createStore = () => {
    clearDb();

    const db = new Sequelize({
        dialect: 'sqlite',
        storage: './store.sqlite'
    });

    const checkIn = db.define('checkIn', {
        Key: Sequelize.STRING,
        Timestamp: Sequelize.DATE,
        Elaboration: Sequelize.STRING,
        Emotion: Sequelize.STRING,
        MeetingHours: Sequelize.STRING,
        Platform: Sequelize.STRING,
        PrivateElaboration: Sequelize.STRING,
        Selection: Sequelize.STRING,
        SlackMessageId: Sequelize.STRING,
        SlackOrgId: Sequelize.STRING,
        SlackTeamId: Sequelize.STRING,
        SlackUserId: Sequelize.STRING
    }, {
        indexes: [
            {
                fields: ['Key'],
                unique: true
            },
            {
                fields: ['Timestamp']
            },
            {
                fields: ['SlackTeamId']
            },
            {
                fields: ['SlackUserId']
            }
        ]
    });

    const slackUser = db.define('slackUser', {

    });

    const slackOrg = db.define('slackOrg', {

    });

    const slackTeam = db.define('slackTeam',  {
        Key: Sequelize.STRING, 
    }, {
        indexes: [
            {
                fields: ['Key'],
                unique: true
            }
        ]
    });

    const reaction = db.define('reaction', {
        SlackUserId: Sequelize.STRING,
        SlackEmoji: Sequelize.STRING
    });

    const checkInReaction = db.define('checkInReaction', {
        CheckInId: Sequelize.STRING,
        ReactionId: Sequelize.STRING
    });

    db.sync().then(() => {
        readData(db);
    })

    return { db, checkIn, slackUser, slackOrg, slackTeam, reaction, checkInReaction };
};