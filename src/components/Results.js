import React,{Component} from 'react';
import queryString from 'query-string';
import api from '../utils/api';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import Playerpreview from './Playerpreview';
import Loading from './Loading';

function Profile(props) {
    let info = props.info;
    return(
        <Playerpreview avatar={info.avatar_url} username={info.login}>
                <ul className='space-list-items'>
                    {info.name && <li>{info.name}</li>}
                    {info.location && <li>{info.location}</li>}
                    {info.company && <li>{info.company}</li>}
                    <li>Followers:{info.followers}</li>
                    <li>public repos:{info.public_repos}</li>
                    {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
                </ul>
        </Playerpreview>
    )
}
Profile.propTypes={
    info:PropTypes.object
}

function Player(props) {
    return(

        <div>
            <h1 className='header'>{props.label}</h1>
            <h3 style={{textAlign:'center'}}>Score:{props.score}</h3>
            <Profile info={props.profile}/>
        </div>
    )

}


Player.propType={

    label:PropTypes.string,
    score:PropTypes.number,
    profile:PropTypes.object
}

class Results extends Component{
    constructor(props){
        super(props);
        this.state={
            winner:null,
            loser:null,
            error:null,
            loading:true
        }

    }
    componentDidMount() {
        let players = queryString.parse(this.props.location.search);
        api.battel([players.playerOneName, players.playerTwoName]).then(function (players) {
                if (players === null) {
                    return this.setState(function () {
                        return {
                            loading: false,
                            error: 'Looks like it showing some error',
                        }
                    });
                }
                this.setState(function () {
                    return {
                        error: null,
                        winner: players[0],
                        loser: players[1],
                        loading: false
                    }
                })
            }.bind(this)
        )
    }
    render(){
        let winner = this.state.winner;
        let loser = this.state.loser;
        let error = this.state.error;
        let loading = this.state.loading;

        if (loading === true){
            return  <Loading/>
        }

        if (error){
            return(
                <div>
                    <p>{error}</p>
                    <Link to='/battle'>Reset</Link>
                </div>
            )
        }

        return(

            <div className='row'>
                <Player
                label="winner"
                score={winner.score}
                profile={winner.profile}/>

                <Player
                    label="loser"
                    score={loser.score}
                    profile={loser.profile}/>
            </div>

        )
    }

}

export default Results;