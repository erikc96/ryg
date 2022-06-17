const { DataSource } = require('apollo-datasource');
const { Op, fn, col } = require("sequelize");

class CheckInApi extends DataSource {
    constructor({ store }) {
        super();
        this.store = store;
    }

    initialize(config) {
        this.context = config.context;
    }

    async getCheckInByKey({key}) {
        const res = await this.store.checkIn.findAll({
            where: { key }
        })
        return res && res.length ? res[0].get() : false;
    }

    async getCheckInsByDateRange({dateRange, teamId, userId}) {
        const query = {
            where: {
                Timestamp: { [Op.between]: dateRange }
            },
            group: 'Timestamp'
        };

        if (teamId) {
            query.where.SlackTeamId = teamId;
        }

        if (userId) {
            query.where.SlackUserId = userId; 
        }

        const res = await this.store.checkIn.findAll(query);

        return res && res.length ? res.map(x => x.dataValues) : res;
    }

    async getAllTeamsSentiment({dateRange}) {
        const query = {
            attributes: [
                'Selection',
                ['SlackTeamId', 'Key'],
                [fn('COUNT', col('Selection')), 'SelectionCount'],
            ],
            group: ['SlackTeamId', 'Selection']
        };

        if (dateRange && dateRange.length) {
            query.where = {
                Timestamp: { [Op.between]: dateRange }
            };
        }

        const res = await this.store.checkIn.findAll(query);

        return res && res.length ? res.map(x => x.dataValues) : res;
    }

    async getUserSentimentByTeam({dateRange, teamId}) {
        const query = {
            attributes: [
                'Selection',
                ['SlackUserId', 'Key'],
                [fn('COUNT', col('Selection')), 'SelectionCount'],
            ],
            where: {
                SlackTeamId: teamId
            },
            group: ['SlackUserId', 'Selection']
        };

        if (dateRange && dateRange.length) {
            query.where.Timestamp = { [Op.between]: dateRange };
        }

        const res = await this.store.checkIn.findAll(query);

        return res && res.length ? res.map(x => x.dataValues) : res;
    }

    async getElaborations({dateRange, teamId, userId}) {
        const query = {
            attributes: ['Elaboration', 'Selection'],
            where: {
                Timestamp: { [Op.between]: dateRange },
                Elaboration: { [Op.ne]: null }
            },
            group: ['Timestamp']
        }

        if (teamId) {
            query.where.SlackTeamId = teamId;
        }

        if (userId) {
            query.where.SlackUserId = userId; 
        }

        const res = await this.store.checkIn.findAll(query);

        return res && res.length ? res.map(x => x.dataValues) : res;
    }
}

module.exports = CheckInApi;
