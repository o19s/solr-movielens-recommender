(function() {
  window.onload = (function() {
    var resultsDisplay = document.getElementById("display");

    var streamingExpr = '' +
    'scoreNodes(\n' +
    '     select(\n' +
    '         facet(movielens,\n' +
    '               q="liked_movies:2571 OR liked_movies:4993",\n' +
    '               buckets="liked_movies",\n' +
    '               bucketSorts="count(*) desc",\n' +
    '               bucketSizeLimit="100",\n' +
    '               count(*)),\n' +
    '         liked_movies as node,\n' +
    '         "count(*)",\n' +
    '         replace(collection, null, withValue=movielens),\n' +
    '         replace(field, null, withValue=liked_movies))\n' +
    '    )';

    var query = document.getElementById("query");
    var queryForm = document.getElementById("query-form");

    query.value = streamingExpr;


    function runStreamingExpression(queryVal, onResp) {
      req = new XMLHttpRequest();

      req.onreadystatechange = function resp() {
        if (req.readyState === XMLHttpRequest.DONE) {
          if (req.status === 200) {
            onResp(req.responseText);
          }
          else {
            console.log("HTTP ERROR");
          }
        }
      };

      req.open('GET', 'http://localhost:8983/solr/movielens/stream?indent=true&expr=' + encodeURIComponent(queryVal));
      req.send();
    }





    queryForm.onsubmit = function() {

      runStreamingExpression(query.value, function onResp(respText) {
        console.log("SUCCESS");
        resultsDisplay.innerHTML = respText;
      });

      return false; // dont submit and reload page
    };




  });
})();
