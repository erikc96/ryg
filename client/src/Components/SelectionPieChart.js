import PropTypes from 'prop-types';
import { PieChart, Pie, Cell } from 'recharts';
import COLORS from "../colors";


function SelectionPieChart(props) {

    let red = 0, yellow = 0, green = 0;
    props.data.forEach(element => {
        red += element.red;
        yellow += element.yellow;
        green += element.green;
    });

    const data = [
        {
            value: red,
            color: COLORS.RED
        },
        {
            value: yellow,
            color: COLORS.YELLOW
        },
        {
            value: green,
            color: COLORS.GREEN
        }
    ];
    
    return (
        <div className="flex flex-col items-center">
            <h2 className='font-bold'>RYG Totals</h2>
            <PieChart width={300} height={300}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label
                >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
                </Pie>
            </PieChart>
        </div>
    );
}

SelectionPieChart.propTypes = {
    data: PropTypes.array
}

export default SelectionPieChart;