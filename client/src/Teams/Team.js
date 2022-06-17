import PropTypes from 'prop-types';
import {useParams } from 'react-router-dom';
import SentimentSummary from '../Components/SentimentSummary';
import { gql, useQuery } from '@apollo/client';
import SelectionCharts from '../Components/SelectionCharts';
import ElaborationWords from '../Components/ElaborationWords';

const GET_USER_SENTIMENTS = gql`
query ExampleQuery($dateRange: [String], $teamId: ID!) {
  usersSentimentByTeam(dateRange: $dateRange, teamId: $teamId) {
    Key
    Sentiment
  }
}`

function Team(props) {
    const params = useParams();

    const teamId = params.teamId;

    const { loading, error, data } = useQuery(GET_USER_SENTIMENTS, {
        variables: {
            dateRange: props.dateRange,
            teamId
        }
    });
    
    if (loading) return 'Loading...';

    return (
        <div className='flex flex-col'>
            <div className='flex justify-center'>
                <SelectionCharts dateRange={props.dateRange} teamId={teamId}/>
            </div>
            
            <div className='flex justify-center mx-5 flex-wrap'>
              {
                data.usersSentimentByTeam.map(t => 
                    <SentimentSummary key={t.Key} link={`/teams/${teamId}/users/${t.Key}`} title={`User ${t.Key}`} sentiment={t.Sentiment}/>
                )
              }
            </div>

            <ElaborationWords dateRange={props.dateRange} teamId={teamId}/>
        </div>
    )
}

Team.propTypes = {
    dateRange: PropTypes.array
}  

export default Team;
