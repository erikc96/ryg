import { Card, Elevation } from "@blueprintjs/core";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

function SentimentSummary(props) {
    const navigate = useNavigate();

    return (
        <Card interactive={true} elevation={Elevation.TWO} className={`w-1/6 m-2 bg-${props.sentiment} flex justify-center`} onClick={() => navigate(props.link)}>
            <div className={`bg-${props.sentiment}`}></div>
            <p className="text-lg font-semibold">{props.title}</p>
        </Card>
    );
}

SentimentSummary.propTypes = {
    title: PropTypes.string,
    link: PropTypes.string,
    sentiment: PropTypes.oneOf(['red', 'yellow', 'green'])
}

export default SentimentSummary; 