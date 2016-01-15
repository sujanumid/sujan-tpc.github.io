//AJAX//

var xmlhttp = new XMLHttpRequest();
var url = "posts.txt"; //contains all posts

xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var arr = JSON.parse(xmlhttp.responseText);
        getPosts(arr);
    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

function getPosts(arr) {
   var out = "";
   for(i = 0; i < arr.posts.length; i++) {
        out +='<div class="feed-item" id="'+arr.posts[i].id+'"><h3 class="feed-meta">'+arr.posts[i].post+'</h3><span class="timestamp"><i class="fa fa-clock-o"></i>' + timeSince(new Date(arr.posts[i].timestamp))+'</span><span class="vote"><a href="#voteup" onClick="vote(this,event)"><i class="icon-arrow-up"></i></a><span class="vote-data">'+arr.posts[i].votes+'</span><a href="#votedown" onClick="vote(this,event)"><i class="icon-arrow-down"></i></a></span></div>';
    }
    document.getElementById("out").innerHTML = out; //adds all the content in the #out element
    getFromStore();
}


//timeStamp code to generate timestamp like facebook

function timeSince(timeStamp) {
    var now = new Date(),
    secondsPast = (now.getTime() - timeStamp.getTime() ) / 1000;
    if(secondsPast < 60){
        return parseInt(secondsPast) + ' sec ago';
    }
    if(secondsPast < 3600){
        return parseInt(secondsPast/60) + ' min ago';
    }
    if(secondsPast <= 86400){
        return parseInt(secondsPast/3600) + ' hour ago';
    }
    if(secondsPast > 86400){
          day = timeStamp.getDate();
          month = timeStamp.toDateString().match(/ [a-zA-Z]*/)[0].replace(" ","");
          year = timeStamp.getFullYear() == now.getFullYear() ? "" :  " "+timeStamp.getFullYear();
          return day + " " + month + year;
    }
}


//toggle vote

function vote(item,event){
	event.preventDefault();
	if(item.className != "voted"){ //checks if vote has already been made to prevent people from upvoting or downvoting repeatedly
		item.className = "voted";
		child = item.parentNode.childNodes; //lists all childNodes that belong to element with class vote
		var vote = parseInt(child[1].innerHTML);
		if(item.getAttribute('href') == '#voteup'){
			if(child[2].className != 'voted'){
				child[1].innerHTML = vote+1; //increases the number of votes
			}else{
				child[1].innerHTML = vote+2; //increases the number of votes
			}
			child[2].className = ""; //removes voted class from sibling
		}else{
			if(child[0].className != 'voted'){
				child[1].innerHTML = vote-1; //increases the number of votes
			}else{
				child[1].innerHTML = vote-2; //increases the number of votes
			}
			child[0].className = ""; //removes voted class from sibling
		}
	}	
}


//new post

function createPost(e){
	post = document.getElementById('post-field');
	if(post.value != ""){
		var newFeed = document.createElement('div'); //creates a node
		newFeed.className = "feed-item"; 

		var thisID = Math.floor((Math.random() * 1000) + 10); //generates an ID for the posts
		newFeed.id = thisID;
		postDate = new Date();

		newFeed.innerHTML = '<h3 class="feed-meta">'+post.value+'</h3><span class="timestamp"><i class="fa fa-clock-o"></i>' + timeSince(postDate)+'</span><span class="vote"><a href="#voteup" onClick="vote(this,event)"><i class="icon-arrow-up"></i></a><span class="vote-data">0</span><a href="#votedown" onClick="vote(this,event)"><i class="icon-arrow-down"></i></a></span>'
		document.getElementById('out').insertBefore(newFeed,document.getElementById('out').childNodes[0]); //inserts the newpost before the first post
		postData = [];
		postData.push({id:thisID,post:post.value,votes:0,timestamp:postDate});
		store(postDate,postData); //using date as key since localstorage sorts the records in an ASC order and I require my posts to be chronologically order new-to-old
		post.value = ""; //resets the textarea to be blank
	}else{
		alert('Post can not be blank. Please type something')
	}
}

function store(key,postData){
	localStorage.setItem(key, JSON.stringify(postData));
}

function getFromStore(){
	thisData = [];
	i = 0;
	for (var key in localStorage){
		thisData.push(JSON.parse(localStorage.getItem(key)));
		var newFeed = document.createElement('div'); //creates a node
		newFeed.className = "feed-item"; 
		newFeed.id = thisData[i][0].id;
		newFeed.innerHTML = '<h3 class="feed-meta">'+thisData[i][0].post+'</h3><span class="timestamp"><i class="fa fa-clock-o"></i>' + timeSince(new Date(thisData[i][0].timestamp))+'</span><span class="vote"><a href="#voteup" onClick="vote(this,event)"><i class="icon-arrow-up"></i></a><span class="vote-data">'+thisData[i][0].votes+'</span><a href="#votedown" onClick="vote(this,event)"><i class="icon-arrow-down"></i></a></span>'
		document.getElementById('out').insertBefore(newFeed,document.getElementById('out').childNodes[0]); //inserts the newpost before the first post
		i++;
	}
}

