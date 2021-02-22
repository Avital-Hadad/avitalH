import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom";
import _ from 'lodash'

function mapStateToProps(state) {
    return {
        user: state.userReducer.User,
        history: state.historyReducer.History
    };
}

export default connect(mapStateToProps, null)(function History(props) {
    const { user, history } = props;
    let [page1, setPage1] = useState(false)
    let [page2, setPage2] = useState(false)
    let [arrHistory, setArrHistory] = useState([])
    const currentDate = new Date();
    const today = currentDate.toLocaleDateString();
    const time = currentDate.toLocaleTimeString();

    function GetHistoryForUser(props) {
        var requestOptions = { method: 'GET', redirect: 'follow' };
        fetch(`http://localhost:3000/history/getHistoryForUser/${user.id}`, requestOptions)
            .then((res) => res.json())
            .then((res) => {
                let nis = [...res.result]
                setArrHistory(nis)
            })
            .catch((err) => {
                console.log(`error:${err}`)
                alert("User does not exist")
            })
    }
    function ForPage(e) {
        if (e.target.id === "btnWeather") setPage1(true)
        else setPage2(true)
    }

    GetHistoryForUser();
    if (page1 === true) { return <Redirect to="/Weather" /> }
    if (page2 === true) { return <Redirect to="/" /> }

    return (
        <>‏
            <div className="container-fluid text-center ">
                <div className="row">
                    <div className="col, m-4 h5">{today}  {time}</div>
                    <div className="col, m-4 h5">Hello {user.userName} !</div>
                </div>
                <div className="row center" style={{ height: "10vh" }}>
                    <div className="col-sm d-flex justify-content-center" >
                        <h3>Search History</h3>
                    </div>
                    <div>
                        <button className="btn btn-light m-3" id="btnWeather" onClick={(e) => ForPage(e)}>Previous</button>
                        <button className="btn btn-light m-3" id="btnExit" onClick={(e) => ForPage(e)}>Exit</button>
                    </div>
                </div>

                <div className="row" style={{ height: "90vh" }}>
                    <div className="col-sm d-flex justify-content-center">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>City</th>
                                    <th>Weather</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    arrHistory.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{item.date}</td>
                                                <td>{item.city}</td>
                                                <td>{item.weather}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
})