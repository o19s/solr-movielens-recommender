# solr-movielens-recommender
Movielens collaborative filtering with Solr streaming expression. Just help for downloading, ingesting data and dorking around with streaming expressions in streaming cloud mode.

## Start Solr with movielens schema

```
# Start Solr 6.2 somewhere
./bin/solr -V -f -c -m 4092m -s ~/ws/solr-movielens/solr_home/solrcloud-home/

# cd into solr-home, create and upconfig movielens schema
cd solr-home
./dummySolrCloud.sh CREATE movielens
```

## Index data

Download and index movielens. This turns each unique user into a document, with a field `liked_movies` that lists rating 4 and 5 movies.

```
# Dowload movielens 20m data set
./prepareData.sh

# Index movies rated 4 and 5 to Solr
source venv/bin/activate
python indexToSolr.py
```

## Dork around in sandbox

There's a prebaked streaming expressions query in this dumb web form. Submitting it (or any streaming expr) will show you the results.

```
cd browser-sandbox
python -m http.server
```

Note, CORS may be a hindrance. I use a Firefox extension that lets me temporarilly disable CORS (called CORSE).
