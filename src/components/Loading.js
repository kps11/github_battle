import React,{Component} from 'react';
import PropTypes from 'prop-types';

let style={
    content:{
        textAlign:'center',
        fontSize:'30px'
    }
}

class Loading extends Component{

    constructor(props){
        super(props);

        this.state={
            text: props.text
        };
    }
    componentDidMount(){
        let stoppers = this.state.text+'...';
        this.interval = window.setInterval(function () {

            if (this.state.text === stoppers){
                this.setState( function () {
                    return{
                        text:this.props.text
                    }

                }
                )
            }
            else {
                this.setState(function (prevState) {
                    return{
                        text:prevState.text+'.'
                    }


                })
            }
            
        }.bind(this),this.props.speed)
    }
    componentWillUnmount(){
        window.clearInterval(this.interval);
    }

    render(){
        return(
            <p style={style.content}>
                {this.state.text}
            </p>
        )
    }

}
Loading.ppropTypes={
    text:PropTypes.string,
    speed:PropTypes.number
}
Loading.defaultProps={
    text:'Loading',
    speed:300
}

export default Loading;