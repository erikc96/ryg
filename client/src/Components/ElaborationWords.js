import PropTypes from 'prop-types';
import { gql, useQuery } from '@apollo/client';
import COLORS from '../colors';
import ReactWordcloud from 'react-wordcloud';

const GET_WORD_FREQUENCY = gql`
query TopElaborationWords($dateRange: [String]!, $teamId: ID, $userId: ID) {
    topElaborationWords(dateRange: $dateRange, teamId: $teamId, userId: $userId) {
    Yellow {
      Word
      Frequency
    }
    Red {
      Word
      Frequency
    }
    Green {
      Word
      Frequency
    }
  }
}`

const wordCloudOptions = {
    fontSizes: [20, 80]
};

const wordCloudCallbacks = {
    getWordColor: (word) => {
        return word.color;
    }
}

const mapDataToCloudFormat = (words, color) => {
    return words.map(w => ({text: w.Word, value: w.Frequency, color}));
}

function ElaborationWords(props) {
    const { loading, data } = useQuery(GET_WORD_FREQUENCY, {
        variables: props
    });

    if (loading) return 'Loading...';

    const cloudData = mapDataToCloudFormat(data.topElaborationWords.Red, COLORS.RED)
        .concat(mapDataToCloudFormat(data.topElaborationWords.Yellow, COLORS.YELLOW))
        .concat(mapDataToCloudFormat(data.topElaborationWords.Green, COLORS.GREEN));

    if (!cloudData.length) {
        return null;
    }

    return (
        <div className='flex flex-col items-center'>
            <h2 className='font-bold'>What are people thinking about?</h2>
            <ReactWordcloud words={cloudData} size={[800, 200]} options={wordCloudOptions} callbacks={wordCloudCallbacks} className="flex justify-center"/>
        </div>
    );
}

ElaborationWords.propTypes = {
    dateRange: PropTypes.array, 
    userId: PropTypes.string,
    teamId: PropTypes.string
}


export default ElaborationWords;