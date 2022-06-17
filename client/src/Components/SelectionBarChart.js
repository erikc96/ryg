import PropTypes from 'prop-types';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import COLORS from "../colors";

function SelectionBarChart(props) {

    return (
        <div className="flex flex-col items-center">
            <h2 className='font-bold'>RYG By Day</h2>
            <BarChart
            width={500}
            height={300}
            data={props.data}
            margin={{
                top: 20,
                right: 50,
                left: 10,
                bottom: 5,
            }}
            >
                <XAxis dataKey="day" />
                <YAxis /> 
                <Tooltip />
                <Bar dataKey="green" stackId="a" fill={COLORS.GREEN} />
                <Bar dataKey="yellow" stackId="a" fill={COLORS.YELLOW} />
                <Bar dataKey="red" stackId="a" fill={COLORS.RED} />
            </BarChart>
        </div>
    );
}

SelectionBarChart.propTypes = {
    data: PropTypes.array
}

export default SelectionBarChart;