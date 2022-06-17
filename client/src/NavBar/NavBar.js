import PropTypes from 'prop-types';
import {NavLink, useLocation} from 'react-router-dom';
import {DateRangeInput } from "@blueprintjs/datetime";


function NavBar(props) {
    let location = useLocation();

    let path = location.pathname;
    let links = [];

    while (path) {
        links.push(
            <NavLink to={path} key={path} className="mx-2">
                {path.substring(path.lastIndexOf('/') + 1, path.length)}
            </NavLink>
        );
        links.push(">")
        path = path.substring(0, path.lastIndexOf('/'));
    }

    links.push( 
    <NavLink to="/" key="home" className="mx-2">
        home
    </NavLink>)

    links.reverse();

    return (
        <div className="grid grid-cols-2 min-w-full bg-navGreen py-1">
            <div className="col-span-1 flex">
                {links}
            </div>
            <div className="col-span-1 justify-self-end mr-10">
                <DateRangeInput 
                    parseDate={(x) => new Date(x)} 
                    formatDate={(d) => d.toDateString()}
                    onChange={props.setRange}
                    defaultValue={props.startRange}
                />
            </div>
        </div>
    );
}

NavBar.propTypes = {
    setRange: PropTypes.func,
    startRange: PropTypes.array,
}

export default NavBar;
