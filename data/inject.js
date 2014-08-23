var numreg = /(\d+)/;
var lists = ["/", "/news", "/newest", "/show", "/ask"];

localforage.config({ name: 'HN+ Extension' });

document.addEventListener('DOMContentLoaded', function() {

// If page is a comments thread, update amount of "seen" comments
if(document.location.search && document.location.search.indexOf('id=')) updateCount();

// If page is a listing, read and display "seen" count for each entry
if(lists.indexOf(document.location.pathname) > -1){
    // Get all anchors on page
    var links = document.getElementsByTagName('a');
    for(var i = 0; i < links.length; i++) {
        // If anchor links to a comment thread
        if(links[i].href.indexOf("item?id=") > -1) {
            id = numreg.exec(links[i].href);
            putCount(links[i], id[0]);
        }
    }
}
})


function putCount(el, id){
    localforage.getItem("count."+id, function(value){
        if(value != null && value != 'undefined'){
            current = numreg.exec(el.innerHTML);
            if(current  == null) current = [0];
            diff = parseInt(current[0]) - parseInt(value);
            if(diff > 0) el.innerHTML += ' <span style="color:#121212;">('+diff+' new)</span>';
            }
    });
}

function updateCount(){
    id = numreg.exec(document.location.search);
    el = document.querySelectorAll('.subtext > a:nth-child(3)');
    comments = numreg.exec(el.item(0).firstChild.data);
    // If comments is null, ie "discuss" 0 comments have been "seen"
    if(comments == null) localforage.setItem("count."+id[0], 0);
    else localforage.setItem("count."+id[0], comments[0]);
}
