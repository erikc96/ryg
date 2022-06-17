import PropTypes from 'prop-types';
import { gql, useQuery } from '@apollo/client';
import SentimentSummary from '../Components/SentimentSummary';
import SelectionCharts from '../Components/SelectionCharts';
import ElaborationWords from '../Components/ElaborationWords';

const GET_TEAM_SENTIMENTS = gql`
query AllTeamsSentiment($dateRange: [String]) {
  allTeamsSentiment(dateRange: $dateRange) {
    Key
    Sentiment
  }
}`

function Home(props) {
  const { loading, error, data } = useQuery(GET_TEAM_SENTIMENTS, {
    variables: props
  });

  if (loading) return 'Loading...';

  return (
    <div className='flex flex-col'>
      <div className='flex justify-center'>
        <SelectionCharts dateRange={props.dateRange}/>
      </div>
      
      
      <div className='flex justify-center mx-5 flex-wrap'>
        {
          data.allTeamsSentiment.map(t => 
            <SentimentSummary key={t.Key} link={`/teams/${t.Key}`} title={`Team ${t.Key}`} sentiment={t.Sentiment}/>
          )
        }
        </div>
      
      <ElaborationWords dateRange={props.dateRange}/> 
    </div>
  );
}

Home.propTypes = {
  dateRange: PropTypes.array
}

export default Home;
