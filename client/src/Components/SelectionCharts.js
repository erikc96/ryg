import PropTypes from 'prop-types';
import { gql, useQuery } from '@apollo/client';
import SelectionBarChart from './SelectionBarChart';
import SelectionPieChart from './SelectionPieChart';

const GET_CHECK_INS = gql`
  query GetCheckIns($dateRange: [String]!, $userId: ID, $teamId: ID) {
    aggregateCheckIns(dateRange: $dateRange, userId: $userId, teamId: $teamId) {
      day
      red
      yellow
      green
    }
}`

function SelectionCharts(props) {
    const { loading, data } = useQuery(GET_CHECK_INS, {
        variables: props
    });

    if (loading) return 'Loading...';
    
    return (
        <>
            <SelectionBarChart data={data.aggregateCheckIns}/>
            <SelectionPieChart data={data.aggregateCheckIns}/>
        </>
    );
}

SelectionCharts.propTypes = {
    dateRange: PropTypes.array, 
    userId: PropTypes.string,
    teamId: PropTypes.string
}

export default SelectionCharts;