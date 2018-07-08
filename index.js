// Write your code here
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import $ from "jquery";



//定义组件
class App extends Component{
    render() {
        const {value, addButton1, addButton2, prelook,delete1} = this.props;
        return (
            <div>
                <div id="middle">{value}</div>
                <button onClick={addButton1} id="add1">添加文本框</button>
                <button onClick={addButton2} id="add2">添加日期框</button>
              
                <button onClick={prelook} id="pre">预览</button>
            </div>
        );
    }
}


//action
const addButton1action = {
        type:'ADD1'
}
const addButton2action = {
    type:'ADD2'
}
const prelookaction = {
        type:'PRELOOK'
}
const deleteaction = {
    type:'DELETE'
}


//reducer
const initialState = {
    value: '添加文本'
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD1':
            return {
                value:add1()
            }
            case 'ADD2':
            return {
                value: add2()
            }
        case 'PRELOOK':
            return {
                value: prelook()
            }
            case 'DELETE':
            return {
                value: deleteone()
            }
        default:
            return initialState;
    }
}

function add1(){
    let html=`<div><input type="text" value="文本框"></input><button class="delete" onClick={delete1}>删除</button><br /></div>`;
    $("#middle").append(html);
}
function add2(){
    let html=`<div><input type="Date"></input><button class="delete" onClick={delete1}>删除</button><br /></div>`;
    $("#middle").append(html);
}

let deleteone=function(){
    $(".delete").parent().remove();
 }

function prelook(){
    if($("#pre").html()=="预览"){
   $("input").attr("disabled", "disabled"); 
   $(".delete").hide();
   $("#add1").hide();
   $("#add2").hide();
   $("#pre").html("编辑");
    }else{
    $("input").removeAttr("disabled"); 
   $(".delete").show();
   $("#add1").show();
   $("#add2").show();
   $("#pre").html("预览"); 
    }
}
//store
let store = createStore(reducer);

//映射Redux state到组件的属性
function mapStateToProps(state) {
    return { value: state.value }
}

//映射Redux actions到组件的属性
function mapDispatchToProps(dispatch){
    return{
        addButton1:()=>dispatch(addButton1action),
        addButton2:()=>dispatch(addButton2action),
        delete1:()=>dispatch(deleteaction),
        prelook:()=>dispatch(prelookaction)
    }
}

//连接组件
App = connect(mapStateToProps, mapDispatchToProps)(App)

//渲染组件
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
