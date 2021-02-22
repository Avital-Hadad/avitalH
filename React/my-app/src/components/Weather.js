import React, { useState } from 'react'
import { actions } from '../Store/actions';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";

function mapStateToProps(state) {
    return {
        user: state.userReducer.User,
        history: state.historyReducer.History
    };
}

const mapDispatchToProps = (dispatch) => ({
    setDate: (date) => dispatch(actions.setDate(date)),
    setCity: (city) => dispatch(actions.setCity(city)),
    setWeather: (weather) => dispatch(actions.setWeather(weather)),
    setUser: (user) => dispatch(actions.setUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(function UserDetails(props) {
    const { user, history, setDate, setCity, setWeather, setUser } = props;
    let [viewDetails, setViewDetails] = useState(false)
    let [page1, setPage1] = useState(false)
    let [page2, setPage2] = useState(false)

    let city = React.createRef();
    const currentDate = new Date();
    const today = currentDate.toLocaleDateString();
    const time = currentDate.toLocaleTimeString();

    function AddNewHistory(event) {  //שולף את מזג האוויר + מוסיף להיסטוריה
        if (event.charCode === 13) {
            fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city.current.value}&appid=3cfebf1a668cf750973414bdfafea9ce`)
                .then((res) => res.json())
                .then((res) => {
                    console.log("fetch")
                    setDate(today)
                    setCity(res.name)
                    setWeather(res.weather[0].main)
                    setUser(user.id)
                    var requestOptions = { method: 'POST', redirect: 'follow' };
                    fetch(`http://localhost:3000/history/addHistory/${today}/${res.name}/${res.weather[0].main}/${user.id}`, requestOptions)
                        .then((res) => { console.log(res) })
                        .catch((err) => { console.log(err) })
                    setViewDetails(true)
                    console.log("then")
                })
                .catch((err) => {
                    console.log(`error:${err}`)
                    alert("The requested area was not found")
                    setViewDetails(false)
                    document.getElementById("divView").style.display = 'none'
                })
        }
    }

    function ForPage(e) {
        if (e.target.id === "btnHis") setPage1(true)
        else setPage2(true)
    }

    if (viewDetails === true) { document.getElementById("divView").style.display = 'block' }
    if (page1 === true) { return <Redirect to="/History" /> }
    if (page2 === true) { return <Redirect to="/" /> }

    return (
        <div className="container-fluid text-center ">
            <div className="row">
                <div className="col, m-4 h5">{today} {time}</div>
                <div className="col, m-4 h5">Hello {user.userName} !</div>
            </div>
            <div className="row">
                <div className="col">
                    <label className="h3">Write a requested area:</label>
                    <input className="m-3" ref={city} onKeyPress={(e) => AddNewHistory(e)}></input>
                </div>
                <div className="col">
                    <button className="btn btn-light m-3" id="btnHis" onClick={(e) => ForPage(e)}>Search History</button>
                    <button className="btn btn-light m-3" id="btnExit" onClick={(e) => ForPage(e)}>Exit</button>
                </div>
            </div>
            <div id="divView" style={{ display: 'none' }} className="row">
                <div className="col">
                    <table>
                        <tbody>
                            <tr>
                                <td><h2>In the city of: </h2></td>
                                <td><h3>{history.city}</h3></td>
                            </tr>
                            <tr>
                                <td><h2>On the date: </h2></td>
                                <td><h3>{today}  {time}</h3></td>
                            </tr>
                            <tr>
                                <td><h2>Weather Forecast: </h2></td>
                                <td><h3>{history.weather}</h3></td>
                            </tr>
                            <tr>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            {/* <div className="row">
                <div className="col">
                    <button className="btn btn-light m-3" id="btnHis" onClick={(e) => ForPage(e)}>Search History</button>
                    <button className="btn btn-light m-3" id="btnExit" onClick={(e) => ForPage(e)}>Exit</button>
                </div>
            </div> */}
        </div>
    )
})

