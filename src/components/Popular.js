import React,{Component} from 'react';
import PropTypes from 'prop-types'; // ES6
import api from '../utils/api';
import Loading from './Loading';

function SelectLanguage(props) {
    let languages =['All','java','ruby','python','c'];

    return(
        <ul className='languages'>
            <p>selected language: {props.selectLanguage}</p>

            {languages.map(function (lang) {
                return(
                    <li key={lang}
                        style={lang === props.selectLanguage?{color : '#d0021b'}:null}
                        onClick={props.onSelect.bind(null,lang)}>
                        {lang}
                    </li>
                );
            },this)}
        </ul>

    )
}
/*class SelectLanguage extends React.Component{
    render(){
        let languages =['All','java','ruby','python','c'];

        return(
            <ul className='languages'>
                {/!*<p>selected language: {this.state.selectLanguage}</p>*!/}

                {languages.map(function (lang) {
                    return(
                        <li
                            style={lang === this.props.selectLanguage?{color : '#d0021b'}:null}
                            onClick={this.props.onSelect.bind(null,lang)}
                            key={lang}>
                            {lang}
                        </li>
                    )
                },this)}
            </ul>

        )
    }
}*/

function RepoGrid(props){
    return(
        <ul className='popular-list'>
            {props.repos.map(function (repo,index) {
                return(
                    <li key={repo.name} className='popular-item'>
                        <div className='popular-rank'>#{index+1}</div>
                        <ul className='space-list-item'>
                            <li>
                                <img className='avatar' src={repo.owner.avatar_url} alt={repo.owner.login}/>
                            </li>
                            <li><a href={repo.html_url}>{repo.name}</a></li>
                            <li>@{repo.owner.login}</li>
                            <li>{repo.stargazers_count} stars</li>
                        </ul>
                    </li>
                )
            })}

        </ul>
    )
}

RepoGrid.propTypes={
    repos: PropTypes.array
}

SelectLanguage.propTypes={
    selectLanguage:PropTypes.string,
    onSelect:PropTypes.func
}


class Popular extends  Component{
    constructor(props){
        super(props);
        this.state ={
            selectLanguage:'All',
            repos:null
        }

        this.upadateLanguage = this.upadateLanguage.bind(this);
    }

    componentDidMount(){
            this.upadateLanguage(this.state.selectLanguage);
    }
    upadateLanguage(lang){
        this.setState(function () {
            return {
                selectLanguage:lang,
                repos:null
            }

        });

        //ajax request
        api.fetchPopularRepos(lang).then(function (response) {
            this.setState(function () {
                    return {
                        repos:response
                    }
            })
        }.bind(this))
    }

    render(){

        return(

                <div>
                    <SelectLanguage selectLanguage={this.state.selectLanguage}
                    onSelect = {this.upadateLanguage}/>

                    {!this.state.repos ?<Loading/> : <RepoGrid repos={this.state.repos}/>}

                </div>
        )
    }

}
export default Popular;