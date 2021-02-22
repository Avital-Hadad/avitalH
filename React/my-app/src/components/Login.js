import React, { useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../Store/actions'
import { Redirect } from "react-router-dom";

const mapDispatchToProps = (dispatch) => ({
    setUserName: (userName) => dispatch(actions.setUserName(userName)),
    setPassword: (password) => dispatch(actions.setPassword(password)),
    setId: (id) => dispatch(actions.setId(id))
})

export default connect(null, mapDispatchToProps)(function Login(props) {
    const { setUserName, setPassword, setId } = props;
    let [page, setPage] = useState(false);
    let userName = React.createRef()
    let password = React.createRef()

    function GetUserByDetails(params) {
        var requestOptions = { method: 'GET', redirect: 'follow' };
        fetch(`http://localhost:3000/user/getUserByDetails/${userName.current.value}/${password.current.value}`, requestOptions)
            .then((res) => res.json())
            .then((res) => {
                if (res.result[0] !== {}) {
                    setUserName(userName.current.value);
                    setPassword(password.current.value);
                    setId(res.result[0]._id)
                    setPage(true)
                }
            })
            .catch((err) => {
                console.log(`error:${err}`)
                alert("User does not exist")
                userName.current.value=""
                password.current.value=""
            })
    }
    function AddNewUser(props) {
        var requestOptions = { method: 'POST', redirect: 'follow' };
        fetch(`http://localhost:3000/user/addNewUser/${userName.current.value}/${password.current.value}`, requestOptions)
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
                if (res.message === "user exsit") {
                    alert("User exist")
                }
                else {
                    alert("Registration was successful!");
                    setUserName(userName.current.value);
                    setPassword(password.current.value);
                    setId(res.user._id)
                    setPage(true)
                }
            })
            .catch((err) => {
               console.log(err)
            })
    }
    if (page == true) { return <Redirect to="/Weather" /> }

    return (
        <>‏
            <div className="container-fluid text-center ">
                <div className="row center" style={{ height: "30vh" }}>
                    <div className="col-sm d-flex justify-content-center" >
                        <h1>Welcome to the weather <br></br>forecast website!</h1>
                    </div>
                </div>

                <div className="row" style={{ height: "70vh" }}>
                    <div className="col-sm d-flex justify-content-center">
                        <table>
                            <tbody>
                                <tr>
                                    <td id="idInput">User Name:</td>
                                    <td><input ref={userName} type="email" ></input></td>
                                </tr>
                                <tr>
                                    <td id="idInput">Password:</td>
                                    <td><input ref={password} type="password"></input></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>
                                        <br></br>
                                        <button className="btn btn-light m-3" onClick={AddNewUser}>Sign up</button>
                                        <button className="btn btn-light m-3" onClick={GetUserByDetails}>Log in</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
})