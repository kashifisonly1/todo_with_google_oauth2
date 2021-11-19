import React from 'react';
import CONSTANTS from '../constants'

class TODO extends React.Component {
    constructor() {
        super();
        this.state = {error:false, 
            errorMessage:"", 
            loading:false,
            title:"", description:"", id:"",
            todoData:[],
            token:window.localStorage.getItem("IdToken")
        };
    }

    componentDidMount() {
        fetch(CONSTANTS.ApiUrl+"todo", 
            {headers:{authorization:this.state.token}})
        .then(res=>{
            if(res.status===403) {
                window.localStorage.removeItem("IdToken");
                this.props.changeUserLoginStatus(false);                
                return false;
            }
            return res.json();
        })
        .then(data=>{
            if(data) {
                if(data.error)
                    this.setState({["error"]:true,["loading"]:false, ["errorMessage"]:data.error});
                else
                    this.setState({["todoData"]:data})
            }
        })
        .catch(err=>{
            this.setState({["error"]:true,["loading"]:false, ["errorMessage"]:"Something went wrong"})
        });
    }

    submitForm() {
        if(this.state.title===""||this.state.description==="") {
            this.setState({["error"]:true, ["errorMessage"]:"Please fill all fields"});
            return;
        }
        let ID = this.state.id;
        this.setState({["loading"]:true});
        fetch(CONSTANTS.ApiUrl+"todo/"+ID,
            {headers:{authorization:this.state.token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'}, 
            method:(this.state.id===""?"POST":"PUT"),
            body:JSON.stringify({title:this.state.title, description:this.state.description})})
        .then(res=>{
            if(res.status===403) {
                window.localStorage.removeItem("IdToken");
                this.props.changeUserLoginStatus(false);                
                return false;
            }
            return res.json();
        })
        .then(data=>{
            if(!data)
                return;
            if(data.error)
                this.setState({["error"]:true,["loading"]:false, ["errorMessage"]:data.error});
            else {
                let {todoData} = this.state;
                if(ID==="")
                    todoData.push(data);
                else
                    todoData = todoData.map(val=>{return (ID==val._id?data:val)});
                this.setState({["todoData"]:todoData, ["loading"]:false,["error"]:false});
                this.clearForm();
            }

        })
        .catch(err=>{
            this.setState({["error"]:true,["loading"]:false, ["errorMessage"]:"Something went wrong"})
        });
    }

    clearForm() {
        this.setState({["id"]:"", ["title"]:"", ["description"]:""});
    }

    deleteRecord(btn) {
        let ID = btn.target.id;
        this.setState({["loading"]:true});
        fetch(CONSTANTS.ApiUrl+"todo/"+ID,
            {headers:{authorization:this.state.token}, 
            method:"DELETE"})
        .then(res=>{
            if(res.status===403) {
                window.localStorage.removeItem("IdToken");
                this.props.changeUserLoginStatus(false);                
                return false;
            }
            return res.json();
        })
        .then(data=>{
            if(!data)
                return;
            if(data.error)
                this.setState({["error"]:true,["loading"]:false, ["errorMessage"]:data.error});
            else {
                let {todoData} = this.state;
                let filteredTodoList = todoData.filter((val)=>{return val._id!=btn.target.id});
                this.setState({["todoData"]:filteredTodoList, ["loading"]:false,["error"]:false});
            }
        })
        .catch(err=>{
            this.setState({["error"]:true,["loading"]:false, ["errorMessage"]:"Something went wrong"})
        });
    }

    updateRecord(btn) {
        let {todoData} = this.state;
        let filteredTodoItem = todoData.filter((val)=>{return val._id==btn.target.id});
        if(filteredTodoItem.length==0)
            return;
        filteredTodoItem = filteredTodoItem[0];
        this.setState({["id"]:filteredTodoItem._id,
            ["title"]:filteredTodoItem.title,
            ["description"]:filteredTodoItem.description});
    }

    render() {
        return (<div className={"container my-3"}>
                <div className={"row"}>
                    <div className={"col-12 my-2 text-center"}>
                        {this.state.loading&&<i className={"fa fa-spinner fa-spin fa-lg"}></i>}
                        {this.state.error&&<div className={"alert alert-danger"}>Error: {this.state.errorMessage}</div>}
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-12 p-2 border shadow-lg rounded col-md-9 col-lg-7 mx-auto"}>
                        <h3>{this.state.id===""?"Create Todo Item":"Update Todo Item"}</h3>
                        <hr/>
                        <label className={"font-weight-bold"}>ID</label>
                        <input 
                            className={"form-control mb-3"} 
                            value={this.state.id} readOnly={true}/>
                        <label className={"font-weight-bold"}>Title</label>
                        <input 
                            value={this.state.title} 
                            onChange={(e)=>{this.setState({["title"]:e.target.value})}} 
                            className={"form-control mb-3"}/>
                        <label className={"font-weight-bold"}>Description</label>
                        <input
                            value={this.state.description} 
                            onChange={(e)=>{this.setState({["description"]:e.target.value})}} 
                            className={"form-control mb-3"}/>
                        <button 
                            onClick={this.submitForm.bind(this)} 
                            className={"btn btn-primary"}>{this.state.id===""?"Create":"Update"}</button>
                        <button 
                            onClick={this.clearForm.bind(this)}
                            className={"btn mx-1 btn-secondary"}>Clear</button>
                    </div>
                    <div className={"col-12 mt-3"}>
                        <table className={"table table-dark table-striped"}>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.todoData.map((val,key)=>{
                                    return (<tr key={key}>
                                        <td>{val.title}</td>
                                        <td>{val.description}</td>
                                        <td>{new Date(val.date).toDateString()}</td>
                                        <td>
                                            <button 
                                                id={val._id}
                                                className={"btn btn-sm mx-1 btn-info"}
                                                onClick={this.updateRecord.bind(this)}>Edit</button>
                                            <button
                                                id={val._id} 
                                                className={"btn btn-sm mx-1 btn-danger"} 
                                                onClick={this.deleteRecord.bind(this)}>Delete</button>
                                        </td>
                                    </tr>)
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>);
    }
}

export default TODO;