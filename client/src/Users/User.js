import PropTypes from 'prop-types';
import {useParams } from 'react-router-dom';
import SelectionCharts from '../Components/SelectionCharts';
import ElaborationWords from '../Components/ElaborationWords';


function User(props) {
    const params = useParams();

    const teamId = params.teamId;
    const userId = params.userId; 


    return (
        <div className='flex flex-col'>
            <div className='flex justify-center'>
                <SelectionCharts dateRange={props.dateRange} teamId={teamId} userId={userId}/>
            </div>

            <ElaborationWords dateRange={props.dateRange} teamId={teamId} userId={userId}/>
        </div>
    );
}

User.propTypes = {
    dateRange: PropTypes.array
}  

export default User;
