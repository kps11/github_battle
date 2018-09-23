import axios from 'axios';

let client_id = 'e2289aa3891e3ddebfa8';
let client_secret = '47f644b8b33cc11da837dc0e7f26eb2ec8a3d1d4';
let params = "?client_id="+ client_id+"&client_secret="+ client_secret;
function get_Profile(username){
  return axios.get('https://api.github.com/users/'+username +params)
      .then(function (user) {
         return user.data;
      });

}

function get_repos(username){
    return axios.get('https://api.github.com/users/'+username +'/repos'+params+'&per_page=100')
}

function getStartCount(repos){
  return repos.data.reduce(function (count,repo) {
      return count+repo.stargazers_count;
  },0);
}

function calculateScore(profile,repos){
  let followers = profile.followers;
  let totalStars = getStartCount(repos);

  return (followers *3)+ totalStars;
}

function handleError(error){
  console.log(error);
  return null;
}

function getUserData(player){
  return axios.all([
      get_Profile(player),
      get_repos(player)
  ]).then(function (data) {
    let profile = data[0];
    let repo = data[1];

    return{
        profile: profile,
        score : calculateScore(profile,repo)
    }

  })
}

function sortPlayer(players){
  return players.sort(function (a,b) {

    return b.score - a.score;

  })
}

module.exports ={

  battel: function(players){
    return axios.all(players.map(getUserData)).then(sortPlayer).catch(handleError)
  },
  fetchPopularRepos : function (language) {
    const encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+ language + '&sort=stars&order=desc&type=Repositories');

    return axios.get(encodedURI).then(function (response) {
      return response.data.items;
      
    })

  }
}

